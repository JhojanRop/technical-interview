'use client'
import Cookies from "js-cookie"
import { getCards } from "@/services/cards"
import { getLoans } from "@/services/loans"
import { useEffect, useMemo, useState } from "react"

export function useGetInitialInfo () {
  const [cards, setCards] = useState([])
  const [loans, setLoans] = useState([])
  const [errors, setErrors] = useState('')

  const token = useMemo(() => Cookies.get("token"), [])
  const user = useMemo(() => JSON.parse(localStorage.getItem("user")), [])

  useEffect(() => {
    const getInfo = async () => {
      try {
        const dataCards = await getCards({ userId: user.id, token })
        const dataLoans = await getLoans({ userId: user.id, token })
        setCards(dataCards)
        setLoans(dataLoans)
      } catch (err) {
        setErrors(err.message || 'An error occurred')
      }
    }

    if (user && token) getInfo()

  }, [token, user])

  return { cards, loans, errors, user }
}
