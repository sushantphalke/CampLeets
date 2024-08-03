import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export const Signin = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.token) {
            navigate("/main");
        }
    }, []);

    const signRequest = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const data = await response.json();
        if (data.token) {
            console.log(data.token);
            localStorage.setItem('token', "Bearer " + data.token);
            props.setIsAuthenticated(true);
            navigate('/main');
        } else {
            alert(data.message);
            navigate('/signin');
        }
    };

    return (
        <form>
            <input
                type="text"
                placeholder="Enter username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={signRequest}>Submit</button>
            <Link className="pointer underline pl-1 cursor-pointer" to="/signup">
                Sign Up
            </Link>
        </form>
    );
};




// import { useState ,useEffect} from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// export const Signin = (props)=>{
//     const [username,setUsername]= useState("");
//     const [password,setPassword]= useState("");
//     const navigate = useNavigate();
//     useEffect(()=>{
//         if(localStorage.token)
//         {
//             navigate("/main")
//         }
//     },[])
//     const signRequest = async()=>{
//         const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/signin`,{
//            method : 'POST',
//            headers: {
//             'Content-Type': 'application/json'
//         },
//            body : JSON.stringify({
//             username,
//             password
//         })
//         })
//         const data= await response.json();
//         if(data.token)
//         {
//             console.log(data.token)
//             localStorage.setItem('token',"Bearer "+data.token);
//             props.setIsAuthenticated(true);
//             navigate('/main')
//         }
//         else{
//             alert(data.message)
//             navigate('/signin')
//         }
//     }
//     return <div className="bg-slate-300 h-screen flex justify-center">
//         <input type="text" placeholder="Enter username" onChange={(e)=>{
//             setUsername(e.target.value)
//         }} />
//         <br />
//         <input type="text" placeholder="Enter password" onChange={(e)=>{
//             setPassword(e.target.value)
//         }} />
//         <br />
//         <button onClick={signRequest}>Submit</button>
//         <Link className="pointer underline pl-1 cursor-pointer" to="/signup">
//         signup
//       </Link>
//   </div>
// }