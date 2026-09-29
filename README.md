# SchemeWatch — Static Anomaly Review

A Vite + React frontend prototype for explainable anomaly detection over published scheme works data.

## Features

- Dashboard with scheme-wide metrics
- Static anomaly dataset
- Cost-per-asset outlier detection UI
- Near-duplicate work detection UI
- Execution stall detection UI
- Utilisation pattern analysis UI
- Explainable anomaly reviewer drawer
- Works explorer with search/filtering
- District comparison charts
- Responsive desktop/mobile layout
- No backend or database required

## Run

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite.

## Important demo framing

## System Architecture

```text
                    ┌─────────────────────────────┐
                    │      Published Works Data   │
                    │  • Work Description         │
                    │  • Estimated Cost            │
                    │  • Location / District       │
                    │  • Work Category             │
                    │  • Sanction Details          │
                    └──────────────┬──────────────┘
                                   │
                                   ▼
                    ┌─────────────────────────────┐
                    │       Data Preprocessing     │
                    │  • Data Cleaning             │
                    │  • Missing Value Handling    │
                    │  • Normalization             │
                    │  • Duplicate Standardization│
                    └──────────────┬──────────────┘
                                   │
                                   ▼
              ┌────────────────────────────────────────┐
              │       Feature Extraction Layer         │
              │                                        │
              │  • Cost per Asset / Unit               │
              │  • Work Category                        │
              │  • District / Location                  │
              │  • Work Description Similarity          │
              │  • Sanction & Completion Information    │
              └───────────────────┬────────────────────┘
                                  │
                                  ▼
        ┌──────────────────────────────────────────────────┐
        │             Anomaly Detection Engine              │
        │                                                  │
        │  ┌────────────────────┐  ┌────────────────────┐ │
        │  │ Cost Outlier       │  │ Near-Duplicate     │ │
        │  │ Detection          │  │ Work Detection     │ │
        │  └────────────────────┘  └────────────────────┘ │
        │                                                  │
        │  • Peer-group comparison                         │
        │  • District-level benchmarking                    │
        │  • Description similarity                         │
        │  • Statistical / rule-based outlier detection     │
        └──────────────────────┬───────────────────────────┘
                               │
                               ▼
                    ┌─────────────────────────────┐
                    │      Anomaly Scoring        │
                    │                             │
                    │  • Cost Anomaly Score       │
                    │  • Duplicate Similarity     │
                    │  • Combined Risk Indicator  │
                    └──────────────┬──────────────┘
                                   │
                                   ▼
                    ┌─────────────────────────────┐
                    │      Results & Alerts        │
                    │                             │
                    │  • Flagged Works             │
                    │  • Reason for Flag           │
                    │  • Supporting Metrics        │
                    │  • District Comparison       │
                    └──────────────┬──────────────┘
                                   │
                                   ▼
                    ┌─────────────────────────────┐
                    │       Review Dashboard       │
                    │                             │
                    │  • Anomaly List              │
                    │  • Filters                    │
                    │  • Charts & Statistics       │
                    │  • Work-level Details        │
                    └─────────────────────────────┘
```

### Architecture Overview

The system follows a **data-processing → feature extraction → anomaly detection → scoring → visualization** pipeline.

1. **Data Input** – Published government works data is used as the primary input.
2. **Data Preprocessing** – Raw records are cleaned, standardized, and prepared for analysis.
3. **Feature Extraction** – Relevant attributes such as cost, district, work category, and description are extracted.
4. **Anomaly Detection Engine** – The system identifies unusual patterns using:

   * **Cost-per-asset outlier detection**
   * **Peer/district-level comparison**
   * **Near-duplicate work detection**
5. **Anomaly Scoring** – Each flagged record receives indicators based on the detected anomaly patterns.
6. **Results Layer** – Flagged works are presented with the reason they were flagged and the supporting comparison.
7. **Dashboard** – Users can inspect anomalies through tables, filters, charts, and detailed work-level information.

> **Important:** The system is designed as an **anomaly/outlier detection tool**, not a fraud-detection system. A flagged work indicates that the record is unusual compared with its peers; it does **not** establish fraud or wrongdoing.

This prototype deliberately uses "anomaly", "outlier", "potential duplicate", "stalled execution", and "requires review" rather than claiming that a detected anomaly is fraud.

All values in `src/data/mockData.js` are static demonstration data and should be replaced with real published scheme data when a backend is connected.
