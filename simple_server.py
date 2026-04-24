# ======================================================
# SIMPLE FLASK SERVER FOR TESTING
# ======================================================

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for all routes
CORS(app, origins=["*"])

@app.route('/')
def home():
    return jsonify({
        "message": "Simple Test Server",
        "status": "running"
    })

@app.route('/jobs')
def get_jobs():
    return jsonify([
        [1, "AI Engineer", "TechCorp", 0, "new"],
        [2, "ML Engineer", "StartupX", 0, "new"]
    ])

@app.route('/jobs', methods=['POST'])
def add_job():
    return jsonify({"ok": True})

if __name__ == '__main__':
    print("Starting simple test server on port 8001...")
    app.run(host='0.0.0.0', port=8001, debug=True)
