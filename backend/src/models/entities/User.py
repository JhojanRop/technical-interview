class User():
    def __init__(self, id=None, name=None, email=None, password=None, role=None, monthly_income=None, occupation=None, source_of_income=None):
        self.id = id
        self.name = name
        self.email = email
        self.password = password
        self.role = role
        self.monthly_income = monthly_income
        self.occupation = occupation
        self.source_of_income = source_of_income

    def to_JSON(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'password': self.password,
            'role': self.role,
            'monthlyIncome': self.monthly_income,
            'occupation': self.occupation,
            'sourceOfIncome': self.source_of_income
        }
