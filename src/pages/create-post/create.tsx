import { Form } from './form';
import { motion } from "framer-motion";


export const Create = () => {
    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
                duration:0.2
            }}
            exit={{ scale: 0 }}
        >
            <Form />
        </motion.div>
    )
}