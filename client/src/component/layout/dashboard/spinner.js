import React from 'react';
import spinner from "./giphy.gif";

export default () => {
  return (
    <div>
      <img src={spinner} alt="LOL"
      style={{width: '50px', margin: 'auto', display: 'block'}}
      />
    </div>
  )
}
