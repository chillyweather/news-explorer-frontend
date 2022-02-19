import React from 'react';

function Preloader() {
  return (
    <div className="circle-preloader">
      <div className="circle-preloader__spin" />
      <p className="circle-preloader__description">Searching...</p>
    </div>
  );
}
export default Preloader;
