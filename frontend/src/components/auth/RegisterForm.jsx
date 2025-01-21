'use client'
import { useRegisterForm } from "@/hooks/useRegister";
import { Alert, Box, Button, CircularProgress, Step, StepLabel, Stepper } from "@mui/material";
import RegisterBasicInfoForm from "../forms/RegisterBasicInfoForm";
import RegisterFinancialInfoForm from "../forms/RegisterFinancialInfoForm";

export default function RegisterForm () {
  const {
    currentStep,
    values,
    errors,
    isSubmitting,
    handleChange,
    handleNext,
    handleBack,
    handleSubmit,
  } = useRegisterForm();

  const steps = ['Basic information', 'Financial information', 'Done!'];
  return (
    <Box>
      <h2 className="my-5 text-xl font-semibold text-center">Complete the following information</h2>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={currentStep} alternativeLabel>
          {steps.map((label, i) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Box sx={{ mt: 4, mb: 4 }}>
        {currentStep === 0 && (
          <RegisterBasicInfoForm
            values={values}
            handleChange={handleChange}
            errors={errors}
          />
        )}

        {currentStep === 1 && (
          <RegisterFinancialInfoForm
            values={values}
            handleChange={handleChange}
            errors={errors}
          />
        )}

        {errors.submit && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errors.submit}
          </Alert>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          {currentStep > 0 && (
            <Button
              variant="outlined"
              onClick={handleBack}
              disabled={isSubmitting}
            >
              Back
            </Button>
          )}

          <Button
            variant="contained"
            onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext}
            disabled={isSubmitting}
            sx={{ ml: 'auto' }}
          >
            {isSubmitting
              ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={20} color="inherit" />
                  Loading ...
                </Box>
              ) : currentStep === steps.length - 1 ? ('Finish') : ('Next')}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}