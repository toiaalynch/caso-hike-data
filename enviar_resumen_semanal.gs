// ===============================================
// HIKE — ALERTAS SEMANALES
// Envía un email cada lunes con resumen ejecutivo
// ===============================================

const DASHBOARD_URL = "https://datastudio.google.com/reporting/3f7377a9-3ad3-4382-9f7c-3be3888b569d";
const EMAIL_DESTINATARIO = "victorialynchg@gmail.com";

function enviarResumenSemanal() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // ---- LEER DATOS ----
  const alertas = leerHoja(ss, "alertas_stock");
  const ventas = leerHoja(ss, "ventas_clean");
  const ads = leerHoja(ss, "master_ads");
  
  // ---- CALCULAR ----
  const productosRojos = alertas.filter(r => 
    r.alerta_clean === "Stock crítico (<4 semanas)"
  );
  const productosZombie = alertas.filter(r => r.unidades_12w === 0);
  const unidadesInmovilizadas = productosZombie.reduce((s, r) => s + r.stock, 0);
  const totalRev12w = alertas.reduce((s, r) => s + r.revenue_12w, 0);
  const revRiesgo = productosRojos.reduce((s, r) => s + r.revenue_12w, 0);
  const pctRiesgo = (revRiesgo / totalRev12w * 100).toFixed(1);
  
  // Top 3 críticos por revenue_12w
  const top3 = productosRojos
    .sort((a, b) => b.revenue_12w - a.revenue_12w)
    .slice(0, 3);
  
  // ---- ARMAR HTML DEL EMAIL ----
  let html = `
    <h2>📊 Hike — Resumen semanal</h2>
    <p><b>Fecha:</b> ${new Date().toLocaleDateString('es-AR')}</p>
    
    <h3>🔴 Alertas de stock críticas (${productosRojos.length} productos)</h3>
    <p><b>${pctRiesgo}%</b> del revenue reciente está en productos con stock crítico.</p>
    <p>Top 3 por revenue en riesgo:</p>
    <ol>
      ${top3.map(p => 
        `<li><b>${p.producto}</b> — ${p.semanas_stock_cubre.toFixed(2)} semanas de cobertura — $${fmt(p.revenue_12w)} en 12s</li>`
      ).join('')}
    </ol>
    <p><i>→ Acción: reponer stock urgente.</i></p>
    
    <h3>💀 Productos zombie (${productosZombie.length})</h3>
    <p>${unidadesInmovilizadas} unidades inmovilizadas sin ventas.</p>
    <p><i>→ Acción: review de catálogo.</i></p>
    
    
    <p><a href="${DASHBOARD_URL}">Ver dashboard completo →</a></p>
  `;
  
  // ---- ENVIAR ----
  MailApp.sendEmail({
    to: EMAIL_DESTINATARIO,
    subject: `📊 Hike — Resumen semanal (${new Date().toLocaleDateString('es-AR')})`,
    htmlBody: html
  });
  
  Logger.log("Email enviado a " + EMAIL_DESTINATARIO);
}

// ---------- HELPERS ----------

function leerHoja(ss, nombrePestana) {
  const sheet = ss.getSheetByName(nombrePestana);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  return data.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
}

function fmt(n) {
  return Number(n).toLocaleString('es-AR', {maximumFractionDigits: 0});
}