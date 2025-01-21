from flask import Blueprint, jsonify, request, make_response

from models.entities.Card import Card
from models.CardModel import CardModel
from utils.cardsGenerator import generate_card
from utils.auth import token_required

cards = Blueprint('card_blueprint', __name__)


@cards.route('/')
@token_required(roles=['admin'])
def get_cards():
    try:
        cards = CardModel.get_cards()
        return jsonify(cards)
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@cards.route('/<id>')
@token_required()
def get_cards_by_client(id):
    try:
        current_user = request.current_user
        if (int(id) != current_user['id']):
            return jsonify({'message': 'You do not have permission to access this resource'}), 403

        cards = CardModel.get_cards_by_client(id)
        return jsonify(cards)
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@cards.route('/card/<id>')
@token_required()
def get_card_info(id):
    try:
        current_user = request.current_user
        current_user_cards_id = CardModel.get_card_ids_by_user(
            user_id=current_user['id'])

        if int(id) not in current_user_cards_id:
            return jsonify({'message': f'The card with ID {id} is not registered in our system', 'code': 404}), 404

        card = CardModel.get_card(id)
        return jsonify(card)
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@cards.route('/card/add', methods=['POST'])
@token_required()
def add_card():
    try:
        if not request.json or not all(key in request.json for key in ['type', 'balance', 'creditLimit', 'owner']):
            return jsonify({'message': 'Missing data'}), 400

        card_data = generate_card()
        type = request.json['type']
        balance = request.json['balance']
        credit_limit = request.json['creditLimit']
        owner = request.json['owner']

        card = Card(type=type, number=card_data['number'],
                    expiration_date=card_data['expiration-date'], ccv=card_data['ccv'], balance=balance, credit_limit=credit_limit, owner=owner)

        affected_rows = CardModel.create_card(card)

        if affected_rows == 1:
            return jsonify(card.to_JSON())
        else:
            return jsonify({'message': "Error on insert"}), 500

    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@cards.route('/card/update/<id>', methods=['PUT'])
@token_required()
def update_card(id):
    try:
        if not request.json or not all(key in request.json for key in ['type', 'expirationDate', 'balance', 'creditLimit']):
            return jsonify({'message': 'Missing data'}), 400

        current_user = request.current_user
        current_user_cards_id = CardModel.get_card_ids_by_user(
            user_id=current_user['id'])
        if int(id) not in current_user_cards_id:
            return jsonify({'message': f'The card with ID {id} is not registered in our system'}), 404

        type = request.json['type']
        expiration_date = request.json['expirationDate']
        balance = request.json['balance']
        credit_limit = request.json['creditLimit']

        card = Card(id=id, type=type, expiration_date=expiration_date,
                    balance=balance, credit_limit=credit_limit)

        affected_rows = CardModel.update_card(card)

        if affected_rows == 1:
            return jsonify(card.to_JSON())
        else:
            return jsonify({'message': "Error on update"}), 404

    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@cards.route('/card/delete/<id>', methods=['DELETE'])
@token_required()
def delete_card(id):
    try:
        current_user = request.current_user
        current_user_cards_id = CardModel.get_card_ids_by_user(
            user_id=current_user['id'])
        if int(id) not in current_user_cards_id:
            return jsonify({'message': f'The card with ID {id} is not registered in our system'}), 404

        affected_rows = CardModel.delete_card(id)

        if affected_rows == 1:
            return jsonify({'message': "Card deleted"})
        else:
            return jsonify({'message': "Error on delete"}), 404

    except Exception as ex:
        return jsonify({'message': str(ex)}), 500
