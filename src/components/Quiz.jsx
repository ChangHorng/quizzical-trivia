import React from "react"

export default function Quiz(props) {

    function findQuestionOptionSelection(quesId, optId) {
        const optionsList = props.selectedAnswer.filter(ques => ques.questionId == quesId)
        const option = optionsList[0].options.filter(opt => opt.optionId == optId)
        return option[0].selected
    }

    function buttonStyling(quesId, optId) {
        for (let i=0; i<props.selectedAnswer.length; i++) {
            if (props.selectedAnswer[i].questionId == quesId) {
                for (let j=0; j<props.selectedAnswer[i].options.length; j++) {
                    if (props.selectedAnswer[i].options[j].optionId == optId) {
                        const optionButton = props.selectedAnswer[i].options[j]
                        if (optionButton.selected && !optionButton.answer) {
                            return "false-answer"
                        } else if (optionButton.answer) {
                            return "true-answer"
                        } else {
                            return "none-answer"
                        }
                    }
                }
            }
        }
    }

    const question = props.questionAnswer.map(question => (
        <div className="question">
            <h3>{question.question}</h3>
            {
                question.options.map(option => (
                    <button
                        className={
                            `question-button 
                            ${findQuestionOptionSelection(question.questionId, option.optionId)? "selected" : ""}
                            ${props.checkAnswer? buttonStyling(question.questionId, option.optionId) : ""}`
                        }
                        onClick={!props.checkAnswer && (() => props.updateSelectedAnswer(question.questionId, option.optionId))}
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
                <div className="quiz-result">
                    {props.checkAnswer? <p className="quiz-scoring">You scored {props.score}/5 correct answers</p> : <></>}
                    <button 
                        className="quiz-check"
                        onClick={props.checkAnswer? props.playAgain : props.updateScore_checkAnswer}
                    >
                        {props.checkAnswer ? "Play again" : "Check answers"}
                    </button>
                </div>
            </div>
            <img src="/images/blobs-blue-small.png" className="blobs-blue"/>
        </div>
    )
}