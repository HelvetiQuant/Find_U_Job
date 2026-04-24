# 🤖 AI Job Buddy

**La tua piattaforma intelligente per trovare lavoro con l'AI!**

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-2.0+-green.svg)](https://flask.palletsprojects.com)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 📋 Sommario

AI Job Buddy è un'applicazione web completa che utilizza l'intelligenza artificiale per matching automatico tra candidati e offerte di lavoro. Supporta upload di CV in PDF, integrazione con multiple job board gratuite, e un sistema completo di candidatura.

## ✨ Caratteristiche Principali

### 🎯 **Core Features**
- **AI Job Matching**: Sistema intelligente di scoring basato su competenze
- **PDF CV Upload**: Estrazione automatica del testo dai CV
- **Complete Application Form**: Modulo di candidatura completo con dati anagrafici
- **Multi-Source Jobs**: Integrazione con job board gratuite (Jobicy, LinkedIn, etc.)
- **Modal Popup**: Visualizzazione dettagliata delle offerte di lavoro

### 🔧 **Technical Features**
- **Backend**: Flask con Python
- **Frontend**: HTML5, CSS3, JavaScript vanilla
- **Database**: SQLite
- **PDF Processing**: PyPDF2
- **AI Integration**: Ollama (configurabile)
- **CORS**: Supporto completo per cross-origin requests

### 🌐 **Job Sources Integration**
- **Jobicy**: 100+ remote jobs (gratuito)
- **LinkedIn**: Tech jobs scraping
- **Python.org**: Posizioni Python-specific
- **Stack Overflow**: Tech jobs
- **TechJobs Italia**: Offerte italiane
- **Adzuna**: API gratuita (1,000 requests/day)

## 🚀 Quick Start

### Prerequisiti
- Python 3.8+
- pip package manager

### Installazione

1. **Clona il repository**
```bash
git clone https://github.com/yourusername/ai-job-buddy.git
cd ai-job-buddy
```

2. **Installa le dipendenze**
```bash
pip install -r requirements.txt
```

3. **Avvia il backend**
```bash
python simple_server_complete.py
```

4. **Avvia il frontend**
```bash
# Apri nel browser:
http://localhost:3000/frontend_complete.html
```

### Setup Rapido (5 minuti)

1. **Avvia il server**:
```bash
python simple_server_complete.py
```

2. **Apri l'applicazione**: `http://localhost:3000/frontend_complete.html`

3. **Carica jobs di test**:
```bash
python enhanced_job_fetcher.py
```

4. **Inizia a usare l'app!**

## 📖 Documentazione

### 🎯 **Come Usare l'App**

1. **Compila i Dati Anagrafici**
   - Nome, Cognome, Email, Telefono
   - Località e Data di Nascita

2. **Carica il CV PDF**
   - Click o drag-and-drop del file
   - Estrazione automatica del testo

3. **Aggiungi Competenze**
   - Technical skills e soft skills
   - Esperienze rilevanti

4. **Scrivi Lettera di Presentazione**
   - Personalizzata per ogni candidatura
   - Highlights dei punti di forza

5. **Applica ai Jobs**
   - AI matching automatico
   - Score e feedback in tempo reale

### 🔌 **API Endpoints**

#### Jobs Management
```http
GET  /jobs           # Ottieni tutte le offerte
POST /jobs           # Aggiungi nuova offerta
```

#### CV Processing
```http
POST /extract-cv     # Estrai testo da PDF
```

#### Applications
```http
POST /apply          # Invia candidatura con AI matching
```

#### Health Check
```http
GET  /               # Status del server
GET  /health         # Health check completo
```

### 🗂️ **Struttura del Progetto**

```
ai-job-buddy/
├── frontend_complete.html     # Frontend completo
├── simple_server_complete.py  # Backend Flask
├── enhanced_job_fetcher.py    # Job fetcher multi-source
├── adzuna_setup.py           # Configurazione Adzuna API
├── requirements.txt          # Dipendenze Python
├── saas.db                  # Database SQLite
├── README.md                # Questo file
└── CHANGELOG.md             # Changelog delle versioni
```

## 🔧 Configurazione

### 🤖 **AI Integration (Ollama)**

1. **Installa Ollama**
```bash
# Linux/macOS
curl -fsSL https://ollama.ai/install.sh | sh

# Windows
# Scarica da https://ollama.ai/download
```

2. **Configura le variabili ambiente**
```bash
export OLLAMA_API_URL="http://localhost:11434"
export OLLAMA_MODEL="llama2"
```

### 🌐 **Job Sources Configuration**

#### Adzuna API (Opzionale)
1. Registrati su https://developer.adzuna.com/
2. Ottieni App ID e App Key
3. Configura in `adzuna_setup.py`

#### Altre Fonti
- **Jobicy**: Automatico (nessuna configurazione)
- **LinkedIn**: Automatico con rate limiting
- **Python.org**: Automatico

## 📊 **Job Fetching**

### Carica Jobs da Fonti Gratuite

```bash
# Fetch da tutte le fonti
python enhanced_job_fetcher.py

# Solo Jobicy
python job_fetcher.py

# Con Adzuna (richiede API key)
python job_fetcher_complete.py
```

### Fonti Disponibili

| Fonte | Jobs | Tipo | API Key |
|-------|-------|------|---------|
| Jobicy | 100+ | Remote | No |
| LinkedIn | 50+ | Tech | No |
| Python.org | 10+ | Python | No |
| Adzuna | 1000/day | Various | Yes |

## 🎨 **Customizzazione**

### Modifica AI Scoring

Edita `simple_server_complete.py`:
```python
def calculate_ai_score(profile_text, job_id):
    # Personalizza l'algoritmo di scoring
    # Aggiungi keywords specifiche
    # Modifica pesi e threshold
```

### Aggiungi Nuove Fonti Jobs

1. Crea nuovo metodo in `EnhancedJobFetcher`
2. Aggiungi al `main()` function
3. Testa e deploy

### Personalizza Frontend

Edita `frontend_complete.html`:
- Modifica colori e stili CSS
- Aggiungi nuovi campi al form
- Personalizza il modal popup

## 🚀 **Deployment**

### Railway (Consigliato)

1. **Fork il repository**
2. **Connetti a Railway**
3. **Configura le variabili ambiente**
4. **Deploy automatico**

### Heroku

```bash
# Installa Heroku CLI
heroku create ai-job-buddy
heroku config:set OLLAMA_API_URL="your_url"
git push heroku main
```

### Docker

```bash
docker build -t ai-job-buddy .
docker run -p 8001:8001 ai-job-buddy
```

## 🧪 **Testing**

### Test Backend
```bash
python test_connection.html
```

### Test CV Processing
```bash
python test_cv_workflow.py
```

### Test Job Fetching
```bash
python enhanced_job_fetcher.py
```

## 🤝 **Contributing**

1. **Forka il progetto**
2. **Crea branch feature** (`git checkout -b feature/amazing-feature`)
3. **Commit le modifiche** (`git commit -m 'Add amazing feature'`)
4. **Push al branch** (`git push origin feature/amazing-feature`)
5. **Apri Pull Request**

### Code Style
- Segui PEP 8 per Python
- Usa JavaScript vanilla per frontend
- Commenta il codice in italiano

## 📝 **API Reference**

### Jobs API

#### GET /jobs
```json
[
  [1, "AI Engineer", "TechCorp", "description...", 0, "new"],
  [2, "ML Engineer", "StartupX", "description...", 0, "new"]
]
```

#### POST /jobs
```json
{
  "title": "Software Engineer",
  "company": "TechCompany",
  "link": "https://example.com/job",
  "description": "Job description..."
}
```

### CV Processing API

#### POST /extract-cv
```multipart
file: [PDF file]
```

Response:
```json
{
  "success": true,
  "text": "Extracted CV text...",
  "pages": 2,
  "filename": "cv.pdf"
}
```

### Application API

#### POST /apply
```json
{
  "job_id": 1,
  "cv": "Complete CV text...",
  "applicant_data": {
    "firstName": "Mario",
    "lastName": "Rossi",
    "email": "mario@email.com",
    "phone": "+39 333 1234567",
    "location": "Milano",
    "skills": "Python, ML, AI...",
    "coverLetter": "Dear Hiring Manager..."
  }
}
```

Response:
```json
{
  "applied": true,
  "score": 85,
  "job_id": 1,
  "applicant": "Mario Rossi",
  "message": "AI Score: 85/100 - Applied",
  "profile_completeness": 95
}
```

## 🔒 **Security**

### Best Practices
- Validazione input lato server
- Rate limiting per API calls
- Sanitizzazione file upload
- CORS properly configurato

### Privacy
- Nessun dato personale salvato senza consenso
- CV files processati localmente
- Logs anonimizzati

## 🐛 **Troubleshooting**

### Common Issues

#### "Failed to fetch" Error
- Controlla che il backend sia running su porta 8001
- Verifica configurazione CORS
- Controlla firewall settings

#### PDF Upload Non Funziona
- Verifica che il file sia un PDF valido
- Controlla dimensione (< 10MB)
- Testa con CV di esempio

#### AI Score Sempre 0
- Verifica che il CV contenga keywords rilevanti
- Controlla configurazione Ollama
- Testa con CV di esempio

### Debug Mode
```bash
python simple_server_complete.py --debug
```

## 📄 **License**

Questo progetto è sotto licenza MIT - vedi il file [LICENSE](LICENSE) per dettagli.

## 👥 **Team**

- **Developer**: [Your Name](https://github.com/yourusername)
- **AI Integration**: Ollama Community
- **Design**: Bootstrap & Custom CSS

## 🙏 **Acknowledgments**

- **Ollama** per l'integrazione AI
- **Jobicy** per l'API gratuita di remote jobs
- **Flask** per il backend framework
- **PyPDF2** per il processing PDF

## 📞 **Support**

- **Issues**: [GitHub Issues](https://github.com/yourusername/ai-job-buddy/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/ai-job-buddy/discussions)
- **Email**: your.email@example.com

---

⭐ **Se questo progetto ti è utile, lascia una star su GitHub!** ⭐
