class Loan():

    def __init__(self, id=None, purpose=None, amount=None, interest_rate=None, term=None, status='pending', owner=None):
        self.id_loan = id
        self.purpose = purpose
        self.amount = amount
        self.interest_rate = interest_rate
        self.term = term
        self.status = status
        self.owner = owner

    def to_JSON(self):
        return {
            'id_loan': self.id_loan,
            'purpose': self.purpose,
            'amount': self.amount,
            'interest_rate': self.interest_rate,
            'term': self.term,
            'status': self.status,
            'owner': self.owner
        }
