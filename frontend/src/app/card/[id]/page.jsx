'use client'
import { Card } from "@/components/Card";
import CardLayout from "@/components/layout/CardLayout";
import { useGetCardInfo } from "@/hooks/useGetCardInfo";
import { CircularProgress, Container } from "@mui/material";
import { useParams } from "next/navigation";

export default function CardDetails () {
  const { id } = useParams()
  const { card, error, loading } = useGetCardInfo({ cardId: id })

  return (
    <Container maxWidth="md">
      {
        error
          ? <p>{error.message}</p>
          : loading ? <CircularProgress /> : <CardLayout card={card} />
      }
    </Container>
  )
}