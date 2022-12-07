import React from "react"

export default function Quiz(props) {
    
    const question = props.questionAnswer.map(question => (
        <div className="question">
            <h3>{question.question}</h3>
            <button>{question.options[0]}</button>
            <button>{question.options[1]}</button>
            <button>{question.options[2]}</button>
            <button>{question.options[3]}</button>
            <hr />
        </div> 
    ))
    
    return (
        <div className="quiz">
            {question}
            <button className="quiz-check">Check answers</button>
        </div>
    )
}