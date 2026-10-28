# Quizzical - Interactive Trivia Challenge

Quizzical is a sleek, modern trivia quiz web application built with **React** and **Vite**, powered by the **Open Trivia Database (OpenTDB)** API. Customize your quiz parameters, test your knowledge in video game trivia, and get instant feedback with score tracking.

---

## Features

- **Custom Quiz Configuration**:
  - **Difficulty Levels**: Select between **Easy** (🌱), **Medium** (⚡), or **Hard** (🔥).
  - **Question Count**: Pick from quick presets (5, 10, 15, 20) or fine-tune with a slider (3 to 25 questions).
- **Dynamic Trivia Fetching**: Fetches fresh questions on-demand from the Open Trivia Database.
- **Randomized Option Shuffling**: Correct and incorrect choices are dynamically shuffled for every question.
- **Answer Checking & Visual Feedback**:
  - Correct answers highlighted in green.
  - Selected incorrect answers highlighted in soft red.
  - Unselected distractors dimmed for clarity.
- **Score Calculation & Replayability**:
  - Shows your final score (e.g., `You scored 4/5 correct answers`).
  - **Play Again**: Start a new round with the same configuration.
  - **Change Settings**: Return to the landing page to reconfigure questions and difficulty.
- **Modern UI & Responsive Design**:
  - Pill-style interactive buttons and radio options.
  - Glassmorphic card styling with ambient background gradients.
  - Fluid mobile and desktop layouts.

---

## Tech Stack

- **Frontend**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Data Source**: [Open Trivia Database API](https://opentdb.com/)
- **Styling**: Pure Vanilla CSS with Google Fonts (Outfit & Inter)

---

## Project Structure

```text
quizzical/
├── index.html          # HTML entry point with Google Fonts
├── index.js            # API utility to fetch questions from OpenTDB
├── src/
│   ├── App.jsx         # Landing page and quiz configuration state
│   ├── App.css         # Component styling for landing page and quiz
│   ├── Questions.jsx   # Quiz interface, answer selection, and score review
│   ├── index.css       # Global resets and typography
│   └── main.jsx        # React DOM root mounting
├── package.json        # Dependencies and build scripts
└── README.md           # Project documentation
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm`

### Installation

1. Clone or navigate to the project directory:
   ```bash
   cd quizzical
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit the URL displayed in the terminal (typically `http://localhost:5173`).

---

## Available Scripts

- `npm run dev`: Starts the Vite development server with Hot Module Replacement (HMR).
- `npm run build`: Bundles production-ready assets to the `dist` folder.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs ESLint to check for code issues.
