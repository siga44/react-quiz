import React, { Component } from 'react'
import classes from './Drawer.module.css'
import { NavLink } from 'react-router-dom'
import Backdrop from '../../UI/Backdrop/Backdrop'

const links = [
  {
    to: '/',
    label: 'List',
    exact: true,
  },
  {
    to: '/auth',
    label: 'Authorization',
    exact: false,
  },
  {
    to: '/create-quiz',
    label: 'Create an quiz',
    exact: false,
  },
]

export default class Drawer extends Component {
  clickHandler = () => {
    this.props.onClose()
  }

  renderLinks = () => {
    return links.map((link, index) => (
        <li key = { index }>
          <NavLink
            to = { link.to }
            exact = { link.exact }
            activeClassName = { classes.active }
            onClick = { this.clickHandler }
          >
            { link.label }
          </NavLink>
        </li>
      ))
  }
  
  render() {
    const cls = [classes.Drawer]

    if (!this.props.isOpen) {
      cls.push(classes.close)
    }
    return (
      <>
        <nav className = { cls.join(' ') }>
          <ul>
            { this.renderLinks() }
          </ul>
        </nav>
        { this.props.isOpen && <Backdrop onClick = { this.props.onClose } /> }
      </>
    )
  }
}
