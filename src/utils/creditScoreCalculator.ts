export interface CreditScoreInputs {
  rentPaymentOnTimeRatio: number; // 0-1 (percentage as decimal)
  monthlyIncome: number;
  monthlyExpenses: number;
  missedUtilityPayments: number;
  educationLevel: number; // 0=highschool, 1=bachelors, 2=masters
  employmentYears: number;
  loanAmount: number;
}

export interface CreditScoreResult {
  creditScore: number;
  isApproved: boolean;
  loanAmount: number;
  highlights: string[];
  suggestions: string[];
}

export const calculateCreditScore = (inputs: CreditScoreInputs): CreditScoreResult => {
  const {
    rentPaymentOnTimeRatio,
    monthlyIncome,
    monthlyExpenses,
    missedUtilityPayments,
    educationLevel,
    employmentYears,
    loanAmount
  } = inputs;

  // Weights based on your Python code
  const weights = {
    rentPayment: 0.25,
    income: 0.20,
    expenses: 0.20,
    utilityPayments: 0.15,
    education: 0.05,
    employment: 0.15
  };

  // Normalize each factor to 0-100 scale
  const rentScore = rentPaymentOnTimeRatio * 100;
  
  // Income score (higher income = better, cap at reasonable amount)
  const incomeScore = Math.min((monthlyIncome / 100000) * 100, 100);
  
  // Expense ratio score (lower expense-to-income ratio = better)
  const expenseRatio = monthlyExpenses / monthlyIncome;
  const expenseScore = Math.max(0, 100 - (expenseRatio * 100));
  
  // Utility payments score (fewer missed payments = better)
  const utilityScore = Math.max(0, 100 - (missedUtilityPayments * 20));
  
  // Education score
  const educationScore = (educationLevel / 2) * 100;
  
  // Employment score (more years = better, cap at 10 years)
  const employmentScore = Math.min((employmentYears / 10) * 100, 100);

  // Calculate weighted score
  const weightedScore = (
    rentScore * weights.rentPayment +
    incomeScore * weights.income +
    expenseScore * weights.expenses +
    utilityScore * weights.utilityPayments +
    educationScore * weights.education +
    employmentScore * weights.employment
  );

  // Convert to credit score range (300-900)
  const creditScore = Math.round(300 + (weightedScore / 100) * 600);
  
  // Determine loan approval (simplified logic)
  const debtToIncomeRatio = (loanAmount / 12) / monthlyIncome;
  const isApproved = creditScore >= 600 && debtToIncomeRatio < 0.4 && missedUtilityPayments < 3;

  // Generate highlights
  const highlights: string[] = [];
  if (rentPaymentOnTimeRatio > 0.9) highlights.push("Excellent rent payment history shows reliability");
  if (employmentYears >= 3) highlights.push("Solid employment history indicates stability");
  if (expenseRatio < 0.6) highlights.push("Healthy income-to-expense ratio");
  if (missedUtilityPayments === 0) highlights.push("Perfect utility payment record");
  if (educationLevel >= 1) highlights.push("Higher education demonstrates commitment");
  if (monthlyIncome > 50000) highlights.push("Strong monthly income capacity");

  // Take top 3 highlights
  const topHighlights = highlights.slice(0, 3);
  if (topHighlights.length === 0) {
    topHighlights.push("Building credit history", "Some positive payment patterns", "Room for improvement identified");
  }

  // Generate suggestions
  const suggestions: string[] = [];
  if (rentPaymentOnTimeRatio < 0.9) suggestions.push("Improve rent payment consistency");
  if (missedUtilityPayments > 0) suggestions.push("Maintain perfect utility payment history");
  if (expenseRatio > 0.7) suggestions.push("Reduce monthly expenses relative to income");
  if (employmentYears < 2) suggestions.push("Build longer employment history for stability");
  if (educationLevel === 0) suggestions.push("Consider further education to boost earning potential");
  if (monthlyIncome < 30000) suggestions.push("Explore opportunities to increase income");

  // Take top 3 suggestions
  const topSuggestions = suggestions.slice(0, 3);
  if (topSuggestions.length === 0) {
    topSuggestions.push("Maintain current good practices", "Continue building credit history", "Monitor credit regularly");
  }

  return {
    creditScore,
    isApproved,
    loanAmount,
    highlights: topHighlights,
    suggestions: topSuggestions
  };
};