import PyPDF2
import requests

def extract_text_from_pdf(pdf_path):
    """Estrae testo da un file PDF"""
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
    return text

def local_ai(prompt):
    """Funzione AI locale (dal codice originale)"""
    try:
        res = requests.post("http://localhost:11434/api/generate", json={
            "model": "mistral",
            "prompt": prompt,
            "stream": False
        })
        return res.json()["response"]
    except Exception as e:
        return f"Errore AI: {e}"

def parse_cv(cv_text):
    """Estrae competenze dal testo del CV usando AI"""
    return local_ai(f"Extract skills and experience from CV: {cv_text}")

def main():
    # Percorso del CV
    cv_path = r"C:\Users\natal\Downloads\cv_Riccardo_Gaetti.pdf"
    
    print("🔍 Estrazione testo dal PDF...")
    try:
        cv_text = extract_text_from_pdf(cv_path)
        print(f"✅ Testo estratto ({len(cv_text)} caratteri)")
        
        print("\n🤖 Analisi competenze con AI...")
        skills = parse_cv(cv_text)
        
        print("\n📋 COMPETENZE ESTRATTE:")
        print("=" * 50)
        print(skills)
        print("=" * 50)
        
    except Exception as e:
        print(f"❌ Errore: {e}")

if __name__ == "__main__":
    main()
