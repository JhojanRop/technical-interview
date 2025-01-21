'use client'
import { createLoan, updateLoan } from "@/services/loans"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function useLoanForms ({ loan }) {
  const token = Cookies.get('token')
  const user = JSON.parse(localStorage.getItem('user'))
  const router = useRouter()

  const [data, setData] = useState({
    purpose: loan.purpose || "",
    amount: loan.amount || "",
    interestRate: loan.interest_rate * 100 || "",
    term: loan.term || "",
    status: loan.status || "",
    owner: loan.owner || ""
  })

  const [errors, setErrors] = useState({
    purpose: "",
    amount: "",
    interestRate: "",
    term: "",
    status: "",
    owner: "",
    request: ""
  })

  const handleChange = (e) => {
    const { name, value, type } = e.target
    setErrors(prev => ({ ...prev, [name]: "" }))
    setErrors(prev => ({ ...prev, request: "" }))
    setData(prev => ({
      ...prev, [name]: value
    }))

    if (type === 'number' && value < !0) setErrors(prev => ({ ...prev, [name]: "The entered value must be greater than 0" }))
    if (name === 'term' && value % 1 !== 0) setErrors(prev => ({ ...prev, term: "The month must be a integer" }))
  }

  const handleSubmit = async (e, type, loanId) => {
    e.preventDefault()

    if (Object.values(errors).some(value => value !== "")) {
      setErrors(prev => ({ ...prev, request: "One or more field have errors" }))
      return
    }

    try {
      if (type === "create") {
        const dataSubmit = {
          purpose: data.purpose,
          amount: data.amount,
          interestRate: (data.interestRate / 100),
          term: data.term,
          owner: user.id
        }

        await createLoan({ loanData: dataSubmit, token })
      }

      if (type === "update") {
        const dataSubmit = {
          purpose: data.purpose,
          amount: data.amount,
          interestRate: data.interestRate / 100,
          term: data.term,
          status: data.status
        }

        await updateLoan({ loanData: dataSubmit, loanId, token })
      }
    } catch (err) {
      setErrors(prev => ({ ...prev, request: "An error occurred, please try again later" }))
    } finally {
      router.push("/")
    }
  }

  return { data, errors, handleChange, handleSubmit }
}