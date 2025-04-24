from flask import Flask, request, jsonify, Blueprint
import pandas as pd
import json
from ..models import db, Rocket


parser_blueprint = Blueprint('data', __name__)

@parser_blueprint.route('/process', methods=['POST'])
def parse_csv():
    
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400    
    
    file = request.files['file']

    try:

        df = pd.read_csv(file)

        data = df.to_dict(orient='records')
        rocket = Rocket(name='rocket', description='sometihing')
        db.session.add(rocket)
        db.session.commit()

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}, 500)
    
    return jsonify({"data": data}), 200

@parser_blueprint.route('/protected', methods=['GET'])
def protected_route():
    # get the user info from the custom headder
    user_info = request.headers.get('X-User-Info')
    print('Received headers:', request.headers)
    if not user_info:
        return jsonify({'status': 'error', 'message': 'User info is missing'}), 401
    

    user = json.loads(user_info)
    return jsonify({'status': 'success', 'message': f'Hello, {user["username"]}!'}), 200
