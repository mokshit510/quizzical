import { useState } from 'react'
import Questions from './Questions.jsx'
import './App.css'

function App() {
  const [isQuizStarted, setIsQuizStarted] = useState(false)
  const [amount, setAmount] = useState(5)
  const [difficulty, setDifficulty] = useState('easy')

  const difficultyOptions = [
    { id: 'easy', label: 'Easy', emoji: '🌱', desc: 'Relaxed & Fun' },
    { id: 'medium', label: 'Medium', emoji: '⚡', desc: 'Solid Challenge' },
    { id: 'hard', label: 'Hard', emoji: '🔥', desc: 'Expert Level' }
  ]

  const amountPresets = [5, 10, 15, 20]

  return (
    <div className="app-wrapper">
      <div className="blob blob-top-right"></div>
      <div className="blob blob-bottom-left"></div>

      {!isQuizStarted ? (
        <section className="landing-card">
          <div className="landing-badge">🎮 Video Games Trivia</div>
          <h1 className="landing-title">Quizzical</h1>
          <p className="landing-subtitle">
            Put your gaming trivia to the test! Customize your quiz parameters below and see how high you can score.
          </p>

          <div className="config-container">
            <div className="config-section">
              <label className="config-label">Select Difficulty</label>
              <div className="difficulty-grid">
                {difficultyOptions.map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    className={`difficulty-card ${difficulty === opt.id ? 'active' : ''}`}
                    onClick={() => setDifficulty(opt.id)}
                  >
                    <span className="diff-emoji">{opt.emoji}</span>
                    <span className="diff-label">{opt.label}</span>
                    <span className="diff-desc">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="config-section">
              <div className="amount-label-row">
                <label className="config-label" htmlFor="question-amount">Number of Questions</label>
                <span className="amount-counter">{amount} Questions</span>
              </div>
              <div className="amount-presets">
                {amountPresets.map(preset => (
                  <button
                    key={preset}
                    type="button"
                    className={`amount-pill ${amount === preset ? 'active' : ''}`}
                    onClick={() => setAmount(preset)}
                  >
                    {preset}
                  </button>
                ))}
              </div>
              <input
                id="question-amount"
                type="range"
                min="3"
                max="25"
                step="1"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="amount-slider"
              />
            </div>
          </div>

          <button
            className="start-quiz-btn"
            onClick={() => setIsQuizStarted(true)}
          >
            Start Quiz <span>→</span>
          </button>
        </section>
      ) : (
        <Questions
          amount={amount}
          difficulty={difficulty}
          onBackToMenu={() => setIsQuizStarted(false)}
        />
      )}
    </div>
  )
}

export default App
