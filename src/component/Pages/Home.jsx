import React, { useContext} from 'react'
import Menu from "./Menu/Menu"
import Taskside from "./Taskside/Taskside"
import { Thecontext } from "../../App"

const Home = () => {


    const {sidebar} = useContext(Thecontext)
    
  return (
    <>
    
        <div style={{
            width: "100%",
            height: "100vh",
            display: "flex",
        }}>
                {/* the Menu code base component */}
            <div style={
                sidebar ? {minWidth: "20%",height: "100%",borderRight:" 1px solid grey", display: "none"} 
                : {minWidth: "20%",height: "100%",borderRight:" 1px solid grey", display: "flex"}}>
                <Menu/></div>

                {/* the Taskside code base component */}
            <div style={{
                width: "100%",
                height: "100%",
            }}><Taskside/></div>
        </div>
    
    </>
  )
}

export default Home
