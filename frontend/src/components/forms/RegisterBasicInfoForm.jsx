import { Box, TextField } from "@mui/material"

export default function RegisterBasicInfoForm ({ values, handleChange, errors }) {
  return (
    <Box className="space-y-6">
      <TextField
        required
        fullWidth
        label="Full name"
        name="fullName"
        variant="outlined"
        value={values.fullName}
        onChange={handleChange}
        error={!!errors?.fullName}
        helperText={errors?.fullName}
        className="no-autofill"
        sx={{ bgcolor: "white" }}
      />

      <TextField
        required
        fullWidth
        label="Email"
        name="email"
        type="email"
        variant="outlined"
        value={values.email}
        onChange={handleChange}
        error={!!errors?.email}
        helperText={errors?.email}
        className="no-autofill"
        sx={{ bgcolor: "white" }}
      />

      <TextField
        required
        fullWidth
        label="Password"
        name="password"
        type="password"
        variant="outlined"
        value={values.password}
        onChange={handleChange}
        error={!!errors?.password}
        helperText={errors?.password}
        className="no-autofill"
        sx={{ bgcolor: "white" }}
      />
    </Box>
  )
}
