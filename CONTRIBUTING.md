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

---

## 🌿 GitFlow Branching Strategy & CI/CD Pipeline

To ensure maximum stability and continuous delivery, ROImob follows a structured **GitFlow** model with full CI/CD automation:

```
feature/*  ──┐
bugfix/*   ──┴─► [develop] ────► [staging] ────► [main] (🚀 https://www.roimob.eu/)
                   (CI Gate)       (QA Testing)    (Production Deploy)
```

| Branch | Role | Deployment Target | Protection Rules |
| :--- | :--- | :--- | :--- |
| **`develop`** | Active development & integration | Local / Feature Preview | PR required + CI passes |
| **`staging`** | Pre-production testing & QA | Release Candidate artifact | PR from `develop` + CI passes |
| **`main`** | **Official Production** | 🌐 **[https://www.roimob.eu/](https://www.roimob.eu/)** | **Protected** (No direct push. Release PR only) |

---

## 📋 Pull Request & Development Workflow

1. **Branch off `develop`**:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/my-new-feature
   # or: git checkout -b bugfix/issue-description
   ```
2. **Implement your changes** adhering to existing architectural patterns and clean Tailwind CSS styling.
3. **Run local CI validation commands**:
   ```bash
   # Run mathematical & tax assertion tests
   npm test

   # Strict TypeScript type check
   npm run type-check

   # Production build verification
   npm run build
   ```
4. **Push your branch & Open a Pull Request**:
   ```bash
   git push origin feature/my-new-feature
   ```
   - Target **`develop`** as the base branch in your PR.
   - Fill in the [PR template](.github/PULL_REQUEST_TEMPLATE.md).
   - The automated GitHub Actions CI workflow will validate your code.
5. **Promotion to Production**:
   - Features in `develop` are promoted to `staging` for final regression testing.
   - Tested releases are merged via PR into `main`, which automatically triggers continuous deployment to **[https://www.roimob.eu/](https://www.roimob.eu/)**.

---

## 📜 Code of Conduct
Please review and adhere to our [Code of Conduct](CODE_OF_CONDUCT.md) in all community interactions.
