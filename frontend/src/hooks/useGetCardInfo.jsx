'use client'
import { getCard } from "@/services/cards"
import Cookies from "js-cookie"
import { useEffect, useMemo, useState } from "react"

export function useGetCardInfo ({ cardId }) {
  const [card, setCard] = useState()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const token = useMemo(() => Cookies.get("token"), [])

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const res = await getCard({ cardId, token })
        setCard(res)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    getData()
  }, [cardId, token])

  return { card, error, loading }
}