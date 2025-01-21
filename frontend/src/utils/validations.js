export const validateForm = {
  fullName: (value) => {
    if (!value) return 'Full name is required';
    if (value.length < 2) return 'Full name must be at least 2 characters';
    return '';
  },

  email: (value) => {
    if (!value) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(value)) return 'Invalid email';
    return '';
  },

  password: (value) => {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    return '';
  },

  monthlyIncome: (value) => {
    if (!value) return 'Monthly income is required';
    if (value <= 0) return 'Income must be greater than 0';
    return '';
  },

  occupation: (value) => {
    if (!value) return 'Occupation is required';
    return '';
  },

  sourceOfIncome: (value) => {
    if (!value) return 'Source of income id required';
    return '';
  }
};

export const validateStep = (step, values) => {
  const errors = {};

  if (step === 0) {
    const basicFields = ['fullName', 'email', 'password'];
    basicFields.forEach(field => {
      const error = validateForm[field](values[field]);
      if (error) errors[field] = error;
    });
  }

  if (step === 1) {
    const financialFields = ['monthlyIncome', 'occupation', 'sourceOfIncome'];
    financialFields.forEach(field => {
      const error = validateForm[field](values[field]);
      if (error) errors[field] = error;
    });
  }

  return errors;
};