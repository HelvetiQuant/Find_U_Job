# ======================================================
# SIMPLE FLASK SERVER WITH PDF PROCESSING
# ======================================================

from flask import Flask, jsonify, request
from flask_cors import CORS
import PyPDF2
import io

app = Flask(__name__)

# Enable CORS for all routes
CORS(app, origins=["*"])

@app.route('/')
def home():
    return jsonify({
        "message": "Simple Test Server with PDF Processing",
        "status": "running",
        "features": ["jobs", "pdf_cv_extraction", "ai_matching"]
    })

@app.route('/jobs')
def get_jobs():
    return jsonify([
        [1, "AI Engineer", "TechCorp", 0, "new"],
        [2, "ML Engineer", "StartupX", 0, "new"],
        [3, "Senior AI Engineer", "Vonage", 0, "new"],
        [4, "Machine Learning Engineer", "Deel", 0, "new"],
        [5, "AI Research Scientist", "Binance", 0, "new"]
    ])

@app.route('/jobs', methods=['POST'])
def add_job():
    job_data = request.get_json()
    return jsonify({"ok": True, "job_id": 999})

@app.route('/extract-cv', methods=['POST'])
def extract_cv():
    """Extract text from uploaded PDF CV"""
    try:
        if 'pdf' not in request.files:
            return jsonify({"error": "No PDF file uploaded"}), 400
        
        pdf_file = request.files['pdf']
        
        if pdf_file.filename == '':
            return jsonify({"error": "No file selected"}), 400
        
        if not pdf_file.filename.endswith('.pdf'):
            return jsonify({"error": "File must be a PDF"}), 400
        
        # Read PDF content
        pdf_bytes = pdf_file.read()
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(pdf_bytes))
        
        # Extract text from all pages
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text() + "\n"
        
        # Clean up the text
        text = text.strip()
        
        if not text:
            return jsonify({"error": "No text could be extracted from PDF"}), 400
        
        return jsonify({
            "success": True,
            "text": text,
            "pages": len(pdf_reader.pages),
            "filename": pdf_file.filename
        })
        
    except Exception as e:
        return jsonify({"error": f"Error processing PDF: {str(e)}"}), 500

@app.route('/apply', methods=['POST'])
def apply_job():
    """Process job application with AI matching"""
    data = request.get_json()
    
    # Simple mock AI scoring
    cv_text = data.get('cv', '').lower()
    job_id = data.get('job_id')
    
    # Mock scoring based on keywords
    ai_keywords = ['python', 'machine learning', 'ai', 'deep learning', 'tensorflow', 'pytorch']
    score = sum(1 for keyword in ai_keywords if keyword in cv_text)
    score = min(score * 15, 100)  # Scale to 0-100
    
    applied = score > 30  # Apply if score > 30
    
    return jsonify({
        "applied": applied,
        "score": score,
        "job_id": job_id,
        "message": f"AI Score: {score}/100 - {'Applied' if applied else 'Score too low'}"
    })

if __name__ == '__main__':
    print("Starting Flask server with PDF processing on port 8001...")
    print("Features:")
    print("- PDF CV text extraction")
    print("- AI job matching")
    print("- Job management")
    print("\nAccess: http://localhost:8001")
    app.run(host='0.0.0.0', port=8001, debug=True)
