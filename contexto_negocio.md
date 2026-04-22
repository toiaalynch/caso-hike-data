# Hike — Contexto del negocio y datos

## Sobre el negocio

Hike es un ecommerce argentino de productos para **hogar y decoración**. Invierte en pauta publicitaria en **Google Ads** y **Meta Ads** (Facebook + Instagram). Este dashboard y los datos asociados analizan el período **enero 2025 – diciembre 2026** (período comparable entre ambos canales) y suman data histórica de Google desde 2024.

## Categorías de productos (7)

- **sillones** — categoría más rentable del negocio (57,5% del revenue)
- **deco** — decoración
- **jardin**
- **bano**
- **mesa**
- **cocina**
- **aromas** — productos de bajo ticket (velas, difusores, etc.)

## Los 5 datasets disponibles

### 1. `master_ads.csv` — Pauta publicitaria unificada
- **Granularidad**: semana × canal × campaña
- **1.827 filas** (1.099 Google + 728 Meta)
- **Rango**: 2024-01-01 a 2026-12-28 (Google); 2025-01-06 a 2026-12-28 (Meta)
- **Columnas**:
  - `week`, `channel` (Google Ads / Meta Ads), `campaign`, `categoria`
  - `cost` (inversión en ARS), `impressions`, `clicks`, `revenue` (atribuido por la plataforma)
  - Métricas derivadas: `cpc`, `cpm`, `ctr` (en %), `roas`

### 2. `ventas_clean.csv` — Ventas comerciales reales
- **Granularidad**: semana × producto
- **2.912 filas**, 28 productos activos (de 38 en catálogo)
- **Rango**: 2025-01-06 a 2026-12-28
- **Columnas**: `week_start`, `producto`, `sku`, `categoria`, `unidades_vendidas`, `ingreso_total`

### 3. `stock_clean.csv` — Catálogo con stock actual
- 38 productos, 7 categorías
- Columnas: `producto`, `sku`, `stock`, `categoria`

### 4. `alertas_stock.csv` — Análisis de rotación de stock
- Por producto, últimas 12 semanas
- Columnas: `producto`, `sku`, `stock`, `categoria`, `unidades_12w`, `revenue_12w`, `ventas_semanales_prom`, `semanas_stock_cubre`, `alerta` (con emoji), `alerta_clean` (texto)
- Estados: "Stock crítico (<4 semanas)" o "OK"

### 5. `calendario_ar.csv` — Fechas comerciales argentinas
- Hot Sale, Día del Padre, Día del Amigo, Día del Niño, Día de la Madre, Black Friday, Cyber Monday, Navidad
- Años 2025 y 2026

---

## Números clave (período 2025-2026)

### Performance global
- **Inversión publicitaria total**: $4.861.509
- **Revenue atribuido por plataformas**: $20.500.603
- **ROAS global**: 4,22x
- **Revenue real del ecommerce**: $445.312.206
- **Cobertura pauta / revenue real**: 4,6% (el 95,4% restante es revenue orgánico)

### Por canal
- **Google Ads**: cost $2,63M | revenue atr. $11,63M | ROAS 4,42x | CTR 1,94%
- **Meta Ads**: cost $2,23M | revenue atr. $8,87M | ROAS 3,97x | CTR 2,16%

### Performance por campaña × canal (top ROAS)
1. Meta aromas — ROAS 6,82
2. Google cocina — ROAS 6,47
3. Google baño — ROAS 5,54
4. Meta cocina — ROAS 5,21
5. Google sillones — ROAS 4,91
6. Meta jardín — ROAS 4,72
7. Google mesa — ROAS 4,27
8. Meta mesa — ROAS 3,94
9. Google deco — ROAS 3,65
10. Meta deco — ROAS 3,45
11. Google jardín — ROAS 3,16
12. Meta baño — ROAS 2,81
13. Google aromas — ROAS 2,33
14. **Meta sillones — ROAS 2,05** (el peor)

### Share de inversión vs Share de revenue (por categoría)
- **sillones**: 16,7% inversión / **57,5% revenue real** → **sub-invertido**
- **deco**: 18,7% inversión / 9,2% revenue real → sobre-invertido
- **jardin**: 13,9% / 9,1% → sobre-invertido
- **bano**: 12,2% / 8,0%
- **mesa**: 13,4% / 5,9%
- **cocina**: 15,3% / 5,8%
- **aromas**: 9,9% / 4,5%

### Stock y alertas
- **17 productos en alerta crítica** (stock < 4 semanas de cobertura)
- **10 productos zombie** (nunca se vendieron en el período) con **864 unidades inmovilizadas**
- **87,6% del revenue reciente** está en productos con stock crítico (riesgo operativo)

### Productos en mayor riesgo (stock crítico × revenue alto)
1. Sillón Boho Arena — 0,70 semanas de cobertura — $15,2M revenue 12s
2. Sillón Terciopelo Verde — 0,56 sem. — $13,4M
3. Sillón Acapulco Negro — 0,93 sem. — $10,3M
4. Puff Redondo Boucle — 1,36 sem. — $6,7M

### AOV (ticket promedio) por categoría
- sillones: **$39.795**
- deco: $6.302
- jardin: $6.293
- bano: $5.872
- cocina: $4.081
- mesa: $4.000
- aromas: $3.094

### Estacionalidad
- **9 de los 10 picos de revenue** caen en Q4 (Black Friday + Navidad)
- Hot Sale, Día del Padre, Día del Amigo, Día del Niño **no mueven la aguja**
- Día de la Madre genera un pico menor
- Crecimiento YoY 2025 → 2026: **+10,4%**

---

## Insights principales del caso

1. **Desalineación pauta-ventas**: Sillones recibe 17% de la inversión pero genera 57% del revenue. Deco recibe 19% pero solo vende 9%. Hay oportunidad de **reasignar presupuesto hacia sillones**.

2. **Cada canal tiene su especialidad**:
   - **Google Ads** gana en productos de compra pensada (sillones, cocina, baño, mesa).
   - **Meta Ads** gana en productos visuales / de impulso (aromas, jardín).
   - Recomendación: **mix por categoría, no uniforme**.

3. **Concentración extrema por AOV**: sillones tiene AOV 10x vs aromas. Un click que convierte en sillones vale 13x más — se puede tolerar CPC más alto.

4. **Pauta cubre solo 4,6% del revenue**: el 95,4% es orgánico, SEO, directo, email, recurrencia. **La marca es el motor; la pauta es complementaria.**

5. **Stock crítico operativo**: 4 sillones top con <1,4 semanas de cobertura; 87,6% del revenue reciente depende de productos en alerta. Urge reposición.

6. **Catálogo zombie**: 10 productos sin venta (todos SKU -005 y -006 de cada categoría). Sospechoso: probablemente productos nuevos no lanzados o sin pauta.

7. **Estacionalidad concentrada en Q4**: el 90% de las semanas pico son Black Friday-Navidad. La pauta debería escalar agresivamente en noviembre-diciembre.

---

## Caveats metodológicos (importantes)

- **Datos sintéticos**: correlación cost↔revenue >0,93 en ambos canales → ROAS casi constante semana a semana. En data real habría mucha más varianza.
- **Atribución inflada**: `conv_value` (Google) puede incluir valor de leads, no solo compras. `purchase_value` (Meta) solo compras. La suma puede tener solapamiento (misma venta atribuida a ambos canales).
- **Ventanas de atribución distintas**: Google 30d post-click, Meta 7d post-click. Google tiende a atribuirse más.
- **CTR almacenado como porcentaje** (0-100) en lugar de fracción (0-1) para compatibilidad con Google Sheets en locale argentino.
- **Stock crítico <4 semanas**: umbral arbitrario. La criticidad real depende del lead time del proveedor, que no está en los datos.

---

## Cómo responder preguntas (guía para el asistente)

1. **Usar datos concretos**: citar números específicos con fechas o períodos.
2. **Mencionar caveats cuando aplique**: ej. si preguntan sobre ROAS, aclarar que la atribución tiene limitaciones.
3. **Proponer acciones**: si la pregunta permite recomendación, darla (ej: "reponer stock de sillones inmediatamente").
4. **Ser específico en el período**: si no especifican, asumir el período completo (2025-2026).
5. **No inventar números**: si la respuesta no está en los datos, decirlo claramente.

---

## Preguntas de ejemplo y respuestas esperadas

**P: "¿Qué canal tiene mejor ROAS?"**
R: Google Ads con 4,42x vs Meta Ads 3,97x, medido sobre el período comparable 2025-2026. Pero ojo: Google tiene ventana de atribución más larga (30d vs 7d de Meta), lo que infla su ROAS respecto a Meta.

**P: "¿Qué productos debería reponer urgente?"**
R: Los 4 sillones top tienen cobertura de stock <1,4 semanas al ritmo de venta actual: Sillón Terciopelo Verde (0,56 sem), Sillón Boho Arena (0,70), Sillón Acapulco Negro (0,93), Puff Redondo Boucle (1,36). Representan $45M+ de revenue acumulado en 12 semanas.

**P: "¿Conviene invertir más en pauta?"**
R: Depende de la palanca. La pauta solo cubre 4,6% del revenue total ($20,5M de $445M), así que el techo de crecimiento orgánico también importa. Pero dentro de la pauta, hay oportunidad clara: reasignar de Deco/Cocina/Jardín hacia Sillones, que genera 57% del revenue con solo 17% de la inversión.
