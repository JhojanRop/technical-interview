'use client'

import LoanLayout from "@/components/layout/LoanLayout"
import Loan from "@/components/Loan"
import { useGetLoanInfo } from "@/hooks/useGetLoanInfo"
import { Alert, CircularProgress, Container } from "@mui/material"
import { useParams } from "next/navigation"

export default function LoanDetails () {
  const { id } = useParams()
  const { loan, error, loading } = useGetLoanInfo({ loanId: id })
  return (
    <Container maxWidth="md" className="py-6">
      {
        loading
          ? <CircularProgress></CircularProgress>
          : error
            ? <Alert>{error}</Alert>
            : <LoanLayout loan={loan} />
      }

    </Container>
  )
}