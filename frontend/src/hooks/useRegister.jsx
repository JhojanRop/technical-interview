import { useState } from 'react';
import { validateStep } from '../utils/validations';
import { registerUser } from '@/services/auth';
import { useRouter } from 'next/navigation';

export const useRegisterForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState({
    fullName: '',
    email: '',
    password: '',
    monthlyIncome: '',
    occupation: '',
    sourceOfIncome: '',
  });
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const handleValidateStep = (step) => {
    const newErrors = validateStep(step, values);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));

    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleNext = () => {
    if (handleValidateStep(currentStep)) setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!handleValidateStep(currentStep)) return;

    const data = {
      name: values.fullName,
      email: values.email,
      password: values.password,
      monthlyIncome: values.monthlyIncome,
      occupation: values.occupation,
      sourceOfIncome: values.sourceOfIncome,
      role: 'client'
    }

    try {
      setIsSubmitting(true);
      await registerUser(data);
      router.push('/login');
    } catch (error) {
      setErrors({ submit: `There was an error submitting the form. Please try again.` });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    currentStep,
    values,
    errors,
    isSubmitting,
    handleChange,
    handleNext,
    handleBack,
    handleSubmit,
  };
};