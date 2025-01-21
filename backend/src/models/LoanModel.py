from database.db import get_connection
from .entities.Loan import Loan


class LoanModel():
    @classmethod
    def get_loans_by_client(cls, id_client):
        try:
            connection = get_connection()
            loans = []

            with connection.cursor() as cursor:
                cursor.execute(
                    f"SELECT loan.*, users.name FROM loan JOIN users ON loan.owner = users.id_user WHERE owner={id_client}")
                resultset = cursor.fetchall()

                for row in resultset:
                    loan = Loan(row[0], row[1], row[2], row[3],
                                row[4], row[5], row[7])
                    loans.append(loan.to_JSON())

            connection.close()
            return loans
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def get_loan_ids_by_user(cls, loan_id):
        try:
            connection = get_connection()
            loan_ids = []

            with connection.cursor() as cursor:
                cursor.execute(
                    f"SELECT id_loan FROM loan WHERE owner={loan_id}")
                resultset = cursor.fetchall()

                for row in resultset:
                    loan_ids.append(row[0])

            connection.close()
            return loan_ids
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def get_loan(cls, id_loan):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute(
                    f"SELECT loan.*, users.name FROM loan JOIN users ON loan.owner = users.id_user WHERE id_loan={id_loan}")
                row = cursor.fetchone()

                loan = Loan(row[0], row[1], row[2], row[3],
                            row[4], row[5], row[7])

            connection.close()
            return loan.to_JSON()
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def create_loan(cls, loan):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute(f"""INSERT INTO loan (purpose, amount, interest_rate, term, owner) VALUES ('{
                               loan.purpose}', {loan.amount}, {loan.interest_rate}, {loan.term}, {loan.owner})""")
                affected_rows = cursor.rowcount
                connection.commit()

            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def update_loan(cls, loan):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute(f"""UPDATE loan SET purpose='{loan.purpose}', amount={loan.amount}, interest_rate={
                               loan.interest_rate}, term={loan.term}, status='{loan.status}' WHERE id_loan={loan.id_loan}""")
                affected_rows = cursor.rowcount
                connection.commit()

            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def delete_loan(cls, id_loan):
        try:
            connection = get_connection()

            with connection.cursor() as cursor:
                cursor.execute(f"DELETE FROM loan WHERE id_loan={id_loan}")
                affected_rows = cursor.rowcount
                connection.commit()

            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)
