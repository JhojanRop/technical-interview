'use client'
import { createCard, updateCard } from "@/services/cards"
import dayjs from "dayjs"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function useCardForms ({ card = null }) {
  const token = Cookies.get('token')
  const user = JSON.parse(localStorage.getItem('user'))
  const router = useRouter()


  const [data, setData] = useState({
    type: card.type || "",
    number: card.number || "",
    expiration_date: dayjs(card.expiration_date) || "",
    ccv: card.ccv || "",
    balance: card.balance || "",
    creditLimit: card.creditLimit || "",
    status: card.status || "",
    owner: card.owner || "",
  })

  const [errors, setErrors] = useState({
    type: "",
    number: "",
    expiration_date: "",
    ccv: "",
    balance: "",
    creditLimit: "",
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

    if (type === 'number' && value < 0) setErrors(prev => ({ ...prev, [name]: "The entered value must be greater or equal than 0" }))
  }

  const handleDate = (newValue) => {
    setData(prev => ({ ...prev, expiration_date: newValue }))
  }

  const handleSubmit = async (e, type, cardId) => {
    e.preventDefault()
    if (Object.values(errors).some(value => value !== "")) {
      setErrors(prev => ({ ...prev, request: "One or more field have errors" }))
      return
    }

    try {
      if (type === "create") {
        const dataSubmit = {
          type: data.type,
          balance: data.type === 'credit' ? data.creditLimit : data.balance,
          creditLimit: data.creditLimit ? data.creditLimit : 0,
          owner: user.id
        }

        await createCard({ cardData: dataSubmit, token })
        router.push("/")
      }

      if (type === "update") {
        const dataSubmit = {
          type: data.type,
          expirationDate: data.expiration_date.format("YYYY-MM-DD"),
          balance: data.balance,
          creditLimit: data.creditLimit || 0
        }

        await updateCard({ cardData: dataSubmit, cardId, token })
        router.push("/")
      }

    } catch (err) {
      setErrors(prev => ({ ...prev, request: "An error occurred, please try again later" }))
    }

  }

  return { data, errors, handleChange, handleDate, handleSubmit }
}