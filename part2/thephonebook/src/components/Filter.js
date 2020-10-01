import React from 'react';
export default function Filter({search,onChange}) {
    return (
      <div>
        filter shown with: <input value={search} onChange={onChange} />
      </div>
    )
};
