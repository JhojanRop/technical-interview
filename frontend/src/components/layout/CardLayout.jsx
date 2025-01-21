'use client'

import { formatExpirationDate } from "@/utils/format"
import { Card } from "../Card"
import { Button, Dialog, DialogActions, DialogTitle, TextField } from "@mui/material"
// import { DeleteIcon } from "@mui/icons-material"
import { useMemo, useState } from "react"
import UpdateCardForm from "../forms/UpdateCardForm"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { deleteCard } from "@/services/cards"

function CardInfo ({ card }) {
  return (
    <>
      <TextField
        label="Type"
        fullWidth
        defaultValue={card.type}
        slotProps={{
          input: { readOnly: true }
        }}
      />

      <TextField
        label="Status"
        fullWidth
        defaultValue={card?.status}
        slotProps={{
          input: { readOnly: true }
        }}
      />

      <TextField
        label="Balace"
        fullWidth
        defaultValue={`$ ${card?.balance}`}
        slotProps={{
          input: { readOnly: true }
        }}
      />

      {
        card?.type === 'credit' &&
        <TextField
          label="Credit limit"
          fullWidth
          defaultValue={`$ ${card?.credit_limit}`}
          slotProps={{
            input: { readOnly: true }
          }}
        />
      }
    </>
  )
}

export default function CardLayout ({ card }) {
  const [isEditing, setIsEditing] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleOpenDialog = () => setDeleteDialogOpen(true)
  const handleCloseDialog = () => setDeleteDialogOpen(false)

  const token = useMemo(() => Cookies.get('token'), [])
  const router = useRouter()

  const handleDeleteCard = async () => {
    await deleteCard({ cardId: card.id, token })
    router.push("/")
  }


  return (
    <div>
      <Card {...card} expiration_date={formatExpirationDate(card.expiration_date)} size="large" canFlip className="mx-auto after:content-['Tap_to_see_the_card_reverse'] after:block after:text-center after:my-2" />

      <div className="mt-10 space-y-5">
        <h2 className="text-center text-xl font-medium">{isEditing ? "Update card" : "Card info"}</h2>
        {isEditing ? <UpdateCardForm card={card} /> : <CardInfo card={card} />}
        {!isEditing && <Button variant="contained" sx={{ display: 'block', mx: 'auto' }} onClick={() => setIsEditing(!isEditing)}>Edit</Button>}

        <Button variant="text" color="error" className="block mx-auto text-center capitalize" onClick={handleOpenDialog}>Don't need the card anymore? Cancel it!</Button>
        <Dialog open={deleteDialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Are you sure want cancel the card?</DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">Back</Button>
            <Button onClick={handleDeleteCard} color="error" >Cancel card</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}