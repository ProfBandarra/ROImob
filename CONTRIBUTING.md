# 🤝 Contributing to ROImob

Thank you for your interest in contributing to **ROImob**! ROImob is an open-source, community-driven decision intelligence suite for Romanian real estate.

🌐 **Official Live Application:** [https://www.roimob.eu/](https://www.roimob.eu/)

---

## 🌟 Ways to Contribute

We warmly welcome contributions from developers, real estate specialists, accountants, tax advisors, and users!

1. **💡 Suggest Improvements & Features**: Open a [Feature Request](https://github.com/ProfBandarra/ROImob/issues/new?template=feature_request.md) with ideas for new calculations, charts, or workflow improvements.
2. **📜 Propose Tax & Fiscal Law Updates**: Romanian legislation evolves (ANAF, OUGs, BNR IRCC). Open a [Fiscal Update Issue](https://github.com/ProfBandarra/ROImob/issues/new?template=fiscal_update.md) with official Monitorul Oficial references.
3. **🌍 Improve Translations**: Help refine our 6 supported languages (`ro`, `en`, `fr`, `de`, `uk`, `pt`) in `src/i18n/`.
4. **🐛 Report Bugs**: Found an issue? Report it via [Bug Report](https://github.com/ProfBandarra/ROImob/issues/new?template=bug_report.md).
5. **🛠️ Submit Code & Pull Requests**: Implement improvements directly.

---

## 🚀 Local Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/ProfBandarra/ROImob.git
cd ROImob
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 3. Verify Code Quality & Type Safety
Before committing your changes, always ensure the build passes cleanly:
```bash
npm run build
```

---

## 🏛️ Codebase Architecture Overview

- `src/components/HomePage.tsx`: Main decision overview and statutory legal references.
- `src/components/SimpleMode/`: Fast 15-second Quick Check calculators (`QuickSellVsRent.tsx`, `QuickROICalculator.tsx`).
- `src/components/SellVsRent/`: Institutional Pro 15-Year Sell vs. Rent Engine.
- `src/components/FinancialEngine/`: Institutional Pro Buy-to-Let ROI & Tax Underwriting Engine.
- `src/components/ReportExport/`: 2-Page Verified A4 Institutional Dossier & Vector SVG print system (`FormalReportModal.tsx`).
- `src/utils/calculations.ts`: Core financial models (Law 227/2015 Art. 111, OUG 115/2023, BNR IRCC, CASS health brackets).
- `src/i18n/`: Type-safe multilingual dictionaries with 100% key parity across `ro`, `en`, `fr`, `de`, `uk`, `pt`.

---

## 📋 Pull Request Process

1. Fork the repository and create your branch from `main` (`git checkout -b feat/my-improvement`).
2. Implement your changes adhering to existing architectural patterns and clean Tailwind CSS styling.
3. Ensure `npm run build` succeeds with **0 errors**.
4. Push your branch (`git push origin feat/my-improvement`) and open a Pull Request.
5. Provide a clear explanation of what changed in your PR description.

---

## 📜 Code of Conduct
Please review and adhere to our [Code of Conduct](CODE_OF_CONDUCT.md) in all community interactions.
