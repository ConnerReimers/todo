import React from 'react'
import { motion, animate } from 'framer-motion';


const Switchz = (props) => {
    const className = `switch ${props.isOn ? "on" : "off"}`;
    return (
        <motion.div animate className={className} {...props}>
            <motion.div animate />
        </motion.div>
    )
}

export default Switchz
