# Cloud Cost Calculator

A sleek, responsive cloud savings calculator built with **Next.js**, **TypeScript**, and **Tailwind CSS**. Designed to estimate annual savings and ROI.

> 🛠️ This project was prototyped on [CodeSandbox](https://codesandbox.io/), exported to **VS Code**, and pushed to GitHub.

---

## 🚀 Features

- 🔢 Real-time calculation of cloud cost savings
- 🧠 Industry- and workload-specific modeling logic
- 🌱 Carbon savings and sustainability bonus estimates
- 💡 Instant ROI and payback time projections
- 🎨 Fully responsive and styled with Tailwind CSS

---

## 🧰 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Geist from Vercel
- **API Route**: Server-side savings logic using `app/api/calculate/route.ts`

---

## 📦 Installation

```bash
# 1. Clone the repo
git clone https://github.com/tanisha-byte/savings-calculator.git

# 2. Navigate to the project
cd savings-calculator

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

---

## 🧮 Calculation Logic

### Infrastructure Optimization (Primary Driver)

```
Savings = (Cloud Spend × 0.6) × (Waste Percentage / 100) × 0.7 × Industry Factor
```

- Based on documented 87% resource idle time
- 70% waste elimination rate from SmalBlu optimization
- Industry-specific waste multipliers

### Database Query Optimization

```
Savings = (Cloud Spend × 0.25) × Workload Factor × Industry Complexity
```

- 25% of cloud spend typically database-related
- Workload-specific optimization potential (35-45%)
- Industry complexity multipliers for query patterns

### Storage Optimization

```
Savings = (Cloud Spend × 0.15) × 0.7 × Workload Factor
```

- Based on 70% "dead data" in enterprise storage
- SmalBlu's compression engine capabilities
- Workload-specific storage efficiency gains

### Cross-Layer Synergies

```
Bonus = (Infrastructure + Database + Storage Savings) × 0.15
```

- SmalBlu's unique cross-layer optimization advantage
- 15% additional savings from holistic approach
- Accounts for optimization synergies across all 6 data layers

### Productivity Gains

```
Savings = Manual Hours × Hourly Rate × 0.7 × 12 months
```

- 70% reduction in manual tuning time
- Automation of repetitive optimization tasks
- Frees engineering teams for innovation

---

## 🎯 Industry-Specific Factors

| Industry | Waste Multiplier | Query Complexity | Reasoning |
|----------|------------------|------------------|-----------|
| Analytics | 1.4x | 1.4x | Complex queries, variable workloads |
| Fintech | 1.3x | 1.3x | Compliance overhead, peak transactions |
| Technology | 1.2x | 1.1x | Rapid scaling, experimentation |
| E-commerce | 1.1x | 1.2x | Seasonal spikes, inventory management |
| Healthcare | 1.0x | 1.1x | Regulated, steady workloads |
| Retail | 1.1x | 1.0x | Peak seasons, inventory optimization |

---

## 🌱 Carbon Savings & Sustainability

The calculator includes environmental impact estimates:

- **Carbon Footprint Reduction**: Based on optimized resource utilization
- **Sustainability Bonus**: Additional savings from reduced energy consumption
- **Green Computing**: Aligned with corporate sustainability goals

---

## 📊 ROI & Payback Analysis

- **ROI Calculation**: Annual savings compared to implementation costs
- **Payback Period**: Time to recover initial investment
- **Break-even Analysis**: Cost-benefit timeline visualization

---

## 🎨 Design & UX

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Updates**: Instant calculations as users input data
- **Professional Styling**: Clean, modern interface with smooth transitions
- **Accessibility**: WCAG-compliant design patterns

---


