'use client'
import { getLoan } from "@/services/loans"
import Cookies from "js-cookie"
import { useEffect, useMemo, useState } from "react"

export function useGetLoanInfo ({ loanId }) {
  const [loan, setLoan] = useState()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const token = useMemo(() => Cookies.get("token"), [])

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const res = await getLoan({ loanId, token })
        setLoan(res)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    getData()
  }, [loanId, token])

  return { loan, error, loading }
}