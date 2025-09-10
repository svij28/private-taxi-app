from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # This will enable CORS for all routes

@app.route('/')
def home():
    return "Hello from the backend!"

@app.route('/api/ride', methods=['POST'])
def request_ride():
    data = request.get_json()
    pickup = data.get('pickup')
    destination = data.get('destination')

    if not pickup or not destination:
        return jsonify({"error": "Pickup and destination are required."}), 400

    # For now, we'll just print the data and return a success message.
    # In a real application, you would process the ride request here.
    print(f"Ride requested from {pickup} to {destination}")
    
    return jsonify({
        "message": "Ride request received successfully!",
        "pickup": pickup,
        "destination": destination
    })

if __name__ == '__main__':
    app.run(debug=True, port=5001)