import './App.css'
import Card from './components/Card'
import Input from './components/Input'

function App() {

  return (
    <>
      <button style={{ btnStyle }}>Click</button>

      <hr />


      <Input />

      <br />
      <input type="search" placeholder='search' />
      <br />
      <Card />


      <hr />

      <button>Signup</button>
      <Button name='Login' />



    </>
  )
}

export default App


const btnStyle = {
  color: 'gray',
  backgroundColor: 'teal'
}