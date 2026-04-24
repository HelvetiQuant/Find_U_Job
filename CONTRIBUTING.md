# 🤝 Contributing to AI Job Buddy

Grazie per il tuo interesse a contribuire ad AI Job Buddy! Questo documento ti guiderà attraverso il processo di contribuzione.

## 📋 Sommario

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Guidelines](#contributing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Code Style](#code-style)
- [Testing](#testing)
- [Documentation](#documentation)

## 🌟 Code of Conduct

### Our Pledge
Ci impegniamo a rendere la partecipazione a questo progetto un'esperienza libera da molestie per tutti.

### Our Standards
- Usare linguaggio accogliente e inclusivo
- Rispettare punti di vista ed esperienze diverse
- Accettare costruttivamente feedback
- Mostrare empatia verso altri membri della community

### Responsibilities
- Essere rispettosi nei confronti di altri contributori
- Focalizzarsi su ciò che è meglio per la community
- Mostrare comportamento professionale

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Git
- Account GitHub
- Familiarità con Flask, HTML/CSS, JavaScript

### Quick Start
1. **Forka il repository**
   ```bash
   # Forka su GitHub, poi clona il tuo fork
   git clone https://github.com/YOUR_USERNAME/ai-job-buddy.git
   cd ai-job-buddy
   ```

2. **Configura l'upstream**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/ai-job-buddy.git
   ```

3. **Installa le dipendenze**
   ```bash
   pip install -r requirements.txt
   ```

4. **Crea un branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🛠️ Development Setup

### Environment Setup
```bash
# Crea virtual environment
python -m venv venv

# Attiva virtual environment
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# Installa dipendenze
pip install -r requirements.txt
pip install -r requirements-dev.txt  # se presente
```

### Configuration
1. **Copia .env.example**
   ```bash
   cp .env.example .env
   ```

2. **Configura le variabili ambiente**
   ```bash
   # .env file
   OLLAMA_API_URL=http://localhost:11434
   OLLAMA_MODEL=llama2
   DATABASE_URL=sqlite:///saas.db
   ```

### Running the Application
```bash
# Avvia il backend
python simple_server_complete.py

# In un altro terminale, apri il frontend
# Apri http://localhost:3000/frontend_complete.html
```

## 📝 Contributing Guidelines

### Types of Contributions

#### 🐛 Bug Reports
1. **Usa il template issue per bug**
2. **Fornisci dettagli completi**:
   - Passi per riprodurre
   - Comportamento atteso vs attuale
   - Environment details
   - Screenshots se applicabile

#### ✨ Feature Requests
1. **Controlla issues esistenti**
2. **Usa il template feature request**
3. **Descrivi il problema che risolve**
4. **Fornisci esempi d'uso**

#### 📚 Documentation
- Miglioramento README
- Aggiunta esempi di codice
- Traduzione documentazione
- Tutorial e guide

#### 🔧 Code Contributions
- Bug fixes
- Nuove features
- Performance improvements
- Refactoring

### Development Workflow

1. **Sincronizza con upstream**
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Crea branch per feature**
   ```bash
   git checkout -b feature/your-feature-name
   # o
   git checkout -b fix/bug-description
   ```

3. **Sviluppa e testa**
   ```bash
   # Scrivi codice
   # Testa le modifiche
   python -m pytest tests/
   ```

4. **Commit le modifiche**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

5. **Push e crea PR**
   ```bash
   git push origin feature/your-feature-name
   # Crea Pull Request su GitHub
   ```

## 🔄 Pull Request Process

### Before Submitting
- [ ] Testa tutte le modifiche
- [ ] Aggiorna la documentazione
- [ ] Segui il code style
- [ ] Aggiungi test se necessario
- [ ] Controlla che non ci siano conflitti

### PR Template
```markdown
## Description
Breve descrizione delle modifiche

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Ho testato manualmente
- [ ] Ho aggiunto test automatici
- [ ] Tutti i test passano

## Checklist
- [ ] Code segue le guidelines
- [ ] Self-review completato
- [ ] Documentation aggiornata
- [ ] Changes generate no new warnings
```

### Review Process
1. **Automated checks**: CI/CD pipeline
2. **Code review**: Almeno un maintainer
3. **Testing**: Verifica funzionalità
4. **Merge**: Approvazione e merge

## 🎨 Code Style

### Python (PEP 8)
```python
# Import ordinati
import os
import sys
from flask import Flask, jsonify

# Costanti in MAIUSCOLO
MAX_FILE_SIZE = 10 * 1024 * 1024

# Classi in PascalCase
class JobFetcher:
    def __init__(self):
        self.session = requests.Session()
    
    def fetch_jobs(self):
        """Fetch jobs from API."""
        pass

# Funzioni in snake_case
def process_application(data):
    """Process job application."""
    return result
```

### JavaScript
```javascript
// Usare camelCase per variabili e funzioni
const jobData = {
    title: 'Software Engineer',
    company: 'TechCorp'
};

function fetchJobs() {
    // Fetch jobs from API
    return fetch('/api/jobs')
        .then(response => response.json());
}

// Classi in PascalCase
class JobMatcher {
    constructor() {
        this.jobs = [];
    }
}
```

### HTML/CSS
```html
<!-- Usare semantic HTML -->
<section class="application-form">
    <h2>Modulo di Candidatura</h2>
    <form id="jobApplication">
        <div class="form-group">
            <label for="firstName">Nome</label>
            <input type="text" id="firstName" class="form-control" required>
        </div>
    </form>
</section>
```

```css
/* BEM methodology */
.form-group {
    margin-bottom: 1rem;
}

.form-group__label {
    font-weight: bold;
}

.form-group__input {
    border: 1px solid #ccc;
}
```

## 🧪 Testing

### Test Structure
```
tests/
├── unit/
│   ├── test_backend.py
│   ├── test_job_fetcher.py
│   └── test_ai_matching.py
├── integration/
│   ├── test_api_endpoints.py
│   └── test_cv_processing.py
└── e2e/
    └── test_user_workflow.py
```

### Writing Tests
```python
import unittest
from app import app

class TestJobAPI(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True
    
    def test_get_jobs(self):
        """Test GET /jobs endpoint."""
        response = self.app.get('/jobs')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, list)
    
    def test_add_job(self):
        """Test POST /jobs endpoint."""
        job_data = {
            'title': 'Test Job',
            'company': 'Test Company',
            'link': 'https://example.com',
            'description': 'Test description'
        }
        response = self.app.post('/jobs', json=job_data)
        self.assertEqual(response.status_code, 200)
```

### Running Tests
```bash
# Tutti i test
python -m pytest tests/

# Solo unit test
python -m pytest tests/unit/

# Con coverage
python -m pytest --cov=app tests/

# Specific test file
python -m pytest tests/test_backend.py
```

## 📚 Documentation

### Types of Documentation
- **README.md**: Overview e quick start
- **API Documentation**: Endpoint details
- **Code Comments**: Inline documentation
- **User Guide**: Step-by-step tutorials
- **Developer Guide**: Technical details

### Documentation Standards
```python
def calculate_ai_score(profile_text, job_id):
    """
    Calculate AI matching score based on profile and job requirements.
    
    Args:
        profile_text (str): Complete applicant profile text
        job_id (int): Unique identifier for the job
        
    Returns:
        int: AI matching score (0-100)
        
    Raises:
        ValueError: If profile_text is empty or job_id is invalid
        
    Example:
        >>> score = calculate_ai_score("Python developer with 5 years experience", 1)
        >>> print(score)
        85
    """
    pass
```

## 🏷️ Commit Messages

### Format
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style
- `refactor`: Refactoring
- `test`: Testing
- `chore`: Maintenance

### Examples
```
feat(frontend): add PDF upload functionality

- Add drag-and-drop interface
- Implement PDF text extraction
- Add file validation

Closes #123
```

```
fix(api): resolve CORS issues in production

- Update CORS middleware configuration
- Add proper headers for cross-origin requests
- Test with multiple browsers

Fixes #456
```

## 🚀 Release Process

### Versioning
- Seguire Semantic Versioning (MAJOR.MINOR.PATCH)
- MAJOR: Breaking changes
- MINOR: New features
- PATCH: Bug fixes

### Release Checklist
- [ ] Tutti i test passano
- [ ] Documentation aggiornata
- [ ] CHANGELOG.md aggiornato
- [ ] Version number aggiornato
- [ ] Tag creato
- [ ] GitHub release creata

## 🆘 Getting Help

### Resources
- **GitHub Issues**: Per bug e feature requests
- **Discussions**: Per domande generali
- **Documentation**: README e API docs
- **Code Examples**: Repository examples

### Contact
- **Maintainers**: @maintainer1, @maintainer2
- **Community**: GitHub Discussions
- **Email**: dev@aijobbuddy.com

## 🏆 Recognition

### Contributor Recognition
- **Contributors section** nel README
- **Release notes** attribution
- **Special badges** per contributor significativi
- **Community highlights** nel blog

### Types of Contributions
- **Code**: Features, bug fixes, tests
- **Documentation**: Guides, tutorials, translations
- **Design**: UI/UX improvements
- **Community**: Support, feedback, promotion

---

Grazie per aver contribuito ad AI Job Buddy! 🎉

Ogni contributo è apprezzato e aiuta a rendere questo progetto migliore per tutta la community.
