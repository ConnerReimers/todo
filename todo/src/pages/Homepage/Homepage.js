import React, { useContext } from 'react';
import './Homepage.css';
import { motion } from "framer-motion";
import { AuthContext } from '../../context/auth-context';
const pageTransitions = {
  initial: {
      opacity: 0,
      x: '-100vw',
      scale: 0.8,

  },
  in: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    x: '-100vw',
    scale: 0.8

  }
}
const transitions = {
  type: 'spring',
  damping: 98,
  stiffness: 444,
  velocity: 0.1,
  restSpeed: 0.3,
  restDelta: 0.5
}


const Homepage = () => {
  const auth = useContext(AuthContext)
  const homeName = auth.isLoggedIn ? `Welcome ${auth.name}!` : 'Please Login or Sign up'
    return (
        <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageTransitions}
        transition={transitions}
        className="contained">
            {homeName}
        </motion.div>
    )
}

export default Homepage
