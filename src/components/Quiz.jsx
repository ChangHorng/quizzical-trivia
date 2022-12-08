import React from "react"

export default function Quiz(props) {

    function findQuestionOption(quesId, optId) {
        const optionsList = props.selectedAnswer.filter(ques => 
            ques.questionId == quesId)
        const option = optionsList[0].options.filter(opt => 
            opt.optionId == optId)
        return option[0].selected
    }

    function resultButton(quesId, optId) {
        for (let i=0; i<props.selectedAnswer.length; i++) {
            if (props.selectedAnswer[i].questionId == quesId) {
                for (let j=0; j<props.selectedAnswer[i].options.length; j++) {
                    if (props.selectedAnswer[i].options[j].optionId == optId) {
                        const optionButton = props.selectedAnswer[i].options[j]
                        if (optionButton.selected && !optionButton.answer) 
                            return "false-answer"
                        else if (optionButton.answer) 
                            return "true-answer"
                        else 
                            return "no-answer"
                    }
                }
            }
        }
    }

    const questionOptions = props.questionAnswer.map(ques =>
        <div className="question">
            <h3>{ques.question}</h3>
            {
                ques.options.map(opt =>
                    <button
                        className={
                            `question-button 
                            ${findQuestionOption(ques.questionId, opt.optionId)? 
                                "button-selected" : ""}
                            ${props.checkAnswer? 
                                resultButton(ques.questionId, opt.optionId) : ""}`
                        }
                        onClick={
                            !props.checkAnswer && 
                            (() => props.updateSelectedAnswer(ques.questionId, opt.optionId))
                        }
                    >
                        {opt.option}
                    </button>
                )
            }
            <hr />
        </div> 
    )
    
    return (
        <div>
            <img src="/images/blobs-yellow-small.png" className="image-blobs-yellow"/>
            <div className="quiz">
                {questionOptions}
                <div className="quiz-check-result">
                    {
                        props.checkAnswer? 
                        <p className="quiz-scoring">
                            You scored {props.score}/5 correct answers
                        </p> 
                        : 
                        <></>
                    }
                    <button 
                        className="quiz-check-playagain"
                        onClick={
                            props.checkAnswer? 
                            props.playAgain 
                            : 
                            props.updateScore_checkAnswer
                        }
                    >
                        {props.checkAnswer? "Play again" : "Check answers"}
                    </button>
                </div>
            </div>
            <img src="/images/blobs-blue-small.png" className="image-blobs-blue"/>
        </div>
    )
}
