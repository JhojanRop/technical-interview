from functools import wraps
from flask import request, jsonify
import jwt
from datetime import datetime, timezone, timedelta
from decouple import config
from models.UserModel import UserModel

SECRET_KEY = config('SECRET_KEY')


def generate_token(user):
    try:
        token = jwt.encode({
            'user_name': user.name,
            'user_id': user.id,
            'role': user.role,
            'exp': datetime.now(timezone.utc) + timedelta(hours=24)
        }, SECRET_KEY)
        return token
    except Exception as ex:
        raise Exception(ex)


def token_required(roles=['admin', 'client']):
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = request.headers.get('Authorization')

            if not token:
                return jsonify({'message': 'Missing token'}), 401

            try:
                token = token.split(" ")[1]
                data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])

                if roles and data['role'] not in roles:
                    return jsonify({
                        'message': 'You do not have sufficient permissions to access this resource'
                    }), 403

                current_user = UserModel.get_user_by_id(data['user_id'])
                if not current_user:
                    return jsonify({'message': 'User not found, please login again'}), 401

                request.current_user = current_user

            except jwt.ExpiredSignatureError:
                return jsonify({'message': 'Token expired'}), 401
            except jwt.InvalidTokenError:
                return jsonify({'message': 'Invalid token'}), 401
            except Exception as e:
                return jsonify({'message': str(e)}), 500

            return f(*args, **kwargs)
        return decorated
    return decorator
