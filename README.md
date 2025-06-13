# 🤖 Virtual AI Interviewer

Welcome to the official repository for our **AI Interviewer Graduation Project** — a virtual, intelligent system that simulates real-world job interviews using multimodal AI. Built to evaluate candidate responses in real time, this system integrates NLP, speech processing, emotion recognition, and adaptive questioning.

---

## 📌 Project Overview

The Virtual AI Interviewer is an adaptive, role-aware system that:

* Conducts structured interviews in real time
* Generates dynamic questions using LLMs (LLaMA 3.3)
* Evaluates candidate answers with feedback and scoring (Mistral-7B)
* Detects emotion via voice (wav2vec 2.0) and facial cues (DeepFace)
* Adjusts difficulty and tracks confidence throughout the session

---

## ⚙️ Tech Stack

| Area              | Tools Used                                    |
| ----------------- | --------------------------------------------- |
| Language Models   | LLaMA 3.3 (QGen), Mistral-7B (Scoring)        |
| Speech Processing | Whisper (STT), Bark (TTS)                     |
| Emotion Detection | wav2vec 2.0 (voice), DeepFace + OpenCV (face) |
| Vector Retrieval  | Qdrant + Sentence Transformers + Cohere       |
| Backend Language  | Python 3.10                                   |
| Environment       | VS Code, Google Colab, Kaggle, GitHub         |

---

## 📋 Features

* 🎙️ **Real-Time Questioning**: Role-based prompts adapted on the fly
* 📊 **Answer Scoring**: Qualitative scores + reasoning + suggestions
* 🎭 **Multimodal Emotion Recognition**: Combined facial and vocal emotion cues
* 🔄 **Adaptive Interview Loop**: Questions change based on performance
* 📄 **Auto-Generated Summary**: Full transcript + score breakdown + trends

---

## 🧠 System Architecture (Pipeline)
```
graph TD
    A[User Input: Role, Skills] --> B[Retrieve Context (Qdrant)]
    B --> C[Build Prompt (LLaMA 3.3)]
    C --> D[Generate Question]
    D --> E[Vocalize via Bark]
    E --> F[User Answers Verbally]
    F --> G[Transcribe via Whisper]
    G --> H[Analyze Emotion (wav2vec + DeepFace)]
    H --> I[Score Answer (Mistral-7B)]
    I --> J[Adjust Difficulty + Generate Q2]
    J --> K[Session Logging + Summary Report]
```

---

## 🚀 Quick Start

1. **Clone the repo**

```bash
git clone https://github.com/your-org/ai-interviewer.git
cd ai-interviewer
```

2. **Install dependencies**

```bash
pip install -r requirements.txt
```

3. **Run locally**

```bash
python main.py
```

> Note: You must have access to models (LLaMA, Mistral, Whisper, Bark) locally or via API.

---

## 🧪 Evaluation Summary

| Dimension                 | Score (/5) |
| ------------------------- | ---------- |
| Question Relevance        | 4.9        |
| Contextual Responsiveness | 4.7        |
| Scoring Fairness          | 4.8        |
| Language Coherence        | 4.6        |
| Behavioral Realism        | 4.4        |

📌 Average: **4.68 / 5**

---

## 📂 Repository Structure

```
├── data/                 # JSON Q&A dataset
├── models/               # Pretrained model loaders or configs
├── pipeline/             # Core logic (interview_loop, scoring, prompt gen)
├── ui/                   # Interface or CLI
├── utils/                # Helper functions
├── results/              # Logs, transcripts, summaries
├── README.md             # This file
└── requirements.txt      # Python dependencies
```

---

## 📣 Team & Acknowledgments

This project was developed as part of the graduation requirement at Helwan University. Special thanks to our supervisor, reviewers, and open-source contributors who made this possible.

Team: Farida Khaled 
      Esraa Mohammed 
      Madiha Saied 
      Hania Ruby
      Mohammed Tarek
      Muhammed Yasser
---

## 📌 License

MIT License — feel free to fork, adapt, and expand this work with proper credit.
