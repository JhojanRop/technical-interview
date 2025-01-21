'use client'
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { deleteLoan } from "@/services/loans";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Loan from "../Loan";
import UpdateLoanForm from "../forms/UpdateLoanForm";

export default function LoanLayout ({ loan }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleOpenDialog = () => setDeleteDialogOpen(true)
  const handleCloseDialog = () => setDeleteDialogOpen(false)

  const token = useMemo(() => Cookies.get('token'), [])
  const router = useRouter()

  const handleDeleteCard = async () => {
    await deleteLoan({ loanId: loan.id_loan, token })
    router.push("/")
  }
  return (
    <div className="space-y-6">
      <h2 className="text-center text-xl font-semibold">Your Loan</h2>
      <Loan {...loan} />
      <h2 className="text-center text-xl font-semibold">Update Loan</h2>
      <UpdateLoanForm loan={loan} />

      <Button variant="text" color="error" className="block mx-auto text-center capitalize" onClick={handleOpenDialog}>Don't need the loan anymore? Cancel it!</Button>
      <Dialog open={deleteDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Are you sure want cancel the loan?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Back</Button>
          <Button onClick={handleDeleteCard} color="error">Cancel loan</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}