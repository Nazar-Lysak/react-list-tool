import React, {useEffect} from 'react';

import NameDescription from './NameDescription';
import './Names.css';

const Names = ({ name, index, state, setState, displayedNames, handleName, buttonRefs, addButtonRef }) => {

  useEffect(() => {
    const activeButtonRef = buttonRefs.current[state.selectedIndex];
    if (activeButtonRef) {
      setState((prev) => ({
        ...prev,
        buttonRef: activeButtonRef,
      }));
      activeButtonRef.classList.add('active_item');
    }

    return () => {
      if (activeButtonRef) {
        activeButtonRef.classList.remove('active_item');
      }
    };
  }, [state.selectedIndex, buttonRefs, setState]);

  function shouldRenderActiveItem(index) {

    const breakpoints = [
      { minWidth: 991, columns: 8 },
      { minWidth: 768, columns: 6 },
      { minWidth: 424, columns: 4 },
      { minWidth: 0, columns: 2 },
    ];

    const currentBreakpoint = breakpoints.find(
      (breakpoint) => window.innerWidth > breakpoint.minWidth
    );

    if (!currentBreakpoint) {
      return false;
    } 

    const { columns } = currentBreakpoint;  

    const currentRow = Math.floor(state.selectedIndex / columns) + 1;    
    const indexShouldRender = currentRow * columns;
    const isLastIndex = index === displayedNames.length - 1;
    
    const isLastIterationWithActiveItem =
      state.selectedIndex + (displayedNames.length % columns) + 1 > displayedNames.length &&
    isLastIndex;

    return (
      (state.selectedName && index + 1 === indexShouldRender) ||
      isLastIterationWithActiveItem
    );
  }

  return (
    <React.Fragment>
      <button 
        className='name_item'
        ref={addButtonRef}
        onClick={() => handleName(name, index, buttonRefs.current)}
      >
        { name }
      </button>
      {shouldRenderActiveItem(index, name) && (
        <NameDescription name={state.selectedName} state={state} setState={setState} />
      )}
    </React.Fragment>
    
  )
}

export default Names;
