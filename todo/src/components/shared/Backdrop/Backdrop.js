import React from 'react'
import ReactDOM from 'react-dom';
import './backdrop.css';
import { motion } from 'framer-motion';


const pageVariants2 = {
    initial: {

        scale: 0,

    },
    in: {

        scale: 1
    },
    out: {

      scale: 0

    }
  }

const pageTransitions2 = {
    type: 'spring',
    
    mass: .5,
    velocity: 15,
    damping: 50,
    

}
const Backdrop = (props) => {
    return ReactDOM.createPortal(
        <motion.div
        style={{overflowX: 'hidden'}}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants2}
        transition={pageTransitions2}
        className="backdrop" onClick={props.onClick}></motion.div>,
        document.getElementById('backdrop-hook')
    );
};

export default Backdrop
