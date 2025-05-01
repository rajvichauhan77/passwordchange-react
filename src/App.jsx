import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllwoed] = useState(false)
  const [charAllowed, setCharAllwoed] = useState(false)
  const [password, setPassword] = useState("")


  // useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
      let pass = ""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

      if(numberAllowed) str += "123456789"
      if(charAllowed) str += "!@#$%^&*+-_"

      for(let i = 1; i <= length; i++){
        let char = Math.floor(Math.random() * str.length + 1)

        pass += str.charAt(char)

        setPassword(pass)
      }

  }, [length, numberAllowed, charAllowed, setPassword])


  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(password)
  } ,[password])


  useEffect(() => {passwordGenerator()}, [length, numberAllowed, charAllowed, passwordGenerator])


  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg p-4 text-orange-500 bg-gray-700 mt-15'>
      <h1 className='text-center text-white my-5 font-2xl'>Password generator</h1>
        <div className='flex shadow rounded-lg  overflow-hidden m-auto'>
          <input type="text" value={password} className='w-full p-3 bg-gray-200 outline-none' placeholder='Password' readOnly  ref={passwordRef} />

          <button onClick={copyPasswordToClipboard} className="text-white p-3 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Copy</button>
        </div>

      <div className='flex text-sm gap-3'>
        <div className='flex items-ceneter gap-3'>
          <input type="range" min={6} max={100} value={length} className='cursor-pointer' 
          onChange={(e) => {setLength(e.target.value)}}/>
          <label htmlFor="">Length : {length}</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={numberAllowed} id='numbrInput' onChange={() => {setNumberAllwoed((prev) => !prev)}} />
          <label htmlFor="numbrInput">Number</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={numberAllowed} id='numbrInput' onChange={() => {setNumberAllwoed((prev) => !prev)}} />
          <label htmlFor="numbrInput">Charctors</label>
        </div>


      </div>

     </div>
    </>
  )
}

export default App
