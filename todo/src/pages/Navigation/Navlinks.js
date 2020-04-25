import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import './Navlinks.css'
import { AuthContext } from '../../context/auth-context'
import Button from '../../components/shared/Button'


const Navlinks = () => {

    const auth = useContext(AuthContext);

    const userLink = auth.isLoggedIn ? null
    : (
    <li>
        <NavLink to="/auth">Login</NavLink>
    </li>

    )

    return (
        <ul className="nav-links">
            {auth.isLoggedIn && <li>
                <NavLink to={`/${auth.userId}/todo`}>To Do</NavLink>
            </li>}
            


            <li>
                <NavLink to="/">Home</NavLink>
            </li>

            {userLink}
            {auth.isLoggedIn && 
            <li>
                <NavLink to='/'><span onClick={auth.logout}>Logout</span></NavLink>
            </li>}
            
        </ul>
    )
}

export default Navlinks
