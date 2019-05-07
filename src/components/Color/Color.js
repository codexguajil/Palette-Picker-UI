import React from 'react';

export function Color({hex}) {

  let style = { backgroundColor: hex };

  return (
    <div style={style} className="Color">
      { hex }
    </div>
  )
}