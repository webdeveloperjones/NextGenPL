import React, { useState } from 'react'
import Header from '../component/Header'
import Main from '../component/Main'
import AddButton from '../component/AddButton'
import AddForm from '../component/AddForm'


function App() {
  const [showform, setShowform] = useState(0)
  return (
    <>
      <Header />
      <AddButton show={setShowform} />
      {
        showform
          ? <AddForm show={setShowform}/>
          : false
      }
      <Main />
    </>
  )
}

export default App
