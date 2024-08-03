
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";// Ensure the CSS file is imported

export const Signup = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.token) {
            navigate("/main");
        }
    }, []);

    const createUser = async () => {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, {
            firstName,
            lastName,
            username,
            password
        });
        console.log(response);
        if (response.data.token) {
            localStorage.setItem("token", "Bearer " + response.data.token);
            props.setIsAuthenticated(true);
            navigate('/main');
        } else {
            navigate("/signup");
        }
    };

    return (
        <form>
            <input
                type="text"
                placeholder="Enter username"
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
            />
            <input
                type="password"
                placeholder="Enter password"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <input
                type="text"
                placeholder="Enter first name"
                onChange={(e) => {
                    setFirstName(e.target.value);
                }}
            />
            <input
                type="text"
                placeholder="Enter last name"
                onChange={(e) => {
                    setLastName(e.target.value);
                }}
            />
            <button type="button" onClick={createUser}>Submit</button>
            <Link className="pointer underline pl-1 cursor-pointer" to="/signin">
                Sign In
            </Link>
        </form>
    );
};





// import axios from "axios"
// import { useState,useEffect } from "react"
// import { useNavigate } from "react-router-dom"
// import { Link } from "react-router-dom"
// export const Signup = (props)=>{
//     const [firstName, setFirstName]=useState("");
//     const [lastName,setLastName]=useState("");
//     const [username,setUsername]=useState("");
//     const [password,setPassword]=useState("");
//     const navigate=useNavigate();
//     useEffect(()=>{
//         if(localStorage.token)
//         {
//             navigate("/main")
//         }
//     },[])
//     const createUser=async()=>{
//         const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signup`,{
//             firstName,
//             lastName,
//             username,
//             password
//         })
//         console.log(response)
//         if(response.data.token)
//         {
//             localStorage.setItem("token","Bearer "+response.data.token);
            
//             props.setIsAuthenticated(true);
//             navigate('/main')
//         }
//         else{
//             navigate("/signup")
//         }
//     }
//     return (
//         <div>
//             <input type="text" placeholder="Enter username" onChange={(e)=>{
//             setUsername(e.target.value)
//         }} />
//         <br />
//         <input type="text" placeholder="Enter password" onChange={(e)=>{
//             setPassword(e.target.value)
//         }} />
//         <br />
//         <input type="text" placeholder="Enter first name" onChange={(e)=>{
//             setFirstName(e.target.value)
//         }} />
//         <br />
//         <input type="text" placeholder="Enter last name" onChange={(e)=>{
//             setLastName(e.target.value)
//         }} />
//         <br />
//         <button onClick={createUser}>Submit</button>
//         <Link className="pointer underline pl-1 cursor-pointer" to="/signin">
//         signin
//       </Link>
//         </div>
//     )
// }