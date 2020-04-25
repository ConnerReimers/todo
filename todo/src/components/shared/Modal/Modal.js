import React, { Fragment } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import { motion, AnimatePresence } from 'framer-motion';
import './modal.css'
import ReactDOM from 'react-dom';


const pageVariants = {
    initial: {

        scale: 0,

    },
    in: {

        scale: .9
    },
    out: {

      scale: 0

    }
  }

const pageTransitions = {
    type: 'spring',
    
    mass: .5,
    velocity: 1,
    damping: 5,
    restDelta: 0.0005,
    restSpeed: 0.0005

}

const Modal = (props) => {

    const modalContent = (
        <div className={`modal ${props.className}`} style={props.style}>
            <header className={`modal-header ${props.headerClass}`}>
                <h2>{props.header}</h2>
            </header>
            <form onSubmit={props.onSubmit ? props.onSubmit : (event) => event.preventDefault}>
                <div className={`modal-content ${props.contentClass}`}>
                    {props.children}
                </div>
                <footer className={`modal-footer ${props.footerClass}`}>
                    {props.footer}
                </footer>
            </form>
        </div>
    )
    return ReactDOM.createPortal(
        <Fragment>
            
       
            <AnimatePresence exitBeforeEnter>
                
                {props.show && 
                <motion.div
                    initial="initial"
                    key="modal"
                    animate="in"
                    exit="out"
                    transition={pageTransitions}
                    variants={pageVariants}
                    // style={{overflow: "hidden"}}
                    >{modalContent}
                </motion.div>}

                {props.show && 
                <Backdrop onClick={props.cancel} />
                } 


                        
                
            </AnimatePresence>
        </Fragment>, document.getElementById('modal-hook')
    )
}

export default Modal
