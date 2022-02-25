import React from 'react';

export default function useKeypress(key, action) {
  React.useEffect(() => {
    function onKeyup(e) {
      if (e.key === key) action();
    }
    document.addEventListener('keyup', onKeyup);
    return () => document.removeEventListener('keyup', onKeyup);
  }, [action, key]);
}
