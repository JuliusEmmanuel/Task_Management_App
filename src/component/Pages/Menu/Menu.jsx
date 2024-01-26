import React, { useContext, useState } from 'react'
import "./menuStyle.css"
import sunImg from "../../images/sunimg.svg"
import moonImg from "../../images/moonimg.svg"
import eye from "../../images/eye.svg"
import { Thecontext } from "../../../App"


const Menu = () => {

  const {setSidebar, mode, setMode, setShowCreateBoard} = useContext(Thecontext)

  // const [mode2, setMode2] = useState(true)


  const handleMode = ()=>{
    setMode(!mode)
  }


  return (
    <>
    
        <div className='menu'>
            <div className='menuHeader'>
              <div className= "headerlogoline1"></div>
              <div className= "headerlogoline2"></div>
              <div className= "headerlogoline3"></div>
              <h1>Kaban</h1>
            </div>

            <div className='menuBody'>
              <div className='allBoards'>ALL BOARDS (1)</div>
              <div className='createNewBoard'>
                <div className='createBoard' onClick={()=>setShowCreateBoard(true)}>+Create New Board</div>
                <div className='theBoards'>
                  <div className='boards'>Platform Launch</div>
                </div>
              </div>
            </div>

            <div className='menuFooter'>
              <div className='modeToggle'>
                <div className='sunIcon'>
                  <img src={sunImg}/>
                </div>
                <div className='toogleBtn'>
                  <label onClick={()=>setMode(true)}>
                    <input type="checkbox"/>
                    <div className="circle"></div>
                  </label>
                </div>
                <div className='moonIcon'>
                  <img src={moonImg}/>
                </div>
              </div>
              <div className='hideSidebar' onClick={()=>setSidebar(true)}>
                <div className='hideImg'>
                  <img src={eye}/>
                </div>
                <p>Hide Sidebar</p>
              </div>
              {/* <div className='settings'></div> */}
            </div>
        </div>
    
    </>
  )
}

export default Menu
