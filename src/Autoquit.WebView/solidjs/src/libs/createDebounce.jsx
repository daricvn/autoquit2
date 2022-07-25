const createDebounce = () => {
    let timeoutId;
    const clear = () => {
      clearTimeout(timeoutId);
      timeoutId = undefined
    }
    const trigger = (func, wait) => {
      if (!!timeoutId) {
        clear();
      }
      timeoutId = setTimeout(func, wait);
    };
    return trigger;
  };
  
  export default createDebounce;
  