import React, {useEffect, useState} from 'react'
import styles from './Dropdown.module.scss'
import {getColorName} from '../../api'
const colorOptions = ['#3bcebe', '#3b95ce', '#3bce75', '#ce3b4b']

function useKeydown(key, callback){
  function onEscapeKeyDown(e) {
    if (e.key !== key) return
    callback()
  }
  useEffect(() => {
    window.addEventListener('keydown', onEscapeKeyDown)
    return () => {
      window.removeEventListener('keydown', onEscapeKeyDown)
    }
  }, [])
}

async function fetchColorName(color, setCurrentColor) {
  try {
    const currentColorName = await getColorName(color)
    setCurrentColor(currentColorName)
  } catch (error) {
    console.error(error)
  }
}

function usePopOver(){
  const [isOpen, setIsOpen] = useState(false)
  useKeydown('Escape', ()=>{
    setIsOpen(false)
  })

  return [isOpen, setIsOpen]
}

export default function Dropdown(){
  const [isOpen, setIsOpen] = usePopOver()
  const [currentColor, setCurrentColor] = useState('white')
  const [currentColorName, setCurrentColorName] = useState('White')

  function renderItems(){
    return colorOptions.map((color, i) => (
      <div key={i} className={styles.dropdownItem} onClick={() => {
        setCurrentColor(color)
        setIsOpen(false)
      }}>
        {color}
      </div>
    ))
  }

  useEffect(() => {
    document.body.style.backgroundColor = currentColor
    fetchColorName(currentColor, setCurrentColorName)
  }, [currentColor])

  useEffect(() => {
    document.title = currentColorName
  }, [currentColorName])

  return (
    <div className={styles.dropdownContainer}>
      <button className={styles.dropdownButton} onClick={()=> {setIsOpen(!isOpen)}}>
        Change color
      </button>
      {isOpen && <div className={styles.dropdown}>{renderItems()}</div>}
    </div>
  )
}

