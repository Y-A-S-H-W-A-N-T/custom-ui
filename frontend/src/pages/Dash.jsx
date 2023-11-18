import  { useState } from 'react'
import Dashboard from '../components/dash'
import SideBar from '../components/SideBar'
import Custom from '../components/custom'

function Dash() {

  const [dash,setDash] = useState(true)
  const [custom,setCustom] = useState(false)


  const showDash = ()=>{
    setDash(true)
    setCustom(false)
  }

  const showCustom = ()=>{
    setCustom(true)
    setDash(false)
  }

  return (
    <div className='bg-gradient-to-t from-white via-purple-100 to-indigo-200'>
        <SideBar showDash={showDash} showCustom={showCustom}/>
        {dash && <Dashboard/>}
        {custom && <Custom showDash={showDash}/>}
    </div>
  )
}

export default Dash


