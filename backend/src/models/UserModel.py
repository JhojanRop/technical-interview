from database.db import get_connection
from .entities.User import User


class UserModel():

    @classmethod
    def get_clients(cls):
        try:
            connection = get_connection()
            clients = []

            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM users WHERE user_role='client'")
                resultset = cursor.fetchall()

                for row in resultset:
                    client = User(row[0], row[1], row[2],
                                  row[3], row[4], row[5], row[6], row[7])
                    clients.append(client.to_JSON())

            connection.close()
            return clients
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def get_user_by_email(cls, email):
        try:
            connection = get_connection()
            user = None

            with connection.cursor() as cursor:
                cursor.execute(f"SELECT * FROM users WHERE email='{email}'")
                row = cursor.fetchone()
                if row:
                    user = User(row[0], row[1], row[2], row[3],
                                row[4], row[5], row[6], row[7])

            connection.close()
            return user
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def get_user_by_id(cls, id):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute(f"SELECT * FROM users WHERE id_user='{id}'")
                row = cursor.fetchone()

                user = User(row[0], row[1], row[2], row[3],
                            row[4], row[5], row[6], row[7])

            connection.close()
            return user.to_JSON()
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def create_user(cls, user):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute(f"""INSERT INTO users (name, email, password, user_role, monthlyIncome, occupation, sourceOfIncome)
                               VALUES ('{user.name}', '{user.email}', '{user.password}', '{user.role}', {user.monthly_income}, '{user.occupation}', '{user.source_of_income}') RETURNING id_user""")
                user_id = cursor.fetchone()[0]
                connection.commit()
                return user_id
        except Exception as ex:
            raise Exception(ex)
