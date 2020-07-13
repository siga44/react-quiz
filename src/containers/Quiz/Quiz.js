import React, { Component } from 'react'
import classes from './Quiz.module.css'
import { ActiveQuiz } from '../../components/ActiveQuiz/ActiveQuiz'
import { FinishedQuiz } from '../../components/FinishedQuiz/FinishedQuiz'

export default class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: {}, // { [id]: 'success', 'error' }
      activeQuestion: 0,
      isFinished: false,
      answerState: null, // { [id]: 'success', 'error' }
      quiz: [
        {
          id: 1,
          question: 'What is React?',
          rightAnswerId: 2,
          options: [
            { text: 'Best framework', id: 1 },
            { text: 'Library for building UI', id: 2 },
            { text: 'Child of Vue.js', id: 3 },
            { text: 'No correct answer here', id: 4 },
          ]
        },
        {
          id: 2,
          question: 'Main concept of React is using a ...',
          rightAnswerId: 3,
          options: [
            { text: 'Vue.js and jQuery', id: 1 },
            { text: 'try {} catch {} constructions', id: 2 },
            { text: 'components', id: 3 },
            { text: 'jest', id: 4 },
          ]
        },
        {
          id: 3,
          question: '... has created React',
          rightAnswerId: 1,
          options: [
            { text: 'Facebook', id: 1 },
            { text: 'Google', id: 2 },
            { text: 'Angular', id: 3 },
            { text: 'Everything is correct', id: 4 },
          ]
        },
      ]
    }
    this.initialState = { ...this.state }
  }

  isFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  onRetry = () => this.setState({ 
    results: {},
    activeQuestion: 0,
    isFinished: false,
    answerState: null
  })

  onAnswerClick = answerId => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if (this.state.answerState[key] === 'success') {
        return
      }
    }

    const question = this.state.quiz[this.state.activeQuestion]
    const results = this.state.results

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }

      this.setState({
          answerState: {[answerId]: 'success'},
          results
        })

      const timeout = window.setTimeout(() => {
        if (this.isFinished()) {
          this.setState({ isFinished: true })
        } else {
          return this.setState(prevState => {
            return {
              activeQuestion: prevState.activeQuestion + 1,
              answerState: null
            }
          })
        }

        window.clearTimeout(timeout)
      }, 1333)
    } else {
      results[question.id] = 'error'
      this.setState({
          answerState: {[answerId]: 'error'},
          results
        })
    }
  }

  render() {
    return (
      <div className = { classes.Quiz }>
        <div className = { classes.QuizWrapper }>
          <h1>Choose an answer</h1>
          {
            this.state.isFinished 
              ? <FinishedQuiz
                  results = { this.state.results }
                  quiz = { this.state.quiz }
                  onRetry = { this.onRetry }
              />
              : <ActiveQuiz
                  question = { this.state.quiz[this.state.activeQuestion].question }
                  options = { this.state.quiz[this.state.activeQuestion].options }
                  onAnswerClick = { this.onAnswerClick }
                  quizLength = { this.state.quiz.length }
                  questionNumber = { this.state.activeQuestion + 1 }
                  answerState = { this.state.answerState }
                />
          }
        </div>
      </div>
    )
  }
}
