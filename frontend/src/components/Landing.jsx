import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

function Landing()
{
    const navigate= useNavigate();
    useEffect(()=>{
        if(localStorage.token)
        {
            navigate("/main")
        }
    })
    const changeUrl = (url)=>{
        navigate('/'+url);
    }
    return (
        <div>
            <button onClick={()=>{
                changeUrl("signin")
            }}>Sign In</button>
            <button onClick={()=>{
                changeUrl("signup")
            }}>Sign Up</button>
        </div>
    )
}
export default Landing