# 🏢 ROImob — Real Estate & Urban Intelligence Platform

<p align="center">
  <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80" alt="ROImob Platform" width="100%" style="border-radius: 1rem;" />
</p>

<div align="center">

[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![Leaflet](https://img.shields.io/badge/Leaflet-GIS-199900?style=for-the-badge&logo=leaflet)](https://leafletjs.com)
[![data.gov.ro](https://img.shields.io/badge/data.gov.ro-CKAN%20API-0052cc?style=for-the-badge)](https://data.gov.ro)

</div>

---

## 📌 Overview

**ROImob** is an open-data-driven real estate intelligence and financial evaluation platform tailored for **small property investors**, **home buyers**, and **families** navigating the real estate market in Romania.

By unifying verified government registries from **data.gov.ro** (CKAN API), **ANCPI** (Cadastre & Land Registration), **INSSE** (National Statistics Institute), **AMCCRS** (Seismic Consolidation Administration), **Apele Române** (Flood Hazard Maps), and **RNMCA** (Air Quality Monitoring), ROImob provides institutional-grade risk diagnostics and net return simulations before making real estate commitments.

---

## 🌟 Key Features

### 1. 🌍 5-Language Internationalization (i18n)
- **Primary Language**: 🇬🇧 **English (`en`)**
- **Alternative Languages**:
  - 🇷🇴 **Română (`ro`)**
  - 🇫🇷 **Français (`fr`)**
  - 🇩🇪 **Deutsch (`de`)**
  - 🇺🇦 **Українська (`uk`)**
- Persistent user locale preferences and localized legal/fiscal terms (*Carte Funciară*, *IRCC*, *CASS*, *Gross/Net Yield*, *Clasă Risc Seismic*).

### 2. 🗺️ Multi-Layer GIS Intelligence Map
- **Seismic Vulnerability Overlay**: Visual red/amber pins for expertized buildings classified under **RsI** (Red Bullet), **RsII**, **RsIII**, **RsIV**, Urgency Categories **U1–U3**, and unexpertized pre-1977 alerts.
- **Flood Hazard Zones**: EU Directive 2007/60/EC flood hazard designations (HQ10, HQ100, HQ1000 return periods).
- **Educational Excellence**: Public and private schools with 3-year average pass grades for *Evaluarea Națională* and national rankings.
- **Healthcare & Emergency Access**: Hospitals with 24/7 Urgent Care Units (UPU).
- **Live Air Quality Sensors**: PM2.5, PM10, $\text{NO}_2$, and AQI index from RNMCA stations.
- **15-Minute City Radius**: Visual walk-time radius per selected property.

### 3. 📊 Triple-Score Diagnostic Dossier
For every address or cadastral number, ROImob generates a composite rating:
1. **Livability & Surroundings Score (0–100)**: Walkability, transit access, school ratings, air quality, green space distance.
2. **Structural & Natural Safety Score (0–100)**: Seismic vulnerability class, flood risk, historical monument (LMI) facade protection constraints.
3. **Investment Viability Score (0–100)**: ANCPI transaction velocity, INSSE demographic migration rate, Price-to-Income affordability index.
4. **Export to Printable PDF**: Single-click audit summary formatted for bank mortgage review and investment committees.

### 4. 💰 Romanian Real Estate Fiscal & ROI Engine (2024–2026 Code)
- **10% Flat Rental Income Tax**: Calculated on the **80% net rental base** after applying the mandatory 20% deductible flat expense (effective 8% rate).
- **CASS Health Insurance Brackets**: Automatic calculation for annual thresholds (6, 12, or 24 gross minimum national wages).
- **Leveraged Mortgage Simulator**: Variable IRCC + bank spread or fixed interest rates, 15% vs 25% down payments, debt service amortization.
- **Metrics**: Gross Yield, Net Yield (Cap Rate), Cash-on-Cash Return (CoC), Monthly Net Cash Flow, and 10-Year Total ROI Forecasting.
- **Short-Term (Airbnb) Arbitrage Comparison**: Compares seasonal occupancy and operating expenses against long-term residential leases.

### 5. 🔄 Complete Source Provenance & Data Health Hub
- **Transparent Provenance Badges**: Every metric displays the issuing public body, API endpoint, update interval (*Hourly*, *Monthly*, *Quarterly*, *Annually*), and last synced timestamp.
- **Live Sync Manager**: Trigger on-demand sync with real-time progress simulation.

---

## 🏛️ Integrated Public Data Sources

| Official Entity | Dataset / Registry | Cadence | Standard / Endpoint |
| :--- | :--- | :--- | :--- |
| **data.gov.ro / Min. Educației** | Rețeaua Unităților de Învățământ | Annually | CKAN REST API (`/api/3/action/`) |
| **ANCPI** | Tranzacții Imobiliare Lunare & Ipoteci | Monthly | CSV / WMS e-Terra |
| **ANCPI Geoportal** | Cadastral Parcels & UAT Boundaries | Monthly | INSPIRE WFS / GeoJSON |
| **AMCCRS & PMB** | Lista Imobilelor Expertizate Tehnic | Monthly | JSON / Official Register |
| **INSSE (TEMPO Online)** | Autorizații de Construire (`LOC101A`) | Quarterly | SDMX / XML Matrix |
| **INSSE (TEMPO Online)** | Dinamica Populației & Salarii (`FOM107D`) | Monthly | SDMX / XML Matrix |
| **Apele Române** | Hărți de Hazard și Risc la Inundații | Static/Gov | WFS / Directiva 2007/60/CE |
| **RNMCA / CalitateaAerului.ro** | Rețeaua Națională Calitatea Aerului | Hourly | Live Sensor JSON Stream |
| **Institutul Național al Patrimoniului** | Lista Monumentelor Istorice (LMI) | Annually | CSV / Legea 422/2001 |

---

## 📐 Project Structure

```
ROImob/
├── public/
├── src/
│   ├── components/
│   │   ├── FinancialEngine/
│   │   │   └── ROICalculator.tsx       # Romanian tax & ROI mathematical engine
│   │   ├── MapView/
│   │   │   ├── InteractiveMap.tsx      # Leaflet GIS multi-layer map
│   │   │   └── LayerControl.tsx        # Layer toggles with provenance badges
│   │   ├── OpenDataHub/
│   │   │   ├── DataCatalog.tsx         # data.gov.ro & ANCPI catalog
│   │   │   └── DataSyncManager.tsx     # Timing status & live sync scheduler
│   │   ├── PropertyDossier/
│   │   │   ├── PropertyCard.tsx        # Card display with score visualizers
│   │   │   └── PropertyDetailModal.tsx # Full diagnostic dossier
│   │   ├── ReportExport/
│   │   │   └── PrintableDossier.tsx    # PDF-ready audit report
│   │   ├── Footer.tsx
│   │   ├── HeroBanner.tsx
│   │   ├── Navbar.tsx                  # 5-language switcher & status badge
│   │   └── SourceAttributionBadge.tsx  # Dedicated timing & provenance badge
│   ├── data/
│   │   ├── insseCountyStats.ts         # County-level macro metrics
│   │   ├── officialSources.ts          # Public API directory
│   │   ├── sampleProperties.ts         # Diagnostic property database
│   │   ├── schoolsAndAmenities.ts      # Educational & sanitary POIs
│   │   └── seismicData.ts              # AMCCRS seismic risk buildings
│   ├── i18n/
│   │   ├── en.ts                       # English (Primary)
│   │   ├── ro.ts                       # Romanian
│   │   ├── fr.ts                       # French
│   │   ├── de.ts                       # German
│   │   ├── uk.ts                       # Ukrainian
│   │   └── index.tsx                   # React Context & Hook
│   ├── types/
│   │   ├── i18n.ts
│   │   └── index.ts                    # Core TypeScript definitions
│   ├── utils/
│   │   ├── calculations.ts             # Mathematical scoring & tax algorithms
│   │   └── formatters.ts               # Currency & date formatters
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vercel.json                         # Vercel SPA routing configuration
└── vite.config.ts
```

---

## ⚡ Getting Started Locally

### Prerequisites
- **Node.js**: v18.0 or higher
- **npm** or **pnpm** / **yarn**

### Installation
```bash
# Clone the repository
git clone https://github.com/ProfBandarra/ROImob.git

# Navigate into project directory
cd ROImob

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
```

---

## 🚀 Deployment to Vercel

ROImob is pre-configured with `vercel.json` for single-page routing on Vercel.

### Method 1: Deploy via Vercel Web Dashboard (Recommended)
1. Push your repository to GitHub (`ProfBandarra/ROImob`).
2. Log in to [vercel.com](https://vercel.com).
3. Click **"Add New Project"** and import `ProfBandarra/ROImob`.
4. Vercel automatically detects the Vite framework settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click **"Deploy"** — your live URL will be ready in under a minute!

### Method 2: Deploy via Vercel CLI
```bash
# Install Vercel CLI globally
npm i -g vercel

# Log in and deploy
vercel
```

---

## 📜 License & Compliance

Distributed under the **MIT License**.

All public data layers respect the provisions of **Directive (EU) 2019/1024 on open data and the re-use of public sector information** and **Romanian Law no. 179/2022**.
