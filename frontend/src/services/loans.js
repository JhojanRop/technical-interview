import { request } from "./request";

export const getLoans = async ({ userId, token }) => await request(`http://localhost:5000/api/loans/${userId}`, {
  method: "GET",
  headers: {
    'Authorization': `Bearer ${token}`
  }
})

export const getLoan = async ({ loanId, token }) => await request(`http://localhost:5000/api/loans/loan/${loanId}`, {
  method: "GET",
  headers: {
    'Authorization': `Bearer ${token}`
  }
})

export const createLoan = async ({ loanData, token }) => await request(`http://localhost:5000/api/loans/loan/add`, {
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(loanData)
})

export const updateLoan = async ({ loanData, token, loanId }) => await request(`http://localhost:5000/api/loans/loan/update/${loanId}`, {
  method: "PUT",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(loanData)
})

export const deleteLoan = async ({ token, loanId }) => await request(`http://localhost:5000/api/loans/loan/delete/${loanId}`, {
  method: "DELETE",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
})