class Card():

    def __init__(self, id=None, type=None, number=None, expiration_date=None, ccv=None, balance=None, credit_limit=None, status=None, owner=None):
        self.id = id
        self.type = type
        self.number = number
        self.expiration_date = expiration_date
        self.ccv = ccv
        self.balance = balance
        self.credit_limit = credit_limit
        self.status = status
        self.owner = owner

    def to_JSON(self):
        return {
            'id': self.id,
            'type': self.type,
            'number': self.number,
            'expiration_date': self.expiration_date,
            'ccv': self.ccv,
            'balance': self.balance,
            'credit_limit': self.credit_limit,
            'status': self.status,
            'owner': self.owner
        }
