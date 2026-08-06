export type EmiInput = {
  price: number;
  downPayment: number;
  tenureMonths: number;
  annualRatePercent: number;
};

export type EmiResult = {
  loanAmount: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
};

export function calculateEmi({
  price,
  downPayment,
  tenureMonths,
  annualRatePercent,
}: EmiInput): EmiResult {
  const loanAmount = Math.max(price - downPayment, 0);
  const monthlyRate = annualRatePercent / 12 / 100;

  if (loanAmount <= 0 || tenureMonths <= 0) {
    return {
      loanAmount,
      monthlyPayment: 0,
      totalPayment: 0,
      totalInterest: 0,
    };
  }

  const monthlyPayment =
    monthlyRate === 0
      ? loanAmount / tenureMonths
      : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
        (Math.pow(1 + monthlyRate, tenureMonths) - 1);

  const totalPayment = monthlyPayment * tenureMonths;
  const totalInterest = totalPayment - loanAmount;

  return { loanAmount, monthlyPayment, totalPayment, totalInterest };
}
