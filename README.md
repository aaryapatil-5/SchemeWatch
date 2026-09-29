# SchemeWatch — Static Anomaly Review Frontend

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

This prototype deliberately uses "anomaly", "outlier", "potential duplicate", "stalled execution", and "requires review" rather than claiming that a detected anomaly is fraud.

All values in `src/data/mockData.js` are static demonstration data and should be replaced with real published scheme data when a backend is connected.
