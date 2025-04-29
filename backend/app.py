from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

ORDERS_FILE = 'orders.json'

# Helper function to load orders
def load_orders():
    if os.path.exists(ORDERS_FILE):
        with open(ORDERS_FILE, 'r') as f:
            return json.load(f)
    else:
        return []

# Helper function to save orders
def save_orders(orders):
    with open(ORDERS_FILE, 'w') as f:
        json.dump(orders, f, indent=4)

@app.route('/orders', methods=['GET'])
def get_orders():
    orders = load_orders()
    return jsonify(orders)

@app.route('/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    orders = load_orders()

    new_order = {
        "name": data.get('name'),
        "phone": data.get('phone'),
        "bust": data.get('bust'),
        "waist": data.get('waist'),
        "hips": data.get('hips'),
        "length": data.get('length'),
        "sleeve": data.get('sleeve'),
        "design": data.get('design')
    }

    orders.append(new_order)
    save_orders(orders)

    return jsonify({'message': 'Order created successfully!'}), 201

if __name__ == '__main__':
    print("Starting SmartFit API on http://localhost:5000")
    app.run(debug=True)


