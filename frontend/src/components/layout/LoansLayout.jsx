import Link from "next/link";
import Loan from "../Loan";

export default function LoansLayout ({ loans }) {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Your Loans</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {
          loans.length > 0
            ?
            loans.map(loan => (
              <Link key={loan.id_loan} href={`/loan/${loan.id_loan}`}>
                <Loan {...loan} />
              </Link>
            ))
            : (<p>You don't have any registered loans yet.</p>)
        }
      </div>
    </div>
  )
}