import { formatInterestRate } from "@/utils/format";

export default function Loan ({ purpose, status, amount, interest_rate, term }) {
  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">{purpose}</h3>
        <p className="text-sm">{status}</p>
      </div>
      <div className="p-6 pt-0">
        <p className="text-2xl font-semibold">${amount}</p>
        <p className="text-sm">Interest Rate: {formatInterestRate(interest_rate)}% | Term: {term} months</p>
      </div>
    </div>
  )
}