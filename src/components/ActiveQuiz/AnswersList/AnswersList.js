import React from 'react'
import classes from './AnswersList.module.css'
import { AnswerItem } from './AnswerItem/AnswerItem'

export const AnswersList = props => (
  <ul className = { classes.AnswersList }>
    { props.options.map((answer, index) => {
      return (
        <AnswerItem
          key = { index }
          answer = { answer }
          onAnswerClick = { props.onAnswerClick }
          answerState = { props.answerState ? props.answerState[answer.id] : null }
        />
      )
    }) }
  </ul>
)
