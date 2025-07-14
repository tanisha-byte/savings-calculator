import { NextRequest, NextResponse } from "next/server";

const industryFactors = {
  technology: { wasteMultiplier: 1.2, queryComplexity: 1.1 },
  fintech: { wasteMultiplier: 1.3, queryComplexity: 1.3 },
  ecommerce: { wasteMultiplier: 1.1, queryComplexity: 1.2 },
  analytics: { wasteMultiplier: 1.4, queryComplexity: 1.4 },
  healthcare: { wasteMultiplier: 1.0, queryComplexity: 1.1 },
  retail: { wasteMultiplier: 1.1, queryComplexity: 1.0 },
};

const workloadFactors = {
  oltp: { computeWaste: 0.4, storageWaste: 0.3, queryOptimization: 0.35 },
  analytics: { computeWaste: 0.5, storageWaste: 0.4, queryOptimization: 0.45 },
  mixed: { computeWaste: 0.45, storageWaste: 0.35, queryOptimization: 0.4 },
  aiml: { computeWaste: 0.3, storageWaste: 0.2, queryOptimization: 0.25 },
};

type Industry = keyof typeof industryFactors;
type Workload = keyof typeof workloadFactors;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      monthlyCloudSpend,
      industry,
      primaryWorkload,
      currentUtilization,
      manualOptimizationHours,
      engineerHourlyCost,
      sustainabilityGoals,
    } = body;

    if (
      !industryFactors.hasOwnProperty(industry) ||
      !workloadFactors.hasOwnProperty(primaryWorkload)
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid industry or workload" },
        { status: 400 }
      );
    }

    const industryFactor = industryFactors[industry as Industry];
    const workloadFactor = workloadFactors[primaryWorkload as Workload];

    const annualSpend = monthlyCloudSpend * 12;
    const currentWastePercentage = Math.min(
      50,
      20 + (100 - currentUtilization)
    );

    const infrastructureSavings =
      annualSpend *
      0.6 *
      (currentWastePercentage / 100) *
      0.7 *
      industryFactor.wasteMultiplier;

    const databaseSpend = annualSpend * 0.25;
    const querySavings =
      databaseSpend *
      workloadFactor.queryOptimization *
      industryFactor.queryComplexity;

    const storageSpend = annualSpend * 0.15;
    const storageSavings = storageSpend * 0.7 * workloadFactor.storageWaste;

    const crossLayerBonus =
      (infrastructureSavings + querySavings + storageSavings) * 0.15;

    const productivitySavings =
      manualOptimizationHours * engineerHourlyCost * 0.7 * 12;

    const sustainabilityBonus = sustainabilityGoals
      ? (infrastructureSavings + storageSavings) * 0.05
      : 0;

    const totalSavings =
      infrastructureSavings +
      querySavings +
      storageSavings +
      crossLayerBonus +
      productivitySavings +
      sustainabilityBonus;

    const smalBluCost = annualSpend * 0.065;
    const netSavings = totalSavings - smalBluCost;
    const roi = (netSavings / smalBluCost) * 100;
    const paybackMonths = smalBluCost / (totalSavings / 12);
    const carbonSaved = totalSavings * 0.12 * 0.4;

    return NextResponse.json({
      success: true,
      data: {
        annualSpend,
        totalSavings,
        savingsPercentage: (totalSavings / annualSpend) * 100,
        monthlyNetSavings: netSavings / 12,
        roi,
        paybackMonths,
        carbonSaved,
        smalBluCost,
        netSavings,
        breakdown: {
          infrastructure: infrastructureSavings,
          database: querySavings,
          storage: storageSavings,
          crossLayer: crossLayerBonus,
          productivity: productivitySavings,
          sustainability: sustainabilityBonus,
        },
      },
    });
  } catch (error) {
    console.error("Error in calculation:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
