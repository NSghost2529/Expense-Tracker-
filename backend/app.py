from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from pymongo import MongoClient
import datetime
import config

# Flask app
app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = config.JWT_SECRET_KEY
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# MongoDB connection
client = MongoClient(config.MONGO_URI)
db = client["expense_tracker"]
users_col = db["users"]
expenses_col = db["expenses"]
savings_col = db["savings"]

# ---------- USER SIGNUP ----------
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    if users_col.find_one({"email": data['email']}):
        return jsonify({"message": "User already exists"}), 400

    hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    users_col.insert_one({
        "name": data['name'],
        "email": data['email'],
        "password": hashed_pw,
        "created_at": datetime.datetime.utcnow()
    })
    return jsonify({"message": "User created successfully"}), 201

# ---------- USER LOGIN ----------
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = users_col.find_one({"email": data['email']})
    if user and bcrypt.check_password_hash(user['password'], data['password']):
        token = create_access_token(identity=str(user['_id']))
        return jsonify(access_token=token)
    return jsonify({"message": "Invalid credentials"}), 401

# ---------- ADD EXPENSE ----------
@app.route('/add_expense', methods=['POST'])
@jwt_required()
def add_expense():
    current_user = get_jwt_identity()
    data = request.json
    expenses_col.insert_one({
        "user_id": current_user,
        "date": datetime.datetime.utcnow(),
        "category": data['category'],
        "amount_inr": data['amount_inr'],
        "payment_method": data['payment_method']
    })
    return jsonify({"message": "Expense added"}), 200

# ---------- ADD SAVINGS ----------
@app.route('/add_savings', methods=['POST'])
@jwt_required()
def add_savings():
    current_user = get_jwt_identity()
    data = request.json
    savings_col.insert_one({
        "user_id": current_user,
        "date": datetime.datetime.utcnow(),
        "amount_inr": data['amount_inr']
    })
    return jsonify({"message": "Savings added"}), 200

# ---------- GET USER EXPENSES ----------
@app.route('/expenses', methods=['GET'])
@jwt_required()
def get_expenses():
    current_user = get_jwt_identity()
    exp = list(expenses_col.find({"user_id": current_user}, {"_id": 0}))
    return jsonify(exp), 200

# ---------- GET AI SUGGESTIONS ----------
@app.route('/ai_suggestions', methods=['GET'])
@jwt_required()
def ai_suggestions():
    current_user = get_jwt_identity()
    expenses = list(expenses_col.find({"user_id": current_user}))
    total_food = sum(e['amount_inr'] for e in expenses if e['category'] == "Food & Dining")
    total_transport = sum(e['amount_inr'] for e in expenses if e['category'] == "Transport")
    suggestions = [
        {"tip": "Reduce dining out and focus on home cooking", "potential_savings_inr": total_food * 0.2},
        {"tip": "Switch to public transport or carpool", "potential_savings_inr": total_transport * 0.15}
    ]
    return jsonify(suggestions), 200

if __name__ == '__main__':
    app.run(debug=True)
