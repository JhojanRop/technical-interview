import { useCardForms } from "@/hooks/useCardForms";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs";

export default function UpdateCardForm ({ card }) {
  const { data, errors, handleChange, handleDate, handleSubmit } = useCardForms({ card })

  return (
    <form className="space-y-5" onSubmit={(e) => handleSubmit(e, "update", card.id)}>
      <FormControl required fullWidth>
        <InputLabel id="type-card-update-label">Type</InputLabel>
        <Select
          labelId="type-card-update-label"
          label="Type"
          name="type"
          value={data.type}
          onChange={handleChange}
        >
          <MenuItem value="debit">Debit</MenuItem>
          <MenuItem value="credit">Credit</MenuItem>
        </Select>
      </FormControl>

      <FormControl required fullWidth>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Expiration date"
            name="expiration_date"
            value={data.expiration_date}
            onChange={handleDate}
            views={["year", "month"]}
            format="MM/YY"
            minDate={dayjs().add(6, 'month')}
            maxDate={dayjs().add(6, 'year')}
          />
        </LocalizationProvider>
      </FormControl>

      {data.type === 'debit' &&
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
      }

      {data.type === 'credit' &&
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
      }

      <Button type="submit" variant="contained" sx={{ display: 'block', mx: 'auto' }}>Update</Button>
    </form>
  )
}