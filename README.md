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
                       MPLADS DATA SOURCES
                       │
       ┌───────────────┼────────────────┐
       │               │                │
   Work Data       Financial Data   Progress Data
   • Sanctions     • Expenditure    • Work status
   • Estimates     • Payments       • Completion
   • Locations     • Fund release   • Delays
       │               │                │
       └───────────────┼────────────────┘
                       ↓
              DATA INGESTION LAYER
           APIs / CSV / Database / Portal
                       ↓
              DATA CLEANING & ETL
        Missing values • Validation • Standardization
                       ↓
             FEATURE ENGINEERING
       ┌───────────────┼────────────────┐
       │               │                │
   Cost/Work       Time/Progress     Location
   Features         Features         Features
       │               │                │
       └───────────────┼────────────────┘
                       ↓
              AI / ANALYTICS ENGINE
       ┌───────────────┼────────────────┐
       │               │                │
   Anomaly         Duplicate/       Delay &
   Detection       Similarity       Overrun
       │             Detection       Prediction
       │               │                │
       └───────────────┼────────────────┘
                       ↓
                 RISK ENGINE
        Risk Score + Explainable Reasons
                       ↓
              ALERT & DECISION LAYER
                       ↓
        ┌──────────────┼───────────────┐
        ↓              ↓               ↓
    Ministry       District        MP / Nodal
    Dashboard      Dashboard       Dashboard
        │              │               │
        └──────────────┼───────────────┘
                       ↓
              HUMAN VERIFICATION
                       ↓
             Investigation / Action
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
