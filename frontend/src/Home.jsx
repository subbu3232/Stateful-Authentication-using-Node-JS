import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import styles from './Home.module.css';

const Home = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;

    const logoutHandler = async () => {
        try {
            await axios.post('http://localhost:4500/logout', {}, { withCredentials: true });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1>Welcome  {state && state.email}</h1>
                {state && <button onClick={logoutHandler} className={styles.logoutBtn}>Logout</button>}
            </div>
        </div>
    );
};

export default Home;
