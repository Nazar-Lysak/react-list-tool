import React, { useState, useEffect, useRef, useCallback } from 'react';

import Names from './components/Names';
import { namesData } from './data/names';

import './App.css';

function App() {

  const [state, setState] = useState(
    { displayNames: 45, 
      selectedName: '', 
      selectedIndex: null, 
      indexInRow: null, 
      buttonRef: null, 
      identToLeft: null 
    }
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const showParam = urlParams.get('show');
    const nameParam = urlParams.get('name');
    const parsedShowParam = parseInt(showParam, 10);
    setState((prev) => ({
      ...prev,
      selectedName: nameParam || '',
      selectedIndex: null || namesData.indexOf(nameParam),
      displayNames: parsedShowParam
    }));
  }, []);

  const buttonRefs = useRef([]);

  const addButtonRef = useCallback((ref) => {
    if (ref && !buttonRefs.current.includes(ref)) {
      buttonRefs.current.push(ref);
    }
  }, []);

  function handleShowMore() {
    const newShowMore = state.displayNames + 20;
    setState((prev) => ({
      ...prev,
      selectedName: '',
      selectedIndex: null,
      displayNames: newShowMore
    }));

    window.history.pushState(null, '', `?show=${newShowMore}`);
  }

  function handleName(name, index, buttonRef) {
    setState((prev) => ({
      ...prev,
      buttonRef: buttonRef[index],
      selectedName: name,
      selectedIndex: index
    }));
    const searchParams = new URLSearchParams();
    searchParams.set('show', namesData.length < state.displayNames ? namesData.length : state.displayNames);

    if (name) {
      searchParams.set('name', name);
    }

    window.history.pushState(null, '', `?${searchParams.toString()}`);
  }

  const displayedNames = namesData.slice(0, state.displayNames);

  // console.log(state)

  return (
    <div className="app">
      <div className='grid-conteiner'>
      
      {displayedNames.map((name, index) => (
          <Names
          addButtonRef={addButtonRef}
          buttonRefs={buttonRefs}
            key={name}
            name={name}
            index={index}
            displayedNames={displayedNames}
            state={state}
            setState={setState}
            handleName={handleName}
            
          />
        ))}
      </div>
      {namesData.length > 45 && (
        <button 
          className='show_more'
          onClick={() => handleShowMore()}
        >
          show more
      </button>
      )}
      
    </div>
  );
}

export default App;
