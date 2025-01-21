from flask import Blueprint, jsonify, request

from models.entities.User import User
from models.UserModel import UserModel
from werkzeug.security import generate_password_hash, check_password_hash
from utils.auth import generate_token
from utils.auth import token_required


users = Blueprint('users_blueprint', __name__)


@users.route("/")
@token_required(["admin"])
def get_clients():
    try:
        if request.args.get('email') != None:
            client = UserModel.get_user_by_email(request.args.get('email'))
            return jsonify(client.to_JSON())
        else:
            clients = UserModel.get_clients()
            return jsonify(clients)
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@users.route("/register", methods=["POST"])
def register_user():
    try:
        name = request.json['name']
        email = request.json['email']
        password = request.json['password']
        password_hash = generate_password_hash(password)
        role = request.json['role']
        monthly_income = request.json['monthlyIncome']
        occupation = request.json['occupation']
        source_of_income = request.json['sourceOfIncome']

        user = User(name=name, email=email, password=password_hash, role=role,
                    monthly_income=monthly_income, occupation=occupation, source_of_income=source_of_income)
        id = UserModel.create_user(user)
        user.id = id

        return jsonify(user.to_JSON())
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500


@users.route("/login", methods=['POST'])
def login():
    try:
        email = request.json['email']
        password = request.json['password']

        if len(email) == 0 or len(password) == 0:
            return jsonify({'message': 'Email and password are required to log in'}), 400

        user = UserModel.get_user_by_email(email)

        if user and check_password_hash(user.password, password):
            token = generate_token(user)
            return jsonify({
                'message': 'Login successfully',
                'token': token,
                'user': {'id': user.id, 'name': user.name, 'role': user.role}
            })
        else:
            return jsonify({'message': 'Invalid credentials'}), 401
    except Exception as ex:
        return jsonify({'message': str(ex)}), 500
