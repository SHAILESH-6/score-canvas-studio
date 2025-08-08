import React, { useState, useEffect } from 'react';

// Mocking shadcn/ui components with Tailwind CSS for a self-contained example.
// All styles are directly applied using Tailwind classes.

// Mock Lucide-React icons with inline SVGs
const CreditCard = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);
const FileText = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" x2="8" y1="13" y2="13" />
    <line x1="16" x2="8" y1="17" y2="17" />
    <line x1="10" x2="8" y1="9" y2="9" />
  </svg>
);
const TrendingUp = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);
const ThumbsUp = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 10v12h4a2 2 0 0 0 2-2v-3a2 2 0 0 1 2-2h3.5a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V7a4 4 0 0 0-4-4v0a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v14" />
  </svg>
);
const AlertCircle = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12" y1="16" y2="16" />
  </svg>
);
const Target = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

// Simplified UI Components
const Button = ({ children, className = '', variant = 'default', size = 'md', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  const sizeClasses = {
    'sm': 'h-9 px-3',
    'md': 'h-10 px-4 py-2',
    'lg': 'h-11 px-8',
  }[size];
  const variantClasses = {
    'default': 'bg-primary text-primary-foreground hover:bg-primary/90',
    'destructive': 'bg-red-500 text-white hover:bg-red-600',
    'outline': 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    'secondary': 'bg-gray-200 text-secondary-foreground hover:bg-gray-300',
  }[variant];
  return (
    <button className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Input = ({ className = '', type = 'text', ...props }) => {
  return (
    <input
      type={type}
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
};

const Label = ({ children, className = '', htmlFor, ...props }) => {
  return (
    <label htmlFor={htmlFor} className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props}>
      {children}
    </label>
  );
};

const Card = ({ children, className = '', ...props }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

const CardContent = ({ children, className = '', ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const Badge = ({ children, className = '', variant = 'default', ...props }) => {
  const variantClasses = {
    'default': 'bg-blue-500 text-white',
    'secondary': 'bg-gray-200 text-gray-800',
    'destructive': 'bg-red-500 text-white',
  }[variant];
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variantClasses} ${className}`} {...props}>
      {children}
    </span>
  );
};

const Select = ({ children, value, onValueChange, ...props }) => {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
    >
      {children}
    </select>
  );
};

const SelectTrigger = ({ children }) => <>{children}</>;
const SelectValue = ({ placeholder }) => <option value="" disabled>{placeholder}</option>;
const SelectContent = ({ children }) => <>{children}</>;
const SelectItem = ({ value, children }) => <option value={value}>{children}</option>;

// Simple CreditScoreGauge component
const CreditScoreGauge = ({ score }) => {
  const circumference = 2 * Math.PI * 45;
  const progress = score / 900;
  const strokeDashoffset = circumference * (1 - progress);

  let color;
  if (score < 580) color = 'stroke-red-500';
  else if (score < 670) color = 'stroke-yellow-500';
  else if (score < 740) color = 'stroke-blue-500';
  else if (score < 800) color = 'stroke-green-500';
  else color = 'stroke-green-600';

  return (
    <div className="relative flex items-center justify-center w-48 h-48 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle
          className="text-gray-200"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        <circle
          className={`transition-all duration-1000 ${color}`}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-4xl font-bold">{score}</div>
        <div className="text-sm text-gray-500">Credit Score</div>
      </div>
    </div>
  );
};

// Simplified utility functions
interface CreditScoreInputs {
  rentPaymentOnTimeRatio: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  missedUtilityPayments: number;
  educationLevel: number; // 0 for high-school, 1 for college/bachelors, 2 for masters/phd
  employmentYears: number;
  loanAmount: number;
}

interface CreditScoreResult {
  creditScore: number;
  isApproved: boolean;
  loanAmount: number;
  highlights: string[];
  suggestions: string[];
}

const calculateCreditScore = (inputs: CreditScoreInputs): CreditScoreResult => {
  const { monthlyIncome, monthlyExpenses, missedUtilityPayments, educationLevel, employmentYears, loanAmount, rentPaymentOnTimeRatio } = inputs;
  
  let score = 500;
  let highlights = [];
  let suggestions = [];

  // Income and expenses
  const savings = monthlyIncome - monthlyExpenses;
  if (savings > 0) {
    score += Math.min(100, (savings / monthlyIncome) * 200);
    highlights.push('Good management of income and expenses.');
  } else {
    score += Math.max(-150, (savings / monthlyIncome) * 200);
    suggestions.push('Try to increase your savings by reducing monthly expenses.');
  }

  // Payment history
  if (missedUtilityPayments === 0) {
    score += 150;
    highlights.push('Excellent payment history with no missed utility payments.');
  } else {
    score -= Math.min(150, missedUtilityPayments * 50);
    suggestions.push(`Address your missed payments to improve your score. You have ${missedUtilityPayments} missed payments.`);
  }
  
  // Rent payment ratio
  if (rentPaymentOnTimeRatio === 1) {
    score += 50;
    highlights.push('Consistent on-time rent payments.');
  } else {
    score -= 50;
    suggestions.push('Aim for 100% on-time rent payments to boost your score.');
  }

  // Education and employment
  score += educationLevel * 20;
  score += Math.min(50, employmentYears * 5);

  if (employmentYears < 2) {
    suggestions.push('Longer employment history can positively impact your score.');
  }

  // Final score check
  score = Math.max(300, Math.min(900, Math.round(score)));

  // Loan approval logic
  const debtToIncomeRatio = (loanAmount * 0.05) / monthlyIncome; // Simple mock for EMI vs income
  const isApproved = score >= 670 && debtToIncomeRatio < 0.4;
  
  return {
    creditScore: score,
    isApproved,
    loanAmount,
    highlights,
    suggestions,
  };
};

// Main Credit Score Dashboard component from user's request
const CreditScoreDashboard = () => {
  const [formData, setFormData] = useState<any>({
    rent: '',
    monthlyIncome: '',
    monthlyExpenses: '',
    missedPayments: '0',
    educationLevel: '',
    employmentYears: '',
    loanAmount: '',
    rentPaymentRatio: '100'
  });

  const [creditResult, setCreditResult] = useState<CreditScoreResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckScore = () => {
    const {
      monthlyIncome,
      monthlyExpenses,
      missedPayments,
      educationLevel,
      employmentYears,
      loanAmount,
      rentPaymentRatio
    } = formData;

    // Validate required fields
    if (!monthlyIncome || !monthlyExpenses || !educationLevel || !employmentYears) {
      setShowError(true);
      return;
    }

    setShowError(false);
    setIsCalculating(true);

    // Simulate processing time
    setTimeout(() => {
      const inputs: CreditScoreInputs = {
        rentPaymentOnTimeRatio: parseFloat(rentPaymentRatio) / 100 || 1,
        monthlyIncome: parseFloat(monthlyIncome) || 0,
        monthlyExpenses: parseFloat(monthlyExpenses) || 0,
        missedUtilityPayments: parseInt(missedPayments) || 0,
        educationLevel: educationLevel === 'high-school' ? 0 :
                       educationLevel === 'college' || educationLevel === 'bachelors' ? 1 : 2,
        employmentYears: parseFloat(employmentYears) || 0,
        loanAmount: parseFloat(loanAmount) || parseFloat(monthlyIncome) * 3 || 200000
      };

      const result = calculateCreditScore(inputs);
      setCreditResult(result);
      setIsCalculating(false);
    }, 1000);
  };

  const getScoreStatus = (score: number) => {
    if (score < 580) return { status: 'Poor', color: 'destructive' };
    if (score < 670) return { status: 'Fair', color: 'secondary' };
    if (score < 740) return { status: 'Good', color: 'default' };
    if (score < 800) return { status: 'Very Good', color: 'secondary' };
    return { status: 'Excellent', color: 'default' };
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-8">
          CREDIT SCORE CALCULATOR
        </h1>
        {showError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4 max-w-2xl mx-auto" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-2">Please fill in all required fields.</span>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Section - Gauge and Buttons */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Your Credit Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full max-w-md mx-auto">
                  {creditResult ? (
                    <CreditScoreGauge score={creditResult.creditScore} />
                  ) : (
                    <div className="h-48 flex flex-col items-center justify-center text-muted-foreground p-4 text-center">
                      <CreditCard className="h-12 w-12 text-gray-400 mb-2" />
                      <span className="text-gray-500">
                        Enter your information and click "Check My Score" to see your credit score.
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-3">
              <Button
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                size="lg"
                onClick={handleCheckScore}
                disabled={isCalculating}
              >
                <CreditCard className="mr-2 h-5 w-5" />
                {isCalculating ? 'Calculating...' : 'Check My Score'}
              </Button>
              <Button variant="outline" className="w-full border-blue-500 text-blue-500 hover:bg-blue-50" size="lg">
                <FileText className="mr-2 h-5 w-5" />
                Credit Report
              </Button>
              <Button variant="secondary" className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300" size="lg">
                <TrendingUp className="mr-2 h-5 w-5" />
                Improve Score Tips
              </Button>
            </div>
          </div>

          {/* Right Section - Input Fields */}
          <Card>
            <CardHeader>
              <CardTitle>Financial Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="income">Monthly Income (₹)</Label>
                  <Input
                    id="income"
                    type="number"
                    placeholder="Enter your monthly income"
                    value={formData.monthlyIncome}
                    onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="expenses">Monthly Expenses (₹)</Label>
                  <Input
                    id="expenses"
                    type="number"
                    placeholder="Enter your monthly expenses"
                    value={formData.monthlyExpenses}
                    onChange={(e) => handleInputChange('monthlyExpenses', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="rentRatio">Rent Payment On-Time Ratio (%)</Label>
                  <Input
                    id="rentRatio"
                    type="number"
                    placeholder="90"
                    min="0"
                    max="100"
                    value={formData.rentPaymentRatio}
                    onChange={(e) => handleInputChange('rentPaymentRatio', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="missedPayments">Missed Utility Payments</Label>
                  <Select value={formData.missedPayments} onValueChange={(value) => handleInputChange('missedPayments', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of missed payments" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">None</SelectItem>
                      <SelectItem value="1">1 time</SelectItem>
                      <SelectItem value="2">2 times</SelectItem>
                      <SelectItem value="3">3+ times</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="education">Education Level</Label>
                  <Select value={formData.educationLevel} onValueChange={(value) => handleInputChange('educationLevel', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-school">High School</SelectItem>
                      <SelectItem value="college">College</SelectItem>
                      <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                      <SelectItem value="masters">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="employment">Employment Years</Label>
                  <Input
                    id="employment"
                    type="number"
                    placeholder="Years of employment"
                    value={formData.employmentYears}
                    onChange={(e) => handleInputChange('employmentYears', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="loan">Current Loan Amount (₹)</Label>
                  <Input
                    id="loan"
                    type="number"
                    placeholder="Enter total loan amount"
                    value={formData.loanAmount}
                    onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section - Outputs */}
        {creditResult && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Credit Score Summary */}
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <ThumbsUp className="h-5 w-5 text-green-600" />
                  Credit Score
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold mb-2">{creditResult.creditScore}</div>
                <Badge variant={getScoreStatus(creditResult.creditScore).color}>
                  {getScoreStatus(creditResult.creditScore).status}
                </Badge>
                <div className="mt-2 text-sm text-gray-500">
                  {creditResult.isApproved ? `Approved for ₹${creditResult.loanAmount.toLocaleString()}` : 'Not approved for current loan amount'}
                </div>
              </CardContent>
            </Card>

            {/* Highlights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Highlights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {creditResult.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {creditResult.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans">
      <CreditScoreDashboard />
    </div>
  );
}
