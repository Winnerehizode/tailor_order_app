from flask import Flask, request, jsonify, send_from_directory
import json
from pathlib import Path

app = Flask(
    __name__,
    static_folder="../frontend",
    static_url_path=""
)

DATA_FILE = Path(__file__).parent / "orders.json"

if not DATA_FILE.exists():
    DATA_FILE.write_text("[]", encoding="utf-8")

def load_orders():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def save_orders(orders):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(orders, f, indent=2)

@app.route("/")
def serve_frontend():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/submit-order", methods=["POST"])
def submit_order():
    data = request.get_json()
    required = ["fullName", "phone", "style", "measurements", "dueDate"]
    for field in required:
        if not data.get(field):
            return jsonify({"error": f"Missing {field}"}), 400

    orders = load_orders()
    orders.append(data)
    save_orders(orders)
    return jsonify({"message": "Order received", "order": data}), 201

@app.route("/orders", methods=["GET"])
def get_orders():
    return jsonify(load_orders())

if __name__ == "__main__":
    print("Starting SmartFit API on http://localhost:5000")
    app.run(debug=True)
