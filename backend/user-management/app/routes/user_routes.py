from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from app.models import User
from app import db

user_blueprint = Blueprint('user', __name__)


@user_blueprint.route('/register', methods=['POST'])
def register_user():
    try:
        username = request.json.get('username')
        password = request.json.get('password')

        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            return jsonify({'status': 'error', 'message': 'User already exists'}), 400

        new_user = User(username=username, password=generate_password_hash(password, method='pbkdf2:sha1', salt_length=8))

        db.session.add(new_user)
        db.session.commit()

        return jsonify({'status': 'success', 'message': 'User registered successfully'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500
    

@user_blueprint.route('/verify', methods=['POST'])
def verify_user():
    try:
        # Parse the request payload
        username = request.json.get('username')
        password = request.json.get('password')

        # Validate the input
        if not username or not password:
            return jsonify({'status': 'error', 'message': 'Username and password are required'}), 400

        # Query the database for the user
        user = User.query.filter_by(username=username).first()

        # Check if the user exists and the password matches
        if user and check_password_hash(user.password, password):
            return jsonify({
                'status': 'success',
                'message': 'Credentials are valid',
                'user_id': user.id,
                'username': user.username
            }), 200
        else:
            return jsonify({'status': 'error', 'message': 'Invalid credentials'}), 401

    except Exception as e:
        # Log the error for debugging (optional)
        print(f"Error verifying user: {e}")
        return jsonify({'status': 'error', 'message': 'Internal server error'}), 500
    
@user_blueprint.route('/profile/user-id=<int:user_id>', methods=['POST'])
def update_username(user_id):
    """
    Endpoint to update a user's username.

    Expects a JSON payload with the key "new_username".
    """
    try:
        # Parse the incoming JSON payload
        data = request.get_json()
        new_username = data.get('new_username')

        # Validate the new username
        if not new_username or len(new_username.strip()) == 0:
            return jsonify({'status': 'error', 'message': 'New username is required'}), 400
        if len(new_username) < 3:
            return jsonify({'status': 'error', 'message': 'Username is too short'}), 400

        # Check if the username already exists
        existing_user = User.query.filter_by(username=new_username).first()
        if existing_user:
            return jsonify({'status': 'error', 'message': 'Username already exists'}), 400

        # Fetch the user by ID
        user = User.query.get(user_id)
        if not user:
            return jsonify({'status': 'error', 'message': 'User not found'}), 404

        # Update the username
        user.username = new_username
        db.session.commit()

        return jsonify({'status': 'success', 'message': 'Username updated successfully'}), 200

    except Exception as e:
        # Log the error and return a 500 response
        print(f"Error updating username: {e}")
        return jsonify({'status': 'error', 'message': 'An unexpected error occurred'}), 500
