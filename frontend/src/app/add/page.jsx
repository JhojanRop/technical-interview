'use client'
import CreateCardForm from "@/components/forms/CreateCardForm";
import CreateLoanForm from "@/components/forms/CreateLoanForm";
import { Container } from "@mui/material";
import { useState } from "react";

export default function AddCardLoan () {
  const [selectedOption, setSelectedOption] = useState("card")

  return (
    <Container maxWidth="md">
      <h2 className="capitalize text-2xl text-center font-semibold my-2">Add new {selectedOption}</h2>
      <div className="h-10 items-center justify-center rounded-md bg-gray-200 p-1 text-muted-foreground grid w-full grid-cols-2">
        <button data-state={selectedOption === "card" && "active"} className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm" onClick={() => setSelectedOption('card')}>Card</button>
        <button data-state={selectedOption === "loan" && "active"} className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm" onClick={() => setSelectedOption('loan')}>Loan</button>
      </div>

      <div>
        {selectedOption === "card" && <CreateCardForm />}
        {selectedOption === "loan" && <CreateLoanForm />}
      </div>
    </Container>
  )
}