import React from 'react'
import classes from './FinishedQuiz.module.css'
import Button from '../UI/Button/Button'

export const FinishedQuiz = props => {
  const correctAnswers = Object.values(props.results).filter(r => r === 'success').length

  return (
    <div className = { classes.FinishedQuiz }>
      <ul>
        { props.quiz.map((quizItem, index) => {
          const cls = [
            'fa',
            props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
            classes[props.results[quizItem.id]]
          ]
          return (
            <li
              key = { index }
            >
              <strong>{ index + 1 }&nbsp;</strong>
              { quizItem.question }
              <i className = { cls.join(' ') } />
            </li>
          )
        }) }
      </ul>

      <p>{ correctAnswers } out of { props.quiz.length } answers are correct</p>

      <div>
        <Button
          onClick = { props.onRetry }
          type={'primary'}
        >
          Try again
        </Button>
        <Button
          type={'secondary'}
        >
          Other quizzes
        </Button>
      </div>
    </div>
  )
}
