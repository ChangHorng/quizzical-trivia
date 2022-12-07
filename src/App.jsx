import React from "react"
import Start from "./components/Start"
import Quiz from "./components/Quiz"
import { nanoid } from "nanoid"

export default function App() {

    const[allCategory, setAllCategory] = React.useState([])

    const[categoryId, setCategoryId] = React.useState(0)

    const[questionAnswer, setQuestionAnswer] = React.useState([])

    const[start, setStart] = React.useState(false)

    const[selectedAnswer, setSelectedAnswer] = React.useState([])

    function randomNumber() {
        return Math.floor(Math.random() * 4)
    }

    // https://tertiumnon.medium.com/js-how-to-decode-html-entities-8ea807a140e5
    function decodeHTMLEntities(text) {
        var textArea = document.createElement('textarea')
        textArea.innerHTML = text
        return textArea.value
    }

    React.useEffect(() => {
        async function getCategory() {
            const response = await fetch("https://opentdb.com/api_category.php")
            const data = await response.json()
            setAllCategory(data.trivia_categories)
        }
        getCategory()
    }, [])

    React.useEffect(() => {
        async function getQuestionAnswer() {
            const response = await fetch(`https://opentdb.com/api.php?amount=5${categoryId? "" : `&category=${categoryId}`}&type=multiple`)
            const data = await response.json()
            setQuestionAnswer(data.results.map(result => { 
                const option = result.incorrect_answers
                option.splice(randomNumber(), 0, result.correct_answer)
                return (
                    {
                        questionId: nanoid(),
                        question: decodeHTMLEntities(result.question),
                        options: option.map(opt => decodeHTMLEntities(opt)),
                        answer: decodeHTMLEntities(result.correct_answer)
                    }
                )
            }))
        }
        getQuestionAnswer()
    }, [categoryId])
    
    function handleCategoryChange(event) {
        const {value} = event.target
        setCategoryId(value)
    }
    
    function startQuiz() {
        setStart(prevStart => !prevStart)
    }

    return (
        <div>
            { start ?
                <Quiz 
                    questionAnswer={questionAnswer}
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