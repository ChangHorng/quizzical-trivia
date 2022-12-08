import React from "react"

export default function Quiz(props) {

    function findQuestionOptionSelection(quesId, optId) {
        const optionsList = props.selectedAnswer.filter(ques => ques.questionId == quesId)
        const option = optionsList[0].options.filter(opt => opt.optionId == optId)
        return option[0].selected
    }

    const question = props.questionAnswer.map(question => (
        <div className="question">
            <h3>{question.question}</h3>
            {
                question.options.map(option => (
                    <button
                        className={`question-button ${findQuestionOptionSelection(question.questionId, option.optionId)? "selected" : ""}`}
                        onClick={() => props.updateSelectedAnswer(question.questionId, option.optionId)}
                    >
                        {option.option}
                    </button>
                ))
            }
            <hr />
        </div> 
    ))
    
    return (
        <div>
            <img src="/images/blobs-yellow-small.png" className="blobs-yellow"/>
            <div className="quiz">
                {question}
                <button className="quiz-check">Check answers</button>
            </div>
            <img src="/images/blobs-blue-small.png" className="blobs-blue"/>
        </div>
    )
}