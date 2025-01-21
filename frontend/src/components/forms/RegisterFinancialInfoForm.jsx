import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

export default function RegisterFinancialInfoForm ({ values, handleChange, errors }) {
  return (
    <Box className="space-y-6">
      <TextField
        required
        fullWidth
        label="Monthly Income"
        name="monthlyIncome"
        variant="outlined"
        type="number"
        value={values.monthlyIncome}
        onChange={handleChange}
        error={!!errors?.monthlyIncome}
        helperText={errors?.monthlyIncome}
        sx={{ bgcolor: "white" }}
      />

      <FormControl required fullWidth error={!!errors?.occupation}>
        <InputLabel id="occupation-select-label">Occupation</InputLabel>
        <Select
          labelId="occupation-select-label"
          label="Occupation"
          name="occupation"
          value={values.occupation}
          onChange={handleChange}
          variant="outlined"
          sx={{ bgcolor: "white" }}
        >
          <MenuItem value="employee">Employee</MenuItem>
          <MenuItem value="student">Student</MenuItem>
          <MenuItem value="self-employed">Self-employed</MenuItem>
          <MenuItem value="unemployed">Unemployed</MenuItem>
        </Select>
      </FormControl>

      <FormControl required fullWidth error={!!errors?.sourceOfIncome}>
        <InputLabel id="sourceOfIncome-select-label">Source of income</InputLabel>
        <Select
          labelId="sourceOfIncome-select-label"
          label="Source of income"
          name="sourceOfIncome"
          value={values.sourceOfIncome}
          onChange={handleChange}
          variant="outlined"
          sx={{ bgcolor: "white" }}
        >
          <MenuItem value="salary">Salary</MenuItem>
          <MenuItem value="investment">Investment</MenuItem>
          <MenuItem value="own business">Own business</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}