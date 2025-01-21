export const formatSecretCardNumber = (cardNumer) => `${"**** ".repeat(3)}${cardNumer.slice(-4)}`;
export const formatExpirationDate = (dateString) => `${new Date(dateString).getMonth() + 1}/${new Date(dateString).getFullYear().toString().slice(-2)}`;
export const formatInterestRate = (interestRate) => Math.floor(interestRate * 100)