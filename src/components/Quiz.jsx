import React from "react"
import Confetti from "react-confetti"

export default function Quiz(props) {

    /*
    This function is to find the corrrespond question and option when user try to select
    their answer for each question (Only one answer is allowed per question) to update the
    selectedAnswer (And for styling purpose)
    */
    function findQuestionOption(quesId, optId) {
        const optionsList = props.selectedAnswer.filter(ques => 
            ques.questionId == quesId)
        const option = optionsList[0].options.filter(opt => 
            opt.optionId == optId)
        return option[0].selected
    }

    /*
    This function is to find out whether user choose the correct or wrong answer when they 
    click check answer (Mainly for styling purpose)
    */
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

    // Show all questions and options of each question from API (Based on the category user choose)
    const questionOptions = props.questionAnswer.map(ques =>
        <div className="question">
            <h3>{ques.question}</h3>
            {
                ques.options.map(opt =>
                    <button
                        className={
                            `question-button 
                            ${!props.selectedAnswer && findQuestionOption(ques.questionId, opt.optionId)? 
                                "button-selected" : ""}
                            ${props.checkAnswer? 
                                resultButton(ques.questionId, opt.optionId) : ""}`
                        }
                        // If user clicked check answer they are not allowed to changed their answer
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
            {props.checkAnswer && props.score > 2 && <Confetti />}
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
