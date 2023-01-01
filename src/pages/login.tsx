import '../styles/login.css'
import { auth, provider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";


export const Login = () => {

    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider);
        navigate('/home');
    };

    return (
        <motion.div id='loginContainer'
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{
                duration:0.2
            }}
        >
            <button onClick={signInWithGoogle} id='loginBtn'>Sign in with Google</button>
        </motion.div>
    );
}                                                                                                                                      