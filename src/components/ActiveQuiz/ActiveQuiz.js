import React from 'react'
import classes from './ActiveQuiz.module.css'
import { AnswersList } from './AnswersList/AnswersList'

export const ActiveQuiz = props => (
  <div className = { classes.ActiveQuiz }>
    <p className = { classes.Question }>
      <span>
        <strong>{ props.questionNumber }.&nbsp;</strong>
        { props.question }
      </span>
      <small>{ props.questionNumber } out of { props.quizLength }</small>
    </p>
    
    <AnswersList
      options = { props.options }
      onAnswerClick = { props.onAnswerClick }
      answerState = { props.answerState }
    />
  </div>
)
