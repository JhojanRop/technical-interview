'use client'
import { useState } from "react"
import CardsLayout from "./CardsLayout"
import LoansLayout from "./LoansLayout"
import Link from "next/link"

export default function IndexLayout ({ cards, loans }) {
  const [selectedOption, setSelectedOption] = useState("cards")

  return (
    <section className="mt-3">
      <div className="h-10 items-center justify-center rounded-md bg-gray-200 p-1 text-muted-foreground grid w-full grid-cols-2">
        <button data-state={selectedOption === "cards" && "active"} className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm" onClick={() => setSelectedOption('cards')}>Cards</button>
        <button data-state={selectedOption === "loans" && "active"} className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm" onClick={() => setSelectedOption('loans')}>Loans</button>
      </div>

      <section>
        {selectedOption === "cards" && <CardsLayout cards={cards} />}
        {selectedOption === "loans" && <LoansLayout loans={loans} />}
      </section>

      <p className="mt-7 text-center">
        Need a new card/loan? <Link href="/add" className="text-blue-500 underline">Add it now</Link>
      </p>
    </section>
  )
}