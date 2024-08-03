import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Main() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [sortCriteria, setSortCriteria] = useState("name");
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.token) {
            navigate("/");
        }
        const timer = setTimeout(async () => {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/bulk/?filter=${filter}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                }
            });
            console.log(response);
            setUsers(response.data);
        }, 500);
        return () => {
            clearTimeout(timer);
        };
    }, [filter, navigate]);

    const sortedUsers = [...users].sort((a, b) => {
        if (sortCriteria === "name") {
            return a.username.localeCompare(b.username);
        } else if (sortCriteria === "problems") {
            return b.problems - a.problems;
        }
        return 0;
    });

    const handleCreateCohort = () => {
        navigate("/create-cohort", { state: { users } });
    };

    return (
        <div className="main-container">
            <div className="button-container">
                <button className="action-button" onClick={handleCreateCohort}>Create Cohort</button>
                <button className="action-button" onClick={() => navigate("/join-cohort")}>Join Cohort</button>
            </div>
            <div className="filter-container">
                <input 
                    className="filter-input"
                    onChange={(e) => setFilter(e.target.value)} 
                    type="text" 
                    placeholder="Search users..." 
                />
            </div>
            <div className="sort-container">
                <label>
                    <input 
                        type="radio" 
                        value="name" 
                        checked={sortCriteria === "name"} 
                        onChange={() => setSortCriteria("name")} 
                    />
                    Sort by Name
                </label>
                <label>
                    <input 
                        type="radio" 
                        value="problems" 
                        checked={sortCriteria === "problems"} 
                        onChange={() => setSortCriteria("problems")} 
                    />
                    Sort by Number of Problems
                </label>
            </div>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Total Problems</th>
                        <th>Easy Problems</th>
                        <th>Medium Problems</th>
                        <th>Hard Problems</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.map(user => <User key={user._id} user={user} />)}
                </tbody>
            </table>
        </div>
    );
}

function User({ user }) {
    return (
        <tr>
            <td>{user.username}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.problems}</td>
            <td>{user.easy}</td>
            <td>{user.medium}</td>
            <td>{user.hard}</td>
        </tr>
    );
}

export default Main;
