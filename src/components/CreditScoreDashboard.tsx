import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CreditScoreGauge from './CreditScoreGauge';
import { CreditCard, FileText, TrendingUp, ThumbsUp, AlertCircle, Target } from 'lucide-react';
import { calculateCreditScore, CreditScoreInputs, CreditScoreResult } from '@/utils/creditScoreCalculator';

interface FormData {
  rent: string;
  monthlyIncome: string;
  monthlyExpenses: string;
  missedPayments: string;
  educationLevel: string;
  employmentYears: string;
  loanAmount: string;
  rentPaymentRatio: string;
}

const CreditScoreDashboard = () => {
  const [formData, setFormData] = useState<FormData>({
    rent: '',
    monthlyIncome: '',
    monthlyExpenses: '',
    missedPayments: '0',
    educationLevel: '',
    employmentYears: '',
    loanAmount: '',
    rentPaymentRatio: '100'
  });

  const [creditResult, setCreditResult] = useState<CreditScoreResult>({
    creditScore: 681,
    isApproved: true,
    loanAmount: 200000,
    highlights: ["Building credit history", "Some positive patterns", "Room for improvement"],
    suggestions: ["Maintain payment consistency", "Build employment history", "Monitor expenses"]
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Calculate credit score when form data changes
  useEffect(() => {
    const {
      monthlyIncome,
      monthlyExpenses,
      missedPayments,
      educationLevel,
      employmentYears,
      loanAmount,
      rentPaymentRatio
    } = formData;

    // Only calculate if we have minimum required data
    if (monthlyIncome && monthlyExpenses && educationLevel && employmentYears) {
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
    }
  }, [formData]);

  const getScoreStatus = (score: number) => {
    if (score < 580) return { status: 'Poor', color: 'destructive' };
    if (score < 670) return { status: 'Fair', color: 'secondary' };
    if (score < 740) return { status: 'Good', color: 'default' };
    if (score < 800) return { status: 'Very Good', color: 'secondary' };
    return { status: 'Excellent', color: 'default' };
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Section - Gauge and Buttons */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Your Credit Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full max-w-md mx-auto">
                  <CreditScoreGauge score={creditResult.creditScore} />
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-3">
              <Button className="w-full" size="lg">
                <CreditCard className="mr-2 h-5 w-5" />
                Check My Score
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                <FileText className="mr-2 h-5 w-5" />
                Credit Report
              </Button>
              <Button variant="secondary" className="w-full" size="lg">
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
              <Badge variant={getScoreStatus(creditResult.creditScore).color as any}>
                {getScoreStatus(creditResult.creditScore).status}
              </Badge>
              <div className="mt-2 text-sm text-muted-foreground">
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
      </div>
    </div>
  );
};

export default CreditScoreDashboard;