import React from "react"
import Start from "./components/Start"

export default function App() {

    const[allCategory, setAllCategory] = React.useState([])

    const[categoryId, setCategoryId] = React.useState(0)

    const[questionAnswer, setQuestionAnswer] = React.useState([])

    const[start, setStart] = React.useState(false)

    function randomNumber() {
        return Math.floor(Math.random() * 4)
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
                        question: result.question,
                        options: option,
                        answer: result.correct_answer
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
            <img src="/images/blobs-yellow.png" className="blobs-yellow"/>
            { start ?
                <></> :
                <Start 
                    allCategory={allCategory}
                    categoryId={categoryId}
                    handleCategoryChange={handleCategoryChange}
                    startQuiz={startQuiz}
                />
            }
            <img src="/images/blobs-blue.png" className="blobs-blue"/>
        </div>
    )
}