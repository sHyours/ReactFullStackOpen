import React from 'react';
export default function Persons({ persons, search }) {
    return (
        <div>
            {
                persons.filter(p => ~p.name.toLowerCase().indexOf(search.toLowerCase())).map(p => (
                    <h4 key={p.name}>{p.name} {p.number}</h4>
                ))
            }
        </div>
    )
};
