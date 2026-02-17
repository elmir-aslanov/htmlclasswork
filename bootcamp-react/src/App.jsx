
import React, { useState } from 'react'
import Button from './components/Button'
import Text from './components/Text'

function App() {

  const [name, setname] = useState(null)
  const [data, setData] = useState([])


  console.log(name, "name");

  const targetFunc = (e) => {
    console.log(e, "e");
    setname(e.target.value)
  }

  const clickFunc = () => {
    setData(prev => ([...prev, name]))
    console.log(data, "data");

  }

  return (
    <>
      <input type="text" onChange={targetFunc} />
      <button onClick={clickFunc}>tikla</button>
      <div>
        <Text name={data} />
      </div>
    </>
  )
}






export default App
