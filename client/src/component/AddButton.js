import React from 'react'


const AddButton = ({ show }) => {
  const handleClick = e => {
    let btn = document.getElementById('addButton')
    if (btn.classList.contains('open')) {
      btn.classList.toggle('open')
      show(0)
    }
    else {
      btn.classList.toggle('open')
      show(1)
    }
  }
  return (

    <button onClick={handleClick} id="addButton"></button>
  )
}

export default AddButton
