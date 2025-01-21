import { request } from "./request";

export const getCards = async ({ userId, token }) => await request(`http://localhost:5000/api/cards/${userId}`, {
  method: "GET",
  headers: {
    'Authorization': `Bearer ${token}`
  }
})

export const getCard = async ({ cardId, token }) => await request(`http://localhost:5000/api/cards/card/${cardId}`, {
  method: "GET",
  headers: {
    'Authorization': `Bearer ${token}`
  }
})

export const createCard = async ({ cardData, token }) => await request(`http://localhost:5000/api/cards/card/add`, {
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(cardData)
})

export const updateCard = async ({ cardData, token, cardId }) => await request(`http://localhost:5000/api/cards/card/update/${cardId}`, {
  method: "PUT",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(cardData)
})

export const deleteCard = async ({ token, cardId }) => await request(`http://localhost:5000/api/cards/card/delete/${cardId}`, {
  method: "DELETE",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
})