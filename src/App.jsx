import React from "react"
import Start from "./components/Start"
import Quiz from "./components/Quiz"
import { nanoid } from "nanoid"

export default function App() {

    // Store all possible category from API
    const[allCategory, setAllCategory] = React.useState([])

    // Store category id that choose by user for requesting question purpose
    const[categoryId, setCategoryId] = React.useState(0)

    // Store all the questions, options and answers 
    const[questionAnswer, setQuestionAnswer] = React.useState([])

    // Store answer for each question that choose by user
    const[selectedAnswer, setSelectedAnswer] = React.useState([])

    // Store score for all the question's answer
    const[score, setScore] = React.useState(0)

    const[start, setStart] = React.useState(false)    

    const[checkAnswer, setCheckAnswer] = React.useState(false)

    // Helper function for fetching API
    function randomNumber0To3() {
        return Math.floor(Math.random() * 4)
    }

    // Refer from https://tertiumnon.medium.com/js-how-to-decode-html-entities-8ea807a140e5
    function decodeHTMLEntities(text) {
        var textArea = document.createElement('textarea')
        textArea.innerHTML = text
        return textArea.value
    }

    // Request all category from API once
    React.useEffect(() => {
        async function getCategory() {
            const response = await fetch("https://opentdb.com/api_category.php")
            const data = await response.json()
            setAllCategory(data.trivia_categories)
        }
        getCategory()
    }, [])

    // Request questions, options and answers from API based on user options
    React.useEffect(() => {
        async function getQuestionAnswer() {
            const response = await fetch(
                `https://opentdb.com/api.php?amount=5${categoryId? `&category=${categoryId}` : ""}&type=multiple`
            )
            const data = await response.json()
            setQuestionAnswer(data.results.map(result => { 
                const resultOption = result.incorrect_answers
                resultOption.splice(randomNumber0To3(), 0, result.correct_answer)
                return (
                    {
                        questionId: nanoid(),
                        question: decodeHTMLEntities(result.question),
                        options: resultOption.map(opt => { return (
                            {
                                optionId: nanoid(),
                                option: decodeHTMLEntities(opt)
                            }
                        )}),
                        answer: decodeHTMLEntities(result.correct_answer)
                    }
                )
            }))
        }
        getQuestionAnswer()
    }, [categoryId])

    // Set initial user's answer for each question (All to false)
    React.useEffect(() => {
        setSelectedAnswer(questionAnswer.map(quesAns => { return (
            {
                questionId: quesAns.questionId,
                options: quesAns.options.map(opt => { return (
                    {
                        optionId: opt.optionId,
                        selected: false,
                        answer: quesAns.answer == opt.option ? true : false
                    }
                )})
            }
        )}))
    }, [questionAnswer])

    function handleCategoryChange(event) {
        const {value} = event.target
        setCategoryId(value)
    }
    
    function startQuiz() {
        setStart(prevStart => !prevStart)
    }

    function updateSelectedAnswer(quesId, optId) {
        setSelectedAnswer(prevAns => prevAns.map(ans => { return (
            ans.questionId == quesId? 
                {
                    ...ans,
                    options: ans.options.map(opt => { return (
                        opt.optionId == optId? 
                            {...opt, selected: true} 
                            : 
                            {...opt, selected: false}
                    )})
                } 
                : 
                ans 
        )}))
    }

    function updateScore_checkAnswer() {
        let score = 0

        const scores = selectedAnswer.map(ques => 
            ques.options.map(opt => 
                opt.selected && opt.answer ? 1 : 0
            )
        )
        
        for (let i=0; i<scores.length; i++) {
            score += scores[i].reduce((partialSum, x) => partialSum + x, 0)
        }
        
        setScore(score)
        setCheckAnswer(prevCheckAnswer => !prevCheckAnswer)
    }

    function playAgain() {
        setCategoryId(prevCategoryId => prevCategoryId? 0 : 9)
        setQuestionAnswer([])
        setSelectedAnswer([])
        setScore(0)
        setStart(prevStart => !prevStart)
        setCheckAnswer(prevCheckAnswer => !prevCheckAnswer)
    }

    return (
        <div>
            { start ?
                <Quiz 
                    questionAnswer={questionAnswer}
                    selectedAnswer={selectedAnswer}
                    score={score}
                    checkAnswer={checkAnswer}
                    updateSelectedAnswer={updateSelectedAnswer}
                    updateScore_checkAnswer={updateScore_checkAnswer}
                    playAgain={playAgain}
                /> 
                :
                <Start 
                    allCategory={allCategory}
                    categoryId={categoryId}
                    handleCategoryChange={handleCategoryChange}
                    startQuiz={startQuiz}
                />
            }
        </div>
    )
}
