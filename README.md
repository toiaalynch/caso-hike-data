# Hike — Caso práctico de Marketing y Ventas

> Análisis de datos, dashboard, automatización y asistente conversacional para un ecommerce de hogar y decoración con inversión en Google Ads y Meta Ads.

**Fecha de entrega**: 23 de Abril 2026

**Hallazgo central**: Sillones concentra el **57% del revenue real** del negocio con solo el **17% de la inversión publicitaria** — es la principal oportunidad de reasignación de presupuesto detectada en el análisis. A eso se suman los 4 sillones top en alerta crítica de stock (cobertura de 0,56 a 1,36 semanas al ritmo de venta actual), que representan el mayor riesgo operativo inmediato.

---

## Entregables

| # | Entregable | Link |
|---|---|---|
| 1 | **Dashboard interactivo** (Looker Studio, 2 páginas) | [Ver dashboard](https://datastudio.google.com/reporting/3f7377a9-3ad3-4382-9f7c-3be3888b569d) |
| 2 | **Automatización** (Google Apps Script con alertas semanales por email) | Código en `/automation/enviar_resumen_semanal.gs` |
| 3 | **Asistente conversacional** (Google NotebookLM) | [Abrir NotebookLM](https://notebooklm.google.com/notebook/050b481b-d64f-4c2f-915f-64b51d394d12) |
| 4 | **Repositorio completo** (análisis, datos limpios, documentación) | Este repo |

---

## Insights principales

### 1. Desalineación presupuesto ↔ ventas por categoría
- **Sillones**: 16,7% de la inversión publicitaria → **57,5% del revenue real**
- **Deco**: 18,7% de la inversión → **9,2% del revenue real**
- La categoría más rentable del negocio recibe menos presupuesto que la segunda más invertida.

### 2. Cada canal tiene su especialidad por tipo de producto
- **Google Ads** gana en productos de compra pensada: Cocina (ROAS 6,47), Baño (5,54), Sillones (4,91).
- **Meta Ads** gana en productos visuales / de impulso: Aromas (6,82), Jardín (4,72).
- La mejor campaña del período: **Meta × Aromas (6,82x)**; la peor: **Meta × Sillones (2,05x)**.

### 3. Concentración extrema por AOV
Sillones tiene un ticket promedio de **$39.795**, 10x más alto que Aromas ($3.094). Esto explica por qué domina el revenue sin vender muchas más unidades. Implicancia publicitaria: un click convertido en Sillones vale ~13x más que uno en Aromas, lo que permite tolerar CPCs más altos antes de volverse ineficiente.

### 4. Stock crítico concentrado en los productos más rentables
**17 productos tienen stock para menos de 4 semanas** al ritmo de venta actual. Los 4 sillones top están en 0,56-1,36 semanas de cobertura. **87,6% del revenue reciente proviene de productos en alerta crítica**, generando un riesgo operativo importante si los lead times de reposición son mayores a 4 semanas.

### 5. Catálogo zombie: 10 productos sin rotación
Hay **10 productos cargados en stock que nunca aparecieron en ventas** en el período analizado, con **864 unidades inmovilizadas**. Son todos los SKU `-005` y `-006` de cada categoría, lo que sugiere un patrón sistemático (productos nuevos no lanzados o sin promoción). Es capital de trabajo sin rotación.

### 6. Estacionalidad extremadamente concentrada en Q4
**9 de los 10 picos de revenue** caen en Black Friday + Navidad. Eventos como Hot Sale, Día del Padre, Día del Amigo y Día del Niño no movilizan ventas significativamente. El negocio depende fuerte de noviembre-diciembre, lo que también orienta cuándo escalar pauta.

### 7. El negocio tiene una base orgánica robusta
Solo el 4,6% del revenue se atribuye a pauta. El 95% restante viene de ventas orgánicas, directo, SEO, recurrencia, email, u otros canales. Implicación estratégica: **la pauta no es el motor principal, es complementaria**. Crecer el revenue requiere pensar también otras palancas (retención, marca, SEO, contenido).

---

## Arquitectura del proyecto

```
┌─────────────────────┐     ┌─────────────────────┐
│   Datos crudos      │     │   Python / Pandas   │
│   (4 CSVs)          │ ──► │   Limpieza + EDA    │
│   Google Ads        │     │   Normalización     │
│   Meta Ads          │     │   Métricas derivadas│
│   Ventas            │     │   (notebook)        │
│   Stock             │     └──────────┬──────────┘
└─────────────────────┘                │
                                       ▼
                          ┌─────────────────────┐
                          │   CSVs limpios      │
                          │   (5 archivos)      │
                          │   + documento de    │
                          │   contexto          │
                          └──────────┬──────────┘
                                     │
                     ┌───────────────┼───────────────┐
                     ▼               ▼               ▼
          ┌──────────────┐ ┌─────────────┐ ┌──────────────┐
          │ Google Sheets│ │ Apps Script │ │  NotebookLM  │
          │   (fuente    │ │  (alertas   │ │  (asistente  │
          │   de datos)  │ │   semanales)│ │   chat)      │
          └──────┬───────┘ └─────────────┘ └──────────────┘
                 │
                 ▼
          ┌──────────────┐
          │Looker Studio │
          │  (dashboard  │
          │  interactivo)│
          └──────────────┘
```

### Stack utilizado

- **Análisis**: Python 3 + pandas + matplotlib + seaborn
- **Dashboard**: Google Looker Studio (2 páginas, conectado a Google Sheets)
- **Automatización**: Google Apps Script (trigger semanal con envío de email HTML)
- **Chatbot**: Google NotebookLM con documento de contexto del negocio
- **Versionado**: Git + GitHub

---

## Estructura del repositorio

```
caso-hike-data/
│
├── README.md                    # Este documento
├── 01_analisis.ipynb            # Notebook Jupyter con análisis completo
├── contexto_negocio.md          # Documento de contexto para el chatbot
│
├── data/
│   ├── google_ads.csv           # Datos crudos originales
│   ├── meta_ads.csv
│   ├── ventas.csv
│   └── stock.csv
│
├── clean/                       # Datos procesados y normalizados
│   ├── master_ads.csv           # Pauta unificada Google + Meta con métricas derivadas
│   ├── ventas_clean.csv         # Ventas con SKU y categoría normalizada
│   ├── stock_clean.csv          # Catálogo con categorías normalizadas
│   ├── alertas_stock.csv        # Productos con análisis de rotación y alertas
│   └── calendario_ar.csv        # Fechas comerciales argentinas 2025-2026
│
└── automation/
    └── enviar_resumen_semanal.gs # Código de Google Apps Script
```

---

## Decisiones metodológicas y caveats

### Normalización de datos

- Se unificaron columnas entre Google Ads y Meta Ads (`cost`/`spend`, `clicks`/`link_clicks`, `conv_value`/`purchase_value`, `week`/`date_week`) bajo un esquema común.
- Los nombres de campañas se normalizaron a minúsculas sin acentos para matchearlos con `categoria` en las tablas comerciales (ej: `Baño` → `bano`).
- El CTR se almacena como porcentaje (0-100) en lugar de fracción (0-1) para compatibilidad de display con configuración regional argentina de Google Sheets.

### Período comparable

- **Google Ads** tiene datos desde 2024-01-01; **Meta Ads** y **ventas** desde 2025-01-06. El análisis comparativo canal-vs-canal se realiza sobre el período **2025-01-06 a 2026-12-28** (overlap), mientras que se reporta separadamente la serie histórica completa de Google para 2024-2026.

### Ventana de rotación de stock

- El análisis de alertas de stock usa **las últimas 12 semanas** del dataset como proxy de velocidad de venta. La cobertura se calcula como `stock / velocidad_semanal`.
- **Umbral "crítico"**: cobertura menor a 4 semanas. Es un umbral arbitrario; la criticidad real depende del lead time de proveedor (no incluido en los datos).

### Atribución publicitaria

- `conv_value` (Google) puede incluir el valor de leads además de compras; `purchase_value` (Meta) solo compras. Al sumar ambos para calcular revenue atribuido global puede haber **solapamiento** (misma venta atribuida a ambos canales) y **sesgo** (Google tiende a atribuirse más por ventana de atribución más larga: 30d post-click vs 7d de Meta).
- **El ROAS reportado por las plataformas no es causal**: no prueba que la venta ocurrió GRACIAS a la pauta, solo que ocurrió dentro de la ventana de atribución post-interacción.

### Naturaleza sintética de los datos

- La correlación semanal entre `cost` y `revenue` es de **0,929 para Google** y **0,963 para Meta**. Correlaciones tan altas son **irrealistas** en ecommerce productivo, donde hay varianza significativa por creativos, estacionalidad, competencia y calidad de campañas. Esto marca los datos como sintéticos con ROAS casi fijo + ruido.
- En un entorno productivo, el análisis de ROAS semanal sería mucho más rico (y más inestable). Los patrones de este caso son correctos en magnitud promedio pero subestiman la varianza real.

### Cobertura pauta vs revenue total

- La pauta atribuida cubre solo **4,6% del revenue real** del ecommerce. Esto indica que el negocio tiene una **base orgánica / recurrente muy fuerte** (marca, SEO, directo, email). Es un insight estratégico: el techo de crecimiento no está solo en escalar la pauta.

---

## Automatización: alertas semanales

Implementada en **Google Apps Script** (`automation/enviar_resumen_semanal.gs`). Cada lunes a las 9:00 AM:

1. Lee las pestañas `master_ads`, `ventas_clean` y `alertas_stock` del Sheets maestro.
2. Calcula alertas: productos en stock crítico, zombies, unidades inmovilizadas, % revenue en riesgo.
3. Construye un resumen HTML con las alertas top.
4. Envía el email vía `MailApp.sendEmail()` al destinatario configurado.

**Ventajas del enfoque**:
- Zero hosting: corre en la infraestructura de Google Workspace.
- Conexión nativa al Sheets (el mismo que alimenta el dashboard).
- Trigger programado por UI sin necesidad de cron externo.
- Fácilmente extensible para sumar más alertas (ROAS cayendo, campañas con bajo rendimiento, etc.).

**Limitaciones**:
- Lógica atada a la infraestructura de Google (no portable fácilmente a AWS/otra nube).
- Sin manejo de errores robusto ni logging centralizado.
- Si el Sheets cambia de estructura, el script falla silenciosamente hasta el próximo trigger.

---

## Asistente conversacional

Armado en **Google NotebookLM** cargado con:
- Los 5 CSVs limpios
- El documento `contexto_negocio.md` con todo el contexto del negocio + insights pre-computados + caveats

Responde preguntas en lenguaje natural tipo "¿qué 5 productos debería reponer urgente?" o "¿por qué sillones es tan importante?" citando las fuentes concretas.

### Limitaciones del approach actual y roadmap de escalabilidad

El asistente actual tiene una limitación inherente al modelo de NotebookLM: **los datos se cargan manualmente**. Si el negocio actualizara sus datos semanalmente, habría que resubirlos cada vez. Sirve para un demo funcional; no escala a producción.

**Para una arquitectura productiva**, el chatbot debería tener acceso a la fuente de datos en tiempo real mediante:

1. **Pipeline automatizado** (Cloud Functions / Airflow): lee de las APIs de Google Ads, Meta Ads y el sistema comercial del ecommerce; normaliza; deja el resultado en un almacén central (BigQuery / Snowflake / Postgres).

2. **Capa de acceso conversacional**: un agente LLM con pattern text-to-SQL o text-to-pandas (construido sobre API de Anthropic/OpenAI) que consulta el almacén en cada pregunta.

3. **Interfaz**: Slack bot interno, Streamlit app, o integración en la suite de herramientas del equipo.

Con esta arquitectura, el chatbot respondería siempre con datos actualizados sin intervención manual. El approach de NotebookLM es un MVP válido para demostrar el concepto; el producto real requiere la integración continua.

---

## Próximos pasos (qué haría con más tiempo)

1. **Conexión directa del dashboard a BigQuery** en lugar de Google Sheets, para manejar datasets de mayor escala y agregar lógica de cálculo más compleja.

2. **Modelo de atribución propio**: usar datos de primer click + último click + touchpoints intermedios para un ROAS más realista (vs las atribuciones crudas de cada plataforma).

3. **Chatbot productivo**: migrar de NotebookLM a la arquitectura descrita en la sección anterior.

4. **Alertas más granulares**: extender la automatización de Apps Script para detectar:
   - Campañas con ROAS cayendo >20% vs promedio histórico.
   - Productos con velocidad de venta acelerando (oportunidad de promo).
   - Categorías con desbalance inversión vs revenue > umbral.

5. **UX avanzado del dashboard**: filtros cruzados por campaña y categoría, tooltips enriquecidos con comparación histórica, y vistas personalizadas por rol (marketing, operaciones, dirección) con los KPIs que le corresponden a cada uno.

---

## Contacto

**Victoria Lynch**
`victorialynch@gmail.com`
