'use client'
import { useLoanForms } from "@/hooks/useLoanForms";
import { Alert, Button, FormControl, InputLabel, TextField } from "@mui/material";

export default function CreateLoanForm () {
  const { data, errors, handleChange, handleSubmit } = useLoanForms({ loan: {} })

  return (
    <div>
      {errors.request && <Alert severity="error">{errors.request}</Alert>}
      <form className="my-5 space-y-5" onSubmit={(e) => handleSubmit(e, "create")}>
        <TextField
          required
          fullWidth
          label="Purpose"
          name="purpose"
          value={data.purpose}
          onChange={handleChange}
          error={errors.purpose}
          helperText={errors.purpose}
        />

        <TextField
          required
          fullWidth
          label="Amount"
          name="amount"
          type="number"
          value={data.amount}
          onChange={handleChange}
          error={errors.amount}
          helperText={errors.amount}
        />

        <TextField
          required
          fullWidth
          label="Interest rate"
          name="interestRate"
          type="number"
          value={data.interestRate}
          onChange={handleChange}
          error={errors.interestRate}
          helperText={errors.interestRate}
        />

        <TextField
          required
          fullWidth
          label="Term"
          name="term"
          type="number"
          value={data.term}
          onChange={handleChange}
          error={errors.term}
          helperText={errors.term || "Months"}
        />

        <Button type="submit" variant="contained">Add Loan</Button>
      </form>
    </div>
  )
}