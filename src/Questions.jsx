import { useState, useEffect } from "react"
import { obj } from "../index"

export default function Questions({ amount = 5, difficulty = "easy", onBackToMenu }) {
    const [questions, setQuestions] = useState([])
    const [selectedAnswers, setSelectedAnswers] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isCheckClicked, setIsCheckClicked] = useState(false)

    function formatAndSetQuestions(data) {
        if (!data || data.length === 0) {
            setError("No questions found for the chosen settings. Please try adjusting your parameters.")
            setLoading(false)
            return
        }
        const formatted = data.map((item, index) => {
            const allOptions = [...item.incorrect_answers, item.correct_answer]
            const shuffledOptions = allOptions.sort(() => Math.random() - 0.5)

            return {
                id: index,
                question: item.question,
                correctAnswer: item.correct_answer,
                options: shuffledOptions
            }
        })
        setQuestions(formatted)
        setError(null)
        setLoading(false)
    }

    function playAgain() {
        setLoading(true)
        setIsCheckClicked(false)
        setSelectedAnswers({})
        setError(null)
        obj(amount, difficulty)
            .then(formatAndSetQuestions)
            .catch(err => {
                console.error("Failed to fetch questions:", err)
                setError("Unable to load questions right now. Please try again later.")
                setLoading(false)
            })
    }

    useEffect(() => {
        obj(amount, difficulty)
            .then(formatAndSetQuestions)
            .catch(err => {
                console.error("Failed to fetch questions:", err)
                setError("Unable to load questions right now. Please check your connection and try again.")
                setLoading(false)
            })
    }, [amount, difficulty])

    function handleOptionChange(questionIndex, option) {
        if (isCheckClicked) return
        setSelectedAnswers(prev => ({
            ...prev,
            [questionIndex]: option
        }))
    }

    const score = questions.reduce((total, item, qIndex) => {
        return selectedAnswers[qIndex] === item.correctAnswer ? total + 1 : total
    }, 0)

    function getOptionStyle(item, opt, qIndex) {
        const isSelected = selectedAnswers[qIndex] === opt
        const isCorrect = item.correctAnswer === opt

        if (!isCheckClicked) {
            return {
                backgroundColor: isSelected ? "#D6DBF5" : "transparent",
                borderColor: isSelected ? "#4D5B9E" : "#8F94FB",
                opacity: 1
            }
        }

        if (isCorrect) {
            return {
                backgroundColor: "#94D7A2",
                borderColor: "#94D7A2",
                color: "#293264"
            }
        }
        if (isSelected && !isCorrect) {
            return {
                backgroundColor: "#F8BCBC",
                borderColor: "#F8BCBC",
                opacity: 0.7
            }
        }
        return {
            backgroundColor: "transparent",
            borderColor: "#8F94FB",
            opacity: 0.5
        }
    }

    if (loading) {
        return (
            <div className="status-screen">
                <div className="spinner"></div>
                <p className="loading-text">Crafting your quiz...</p>
                <span className="loading-subtext">{amount} questions • {difficulty.toUpperCase()} difficulty</span>
            </div>
        )
    }

    if (error) {
        return (
            <div className="status-screen">
                <div className="error-icon">⚠️</div>
                <p className="error-text">{error}</p>
                <div className="action-buttons">
                    <button className="quiz-btn" onClick={playAgain}>Retry</button>
                    {onBackToMenu && (
                        <button className="secondary-btn" onClick={onBackToMenu}>Change Settings</button>
                    )}
                </div>
            </div>
        )
    }

    return (
        <main className="quiz-container">
            <header className="quiz-header-bar">
                <div className="quiz-badge-group">
                    <span className="badge category-badge">🎮 Video Games</span>
                    <span className="badge difficulty-badge">{difficulty.toUpperCase()}</span>
                    <span className="badge amount-badge">{questions.length} Questions</span>
                </div>
                {onBackToMenu && (
                    <button className="back-btn" onClick={onBackToMenu} title="Return to start page">
                        ← Menu
                    </button>
                )}
            </header>

            {questions.map((item, qIndex) => (
                <div key={item.id} className="question-block">
                    <h4
                        className="question-title"
                        dangerouslySetInnerHTML={{ __html: `${qIndex + 1}. ${item.question}` }}
                    />
                    <div className="options-group">
                        {item.options.map((opt, oIndex) => {
                            const optionStyle = getOptionStyle(item, opt, qIndex)
                            return (
                                <label
                                    key={oIndex}
                                    className="option-pill"
                                    style={optionStyle}
                                >
                                    <input
                                        type="radio"
                                        name={`choice-${qIndex}`}
                                        value={opt}
                                        checked={selectedAnswers[qIndex] === opt}
                                        disabled={isCheckClicked}
                                        onChange={() => handleOptionChange(qIndex, opt)}
                                    />
                                    <span dangerouslySetInnerHTML={{ __html: opt }} />
                                </label>
                            )
                        })}
                    </div>
                    <hr className="question-divider" />
                </div>
            ))}

            <div className="quiz-footer">
                {isCheckClicked ? (
                    <div className="score-wrapper">
                        <span className="score-text">
                            You scored {score}/{questions.length} correct answers
                        </span>
                        <div className="action-buttons">
                            <button className="quiz-btn" onClick={playAgain}>
                                Play Again
                            </button>
                            {onBackToMenu && (
                                <button className="secondary-btn" onClick={onBackToMenu}>
                                    Change Settings
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <button
                        className="quiz-btn"
                        onClick={() => setIsCheckClicked(true)}
                        disabled={Object.keys(selectedAnswers).length === 0}
                    >
                        Check Answers
                    </button>
                )}
            </div>
        </main>
    )
}
