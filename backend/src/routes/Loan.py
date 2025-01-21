from flask import Blueprint, jsonify, request

from models.entities.Loan import Loan
from models.LoanModel import LoanModel
from utils.auth import token_required


loans = Blueprint('loan_blueprint', __name__)


@loans.route('/<id>')
@token_required()
def get_cards_by_client(id):
    try:
        current_user = request.current_user
        if (int(id) != current_user['id']):
            return jsonify({'message': 'You do not have permission to access this resource'}), 403

        loans = LoanModel.get_loans_by_client(id)
        return jsonify(loans)
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@loans.route('/loan/<id>')
@token_required()
def get_loan_info(id):
    try:
        current_user = request.current_user
        current_user_loans_id = LoanModel.get_loan_ids_by_user(
            user_id=current_user['id'])

        if int(id) not in current_user_loans_id:
            return jsonify({'message': f'The loan with ID {id} is not registered in our system', 'code': 404}), 404

        loan = LoanModel.get_loan(id)
        return jsonify(loan)
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@loans.route('/loan/add', methods=['POST'])
@token_required()
def add_loan():
    try:
        if not request.json or not all(key in request.json for key in ['purpose', 'amount', 'interestRate', 'term', 'owner']):
            return jsonify({'message': 'Missing data'}), 400

        purpose = request.json['purpose']
        amount = request.json['amount']
        interest_rate = request.json['interestRate']
        term = request.json['term']
        owner = request.json['owner']

        loan = Loan(purpose=purpose, amount=amount, interest_rate=interest_rate,
                    term=term, owner=owner)
        affected_rows = LoanModel.create_loan(loan)

        if affected_rows == 1:
            return jsonify(loan.to_JSON())
        else:
            return jsonify({'message': "Error on insert"}), 500

    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@loans.route('/loan/update/<id>', methods=['PUT'])
@token_required()
def update_loan(id):
    try:
        if not request.json or not all(key in request.json for key in ['purpose', 'amount', 'interestRate', 'term', 'status']):
            return jsonify({'message': 'Missing data'}), 400

        current_user = request.current_user
        current_user_loan_ids = LoanModel.get_loan_ids_by_user(
            user_id=current_user['id'])

        if int(id) not in current_user_loan_ids:
            return jsonify({'message': f'The loan with ID {id} is not registered in our system'}), 404

        purpose = request.json['purpose']
        amount = request.json['amount']
        interest_rate = request.json['interestRate']
        term = request.json['term']
        status = request.json['status']

        loan = Loan(id=id, purpose=purpose, amount=amount, interest_rate=interest_rate,
                    term=term, status=status)

        affected_rows = LoanModel.update_loan(loan)

        if affected_rows == 1:
            return jsonify(loan.to_JSON())
        else:
            return jsonify({'message': "Error on update"}), 404

    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@loans.route('/loan/delete/<id>', methods=['DELETE'])
@token_required()
def delete_loan(id):
    try:
        current_user = request.current_user
        current_user_loan_ids = LoanModel.get_loan_ids_by_user(
            user_id=current_user['id'])

        if int(id) not in current_user_loan_ids:
            return jsonify({'message': f'The loan with ID {id} is not registered in our system'}), 404

        affected_rows = LoanModel.delete_loan(id)

        if affected_rows == 1:
            return jsonify({'message': "Card deleted"})
        else:
            return jsonify({'message': "Error on delete"}), 404

    except Exception as ex:
        return jsonify({'message': str(ex)}), 500
