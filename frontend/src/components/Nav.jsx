import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar(props) {
    const navigate = useNavigate();

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         setIsAuthenticated(true);
    //     } else {
    //         setIsAuthenticated(false);
    //     }
    // }, []);

    const handleLogin = () => {
        // Redirect to login page or perform login action
       navigate('/signin');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        props.setIsAuthenticated(false);
        navigate('/'); // Redirect to home or landing page
    };

    return (
        <nav style={{display: "flex", justifyContent: "space-between"}}>
            <div>MotivateMe.com</div>
            <div>
                {props.isAuthenticated ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <button onClick={handleLogin}>Login</button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
