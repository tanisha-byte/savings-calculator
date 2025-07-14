/* === app/page.tsx === */
"use client";

import { useState } from "react";

type FormData = {
  monthlyCloudSpend: number;
  industry: string;
  primaryWorkload: string;
  currentUtilization: number;
  manualOptimizationHours: number;
  engineerHourlyCost: number;
  sustainabilityGoals: boolean;
};

type ResultData = {
  annualSpend: number;
  totalSavings: number;
  savingsPercentage: number;
  monthlyNetSavings: number;
  roi: number;
  paybackMonths: number;
  carbonSaved: number;
  smalBluCost: number;
  netSavings: number;
  breakdown: {
    infrastructure: number;
    database: number;
    storage: number;
    crossLayer: number;
    productivity: number;
    sustainability: number;
  };
};

export default function Page() {
  const [form, setForm] = useState<FormData>({
    monthlyCloudSpend: 1000,
    industry: "technology",
    primaryWorkload: "oltp",
    currentUtilization: 60,
    manualOptimizationHours: 10,
    engineerHourlyCost: 50,
    sustainabilityGoals: false,
  });

  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;
    const isCheckbox = type === "checkbox";

    setForm((prev) => ({
      ...prev,
      [name]: isCheckbox
        ? (target as HTMLInputElement).checked
        : type === "number"
        ? +value
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();

      if (!json.success) {
        setError(json.error || "Something went wrong.");
        setResult(null);
      } else {
        setResult(json.data);
      }
    } catch (err) {
      setError("Network error.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <h1 className="text-2xl font-bold mb-6">SmalBlu Cloud Cost Calculator</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">Monthly Cloud Spend ($)</label>
          <input
            type="number"
            name="monthlyCloudSpend"
            className="input"
            value={form.monthlyCloudSpend}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="label">Industry</label>
          <select
            name="industry"
            className="input"
            value={form.industry}
            onChange={handleChange}
          >
            <option value="technology">Technology</option>
            <option value="fintech">Fintech</option>
            <option value="ecommerce">E-commerce</option>
            <option value="analytics">Analytics</option>
            <option value="healthcare">Healthcare</option>
            <option value="retail">Retail</option>
          </select>
        </div>

        <div>
          <label className="label">Primary Workload</label>
          <select
            name="primaryWorkload"
            className="input"
            value={form.primaryWorkload}
            onChange={handleChange}
          >
            <option value="oltp">OLTP</option>
            <option value="analytics">Analytics</option>
            <option value="mixed">Mixed</option>
            <option value="aiml">AI/ML</option>
          </select>
        </div>

        <div>
          <label className="label">Current Utilization (%)</label>
          <input
            type="number"
            name="currentUtilization"
            className="input"
            value={form.currentUtilization}
            onChange={handleChange}
            min={0}
            max={100}
            required
          />
        </div>

        <div>
          <label className="label">Manual Optimization Hours/Month</label>
          <input
            type="number"
            name="manualOptimizationHours"
            className="input"
            value={form.manualOptimizationHours}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="label">Engineer Hourly Cost ($)</label>
          <input
            type="number"
            name="engineerHourlyCost"
            className="input"
            value={form.engineerHourlyCost}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="sustainabilityGoals"
            checked={form.sustainabilityGoals}
            onChange={handleChange}
          />
          <label>Sustainability goals?</label>
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Calculating..." : "Calculate Savings"}
        </button>
      </form>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {result && (
        <div className="mt-8 bg-gray-50 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Results</h2>
          <p>
            <strong>Annual Spend:</strong> ${result.annualSpend.toFixed(2)}
          </p>
          <p>
            <strong>Total Savings:</strong> ${result.totalSavings.toFixed(2)}
          </p>
          <p>
            <strong>ROI:</strong> {result.roi.toFixed(2)}%
          </p>
          <p>
            <strong>Net Monthly Savings:</strong> $
            {result.monthlyNetSavings.toFixed(2)}
          </p>
          <p>
            <strong>Payback in:</strong> {result.paybackMonths.toFixed(1)}{" "}
            months
          </p>
          <p>
            <strong>Carbon Saved:</strong> {result.carbonSaved.toFixed(2)} tons
          </p>
        </div>
      )}
    </main>
  );
}
