# Find_U_Job 🤖

AI-powered job matching platform with local AI integration using Ollama and Gemma3.

## Features

- **AI Job Matching**: Analyzes CVs and matches with job opportunities using local AI
- **Local AI Processing**: Uses Ollama with Gemma3 270M model for privacy and speed
- **Modern UI**: Next.js frontend with fun, emoji-rich design
- **Smart Filtering**: Only applies to jobs with 80%+ compatibility score
- **Multi-format Support**: PDF CV parsing with PyPDF2

## Setup

### Prerequisites
1. Install Ollama: https://ollama.com
2. Pull the AI model:
   ```bash
   ollama pull gemma3:270m
   ```

### Installation
1. Clone the repository
2. Install Python dependencies:
   ```bash
   pip install fastapi uvicorn pydantic sqlite3 requests PyPDF2
   ```
3. Install Node.js dependencies (for frontend):
   ```bash
   npm install
   ```

### Running the Application

1. Start Ollama service:
   ```bash
   ollama serve
   ```

2. Start the backend:
   ```bash
   uvicorn ai_job_fundraising_apps_mvp_code:app --reload
   ```

3. Start the frontend (in separate terminal):
   ```bash
   npm run dev
   ```

## Usage

1. **Extract CV Skills**: Use the standalone script:
   ```bash
   python extract_cv_skills.py
   ```

2. **Web Interface**: Open http://localhost:3000 and:
   - Paste your CV in the text area
   - Click "Load Jobs" to see available positions
   - Click "Apply with AI" for smart applications

## Architecture

- **Backend**: FastAPI with SQLite database
- **AI**: Local Ollama integration with Gemma3
- **Frontend**: Next.js with modern UI
- **CV Processing**: PyPDF2 for text extraction

## API Endpoints

- `POST /jobs` - Add new job listings
- `GET /jobs` - Retrieve all jobs (sorted by compatibility score)
- `POST /apply` - Process job applications with AI analysis

## AI Models

Currently using **Gemma3 270M** for:
- CV skill extraction
- Job compatibility scoring
- Professional email generation

## Files

- `ai_job_fundraising_apps_mvp_code.py` - Main application
- `extract_cv_skills.py` - Standalone CV analysis tool
- `setup_ssh_key.py` - SSH key configuration utility

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
