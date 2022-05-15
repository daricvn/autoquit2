const createDebounce = () => {
    let timeoutId;
    const clear = () => clearTimeout(timeoutId);
    const trigger = (func, wait) => {
      if (timeoutId !== undefined) {
        clear();
      }
      timeoutId = setTimeout(func, wait);
    };
    return trigger;
  };
  
  export default createDebounce;
  