import React from 'react'
import styles from './Dropdown.module.scss'
import {getColorName} from '../../api'

export default class Dropdown extends React.Component {
  constructor() {
    super()
    this.state = {
      dropdownIsOpen: false,
      currentColor: 'white',
      currentColorName: 'White',
      colorOptions: ['#3bcebe', '#3b95ce', '#3bce75', '#ce3b4b']
    }

    this.renderItems = this.renderItems.bind(this)
    this.onColorClick = this.onColorClick.bind(this)
    this.onEscapeKeyDown = this.onEscapeKeyDown.bind(this)
    this.onDropdownButtonClick = this.onDropdownButtonClick.bind(this)
    this.fetchColorName = this.fetchColorName.bind(this)
  }

  componentDidMount() {
    const {currentColor, currentColorName} = this.state
    document.body.style.backgroundColor = currentColor
    document.title = currentColorName
    window.addEventListener('keydown', this.onEscapeKeyDown)
  }

  componentDidUpdate(nextProps, nextState) {
    const {currentColor, currentColorName} = this.state
    if (nextState.currentColor !== currentColor) {
      document.body.style.backgroundColor = currentColor
      this.fetchColorName(currentColor)
    }

    if (nextState.currentColorName !== currentColorName) {
      document.title = currentColorName
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscapeKeyDown)
  }

  onEscapeKeyDown(e) {
    if (e.key !== 'Escape') return
    this.setState({
      dropdownIsOpen: false
    })
  }

  async fetchColorName(color) {
    try {
      const currentColorName = await getColorName(color)
      this.setState({currentColorName})
    } catch (error) {
      console.error(error)
    }
  }

  onDropdownButtonClick() {
    this.setState(prevState => ({
      dropdownIsOpen: !prevState.dropdownIsOpen
    }))
  }

  onColorClick(currentColor) {
    this.setState({currentColor, dropdownIsOpen: false})
  }

  renderItems() {
    const {colorOptions} = this.state
    return colorOptions.map((color, i) => (
      <div key={i} className={styles.dropdownItem} onClick={() => this.onColorClick(color)}>
        {color}
      </div>
    ))
  }

  render() {
    const {dropdownIsOpen} = this.state
    return (
      <div className={styles.dropdownContainer}>
        <button className={styles.dropdownButton} onClick={this.onDropdownButtonClick}>
          Change color
        </button>
        {dropdownIsOpen && <div className={styles.dropdown}>{this.renderItems()}</div>}
      </div>
    )
  }
}
