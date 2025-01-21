'use client'
import { useCardForms } from "@/hooks/useCardForms"
import { Alert, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"

export default function CreateCardForm () {
  const { data, errors, handleChange, handleSubmit } = useCardForms({ card: {} })

  return (
    <div>
      {errors.request && <Alert severity="error">{errors.request}</Alert>}
      <form className="my-5 space-y-5" onSubmit={(e) => handleSubmit(e, "create")}>
        <FormControl fullWidth required>
          <InputLabel id="select-type-card-label">Type</InputLabel>
          <Select
            labelId="select-type-card-label"
            label="Type"
            value={data.type}
            onChange={handleChange}
            name="type"
          >
            <MenuItem value="debit">Debit</MenuItem>
            <MenuItem value="credit">Credit</MenuItem>
          </Select>
        </FormControl>

        {
          data.type === "credit"
            ? (
              <TextField
                required
                fullWidth
                label="Credit limit"
                name="creditLimit"
                value={data.creditLimit}
                onChange={handleChange}
                type="number"
                error={errors.creditLimit}
                helperText={errors.creditLimit}
              />
            )
            : (
              <TextField
                required
                fullWidth
                label="Balance"
                name="balance"
                value={data.balance}
                onChange={handleChange}
                type="number"
                error={errors.balance}
                helperText={errors.balance}
              />
            )
        }

        <Button sx={{ display: 'block', mx: 'auto' }} type="submit" variant="contained">Add Card</Button>
      </form>
    </div>
  )
}