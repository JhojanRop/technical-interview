from app import app
from config import config
from routes import Card, User, Loan

if __name__ == '__main__':
    app.config.from_object(config['development'])
    app.register_blueprint(Card.cards, url_prefix='/api/cards')
    app.register_blueprint(User.users, url_prefix='/api/users')
    app.register_blueprint(Loan.loans, url_prefix='/api/loans')
    app.run()
