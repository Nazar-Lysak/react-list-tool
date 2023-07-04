import React from 'react';
import { motion } from "framer-motion";

import './NameDescription.css';

const NameDescription = ({ name, state, setState }) => {

  function close() {
    setState((prev) => ({
      ...prev,
      buttonRef: null,
      selectedName: '',
      selectedIndex: null
    }));

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('name');

    window.history.pushState(null, '', `?${searchParams.toString()}`);
  }

  function calculateArrowLeft() {
    if(state.buttonRef) {
      const elementWidth = state.buttonRef.offsetWidth;
      const elementLeft = state.buttonRef.offsetLeft + (elementWidth / 2) - 15; 

      const elementHeight = state.buttonRef.offsetHeight;
      const elementTop = state.buttonRef.offsetTop + elementHeight / 2 - 50;

      window.scrollTo({
        top: elementTop,
        behavior: 'smooth',
      });

      return elementLeft;
    }    
  }

  return (
    <motion.div 
      className='active-name' 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span className='arrow' style={{left: `${calculateArrowLeft()}px`}}></span>
      <span className='close' onClick={() => close()}>X</span>
      <h3 className='headding'>
          {name}
      </h3>
      <div 
        className='description-wrapper'>
          <p className='description'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>     
          <button className='share'>Share Link</button>
      </div>
        
    </motion.div>
  )
}

export default NameDescription;
