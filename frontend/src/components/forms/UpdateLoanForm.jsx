import { useLoanForms } from "@/hooks/useLoanForms";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

export default function UpdateLoanForm ({ loan }) {
  const { data, errors, handleChange, handleSubmit } = useLoanForms({ loan })
  return (
    <form className="space-y-5" onSubmit={(e) => handleSubmit(e, "update", loan.id_loan)}>
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
        value={data.amount}
        onChange={handleChange}
        error={errors.amount}
        helperText={errors.amount}
        type="number"
      />
      <TextField
        required
        fullWidth
        label="Interest rate (%)"
        name="interestRate"
        value={data.interestRate}
        onChange={handleChange}
        error={errors.interestRate}
        helperText={errors.interestRate}
        type="number"
      />
      <TextField
        required
        fullWidth
        label="Term"
        name="term"
        value={data.term}
        onChange={handleChange}
        error={errors.term}
        helperText={errors.term || "Months"}
        type="number"
      />

      <FormControl required fullWidth>
        <InputLabel id="status-select-label">Status</InputLabel>
        <Select
          labelId="status-select-label"
          label="Status"
          name="status"
          value={data.status}
          onChange={handleChange}
        >
          <MenuItem value="approved">Approved</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
          <MenuItem value="paid">Paid</MenuItem>
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" className="block mx-auto">Update</Button>
    </form>
  )
}