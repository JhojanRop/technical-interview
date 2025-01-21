from database.db import get_connection
from .entities.Card import Card


class CardModel():

    @classmethod
    def get_cards(cls):
        try:
            connection = get_connection()
            cards = []

            with connection.cursor() as cursor:
                cursor.execute(
                    "SELECT card.*, users.name FROM card JOIN users ON card.owner = users.id_user")
                resultset = cursor.fetchall()

                for row in resultset:
                    card = Card(row[0], row[1], row[2], row[3],
                                row[4], row[5], row[6], row[7], row[9])
                    cards.append(card.to_JSON())

            connection.close()
            return cards
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def get_cards_by_client(cls, id_client):
        try:
            connection = get_connection()
            cards = []

            with connection .cursor() as cursor:
                cursor.execute(
                    f"SELECT card.*, users.name FROM card JOIN users ON card.owner = users.id_user WHERE owner={id_client}")
                resultset = cursor.fetchall()

                for row in resultset:
                    card = Card(row[0], row[1], row[2], row[3],
                                row[4], row[5], row[6], row[7], row[9])
                    cards.append(card.to_JSON())

            connection.close()
            return cards
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def get_card_ids_by_user(cls, user_id):
        try:
            connection = get_connection()
            card_ids = []

            with connection.cursor() as cursor:
                cursor.execute(
                    f"SELECT id_card FROM card WHERE owner={user_id}")
                resultset = cursor.fetchall()

                for row in resultset:
                    card_ids.append(row[0])

            connection.close()
            return card_ids
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def get_card(cls, id_card):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute(
                    f"SELECT card.*, users.name FROM card JOIN users ON card.owner = users.id_user WHERE id_card={id_card}")
                row = cursor.fetchone()

                card = Card(row[0], row[1], row[2], row[3],
                            row[4], row[5], row[6], row[7], row[9])

            connection.close()
            return card.to_JSON()
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def create_card(cls, card):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute(f"""INSERT INTO card (type, card_number, expiration_date, ccv, balance, credit_limit, owner)
                                VALUES ('{card.type}', '{card.number}', '{card.expiration_date}', '{card.ccv}', {card.balance}, {card.credit_limit}, {card.owner})""")
                affected_rows = cursor.rowcount
                connection.commit()

            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def update_card(cls, card):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute(f"""UPDATE card SET type='{card.type}', expiration_date='{card.expiration_date}', balance='{
                               card.balance}', credit_limit='{card.credit_limit}', status='pending' WHERE id_card={card.id}""")
                affected_rows = cursor.rowcount
                connection.commit()

            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def delete_card(cls, id):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute(f"DELETE FROM card WHERE id_card={id}")
                affected_rows = cursor.rowcount
                connection.commit()

            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)
