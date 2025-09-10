from flask import Flask, request, jsonify
from flask_cors import CORS
import random

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

    # Simulate getting a real-time fare from an external service like Uber
    mock_uber_fare = random.uniform(15.0, 50.0)
    
    # Apply a 5% discount
    discount_percentage = 0.05
    discount_amount = mock_uber_fare * discount_percentage
    final_fare = mock_uber_fare - discount_amount

    print(f"Ride requested from {pickup} to {destination}.")
    print(f"Mock Uber Fare: ${mock_uber_fare:.2f}, Final Fare after 5% discount: ${final_fare:.2f}")
    
    return jsonify({
        "message": "Ride request received successfully!",
        "pickup": pickup,
        "destination": destination,
        "uber_fare": f"{mock_uber_fare:.2f}",
        "discount": f"{discount_amount:.2f}",
        "final_fare": f"{final_fare:.2f}"
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)