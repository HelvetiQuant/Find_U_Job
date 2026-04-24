# ======================================================
# SIMPLE FLASK SERVER WITH COMPLETE APPLICATION PROCESSING
# ======================================================

from flask import Flask, jsonify, request
from flask_cors import CORS
import PyPDF2
import io
import re

app = Flask(__name__)

# Enable CORS for all routes
CORS(app, origins=["*"])

@app.route('/')
def home():
    return jsonify({
        "message": "AI Job Buddy - Complete Application Server",
        "status": "running",
        "features": [
            "jobs", 
            "pdf_cv_extraction", 
            "applicant_data_processing",
            "ai_matching",
            "complete_application_forms"
        ]
    })

@app.route('/jobs')
def get_jobs():
    return jsonify([
        [1, "AI Engineer", "TechCorp", 0, "new"],
        [2, "ML Engineer", "StartupX", 0, "new"],
        [3, "Senior AI Engineer", "Vonage", 0, "new"],
        [4, "Machine Learning Engineer", "Deel", 0, "new"],
        [5, "AI Research Scientist", "Binance", 0, "new"],
        [6, "Python Developer", "Clickhouse", 0, "new"],
        [7, "Data Scientist", "TechnologyAdvice", 0, "new"],
        [8, "AI Product Manager", "Study.com", 0, "new"],
        [9, "Computer Vision Engineer", "Montu", 0, "new"],
        [10, "NLP Engineer", "Mindrift", 0, "new"]
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
    """Process complete job application with applicant data"""
    try:
        data = request.get_json()
        
        # Extract applicant data
        applicant_data = data.get('applicant_data', {})
        cv_text = data.get('cv', '')
        job_id = data.get('job_id')
        
        # Build comprehensive profile for AI matching
        full_profile = f"""
APPLICANT PROFILE:
Name: {applicant_data.get('firstName', '')} {applicant_data.get('lastName', '')}
Email: {applicant_data.get('email', '')}
Phone: {applicant_data.get('phone', '')}
Location: {applicant_data.get('location', '')}
Birth Date: {applicant_data.get('birthDate', '')}

SKILLS:
{applicant_data.get('skills', '')}

COVER LETTER:
{applicant_data.get('coverLetter', '')}

CV CONTENT:
{cv_text}
        """.strip()
        
        # Enhanced AI scoring based on multiple factors
        score = calculate_ai_score(full_profile, job_id)
        
        # Apply if score is good enough
        applied = score > 25  # Lower threshold for complete applications
        
        return jsonify({
            "applied": applied,
            "score": score,
            "job_id": job_id,
            "applicant": f"{applicant_data.get('firstName', '')} {applicant_data.get('lastName', '')}",
            "message": f"AI Score: {score}/100 - {'Applied' if applied else 'Score too low'}",
            "profile_completeness": calculate_profile_completeness(applicant_data)
        })
        
    except Exception as e:
        return jsonify({"error": f"Error processing application: {str(e)}"}), 500

def calculate_ai_score(profile_text, job_id):
    """Calculate AI matching score based on comprehensive profile"""
    
    # Define job-specific keywords
    job_keywords = {
        "ai": ["python", "machine learning", "ai", "artificial intelligence", "deep learning", "tensorflow", "pytorch", "neural networks"],
        "ml": ["python", "machine learning", "data science", "statistics", "algorithms", "tensorflow", "pytorch", "scikit-learn"],
        "python": ["python", "django", "flask", "fastapi", "pandas", "numpy", "javascript", "sql"],
        "data": ["python", "data analysis", "statistics", "sql", "pandas", "numpy", "machine learning", "visualization"],
        "research": ["python", "research", "algorithms", "mathematics", "statistics", "machine learning", "deep learning"],
        "product": ["product management", "agile", "scrum", "leadership", "communication", "strategy", "analytics"],
        "vision": ["python", "computer vision", "opencv", "image processing", "deep learning", "tensorflow", "pytorch"],
        "nlp": ["python", "nlp", "natural language processing", "transformers", "bert", "gpt", "text processing"]
    }
    
    # Determine job type based on job_id (simplified)
    job_types = ["ai", "ml", "python", "data", "research", "product", "vision", "nlp", "ai", "ml"]
    job_type = job_types[min(job_id - 1, len(job_types) - 1)] if job_id <= len(job_types) else "ai"
    
    # Get relevant keywords
    relevant_keywords = job_keywords.get(job_type, job_keywords["ai"])
    
    # Calculate base score from keyword matching
    profile_lower = profile_text.lower()
    keyword_score = sum(1 for keyword in relevant_keywords if keyword in profile_lower)
    keyword_score = min(keyword_score * 8, 60)  # Max 60 points from keywords
    
    # Bonus points for profile completeness
    completeness_bonus = 0
    if "cover letter" in profile_lower and len(profile_lower) > 500:
        completeness_bonus += 10
    if "skills" in profile_lower:
        completeness_bonus += 10
    if "email" in profile_lower and "@" in profile_lower:
        completeness_bonus += 5
    if "phone" in profile_lower:
        completeness_bonus += 5
    if "location" in profile_lower:
        completeness_bonus += 5
    
    # Experience bonus (simplified detection)
    experience_years = re.findall(r'(\d+)\s*(?:years?|anni)', profile_lower)
    if experience_years:
        years = sum(int(year) for year in experience_years[:3])  # Take first 3 mentions
        experience_bonus = min(years * 2, 15)
    else:
        experience_bonus = 0
    
    total_score = min(keyword_score + completeness_bonus + experience_bonus, 100)
    
    return int(total_score)

def calculate_profile_completeness(applicant_data):
    """Calculate how complete the applicant profile is"""
    required_fields = ['firstName', 'lastName', 'email', 'phone', 'location']
    optional_fields = ['birthDate', 'skills', 'coverLetter']
    
    completed_required = sum(1 for field in required_fields if applicant_data.get(field, '').strip())
    completed_optional = sum(1 for field in optional_fields if applicant_data.get(field, '').strip())
    
    required_percentage = (completed_required / len(required_fields)) * 70
    optional_percentage = (completed_optional / len(optional_fields)) * 30
    
    return int(required_percentage + optional_percentage)

if __name__ == '__main__':
    print("Starting AI Job Buddy Complete Application Server...")
    print("Features:")
    print("- PDF CV text extraction")
    print("- Complete applicant data processing")
    print("- Enhanced AI job matching")
    print("- Profile completeness analysis")
    print("- Application management")
    print("\nAccess: http://localhost:8001")
    app.run(host='0.0.0.0', port=8001, debug=True)
