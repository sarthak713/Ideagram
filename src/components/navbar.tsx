import '../styles/navbar.css';
import menu from '../images/menu.png'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

export const Navbar = () => {

    const [user] = useAuthState(auth);

    const navigate = useNavigate();

    const [navDisplay, setNavDisplay] = useState(false);

    const signUserOut = async () => {
        await signOut(auth);
        navigate('/');
        setNavDisplay(!navDisplay);
    };

    return (
        <div id='navbar'>

            <div id="logo">Ideagram</div>

            <div id='buttons'>

                {user
                    ? (
                        <button id='navButton' onClick={() => setNavDisplay(!navDisplay)}>
                            <img src={menu} alt="navbar" />
                        </button>
                    )
                    : (<></>)
                }

                <div id='username'>
                    {user
                        ? (user?.displayName?.split(' ')[0][0].toUpperCase())
                        : "?"
                    }
                </div>

                <div id={navDisplay ? "text" : "noText"}>
                    {user && (
                        <Link to='/home' className='link' onClick={() => setNavDisplay(!navDisplay)}>Home</Link>
                    )}
                    {user && (
                        <Link to='/create' className='link' onClick={() => setNavDisplay(!navDisplay)}>Create</Link>
                    )}
                    {!user && (
                        <Link to='/' className='link' onClick={() => setNavDisplay(!navDisplay)}>Login</Link>
                    )}
                    {user && (
                        <button className='logoutBtn' onClick={signUserOut}>Logout</button>
                    )}
                </div>

            </div>

        </div>
    )
}