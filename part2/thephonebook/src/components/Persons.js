import React from 'react';
export default function Persons({ persons, search, deletePerson }) {
    const deleteConfirm = persons => {
        if(window.confirm(`Delete ${persons.name}?`)){
            deletePerson(persons)
        }
    }
    return (
        <div>
            {
                persons.filter(p => ~p.name.toLowerCase().indexOf(search.toLowerCase())).map(p => (
                    <div key={p.id}>
                        <h4>{p.name} {p.number}</h4>
                        <button onClick={() => deleteConfirm(p)}>delete</button>
                    </div>
                ))
            }
        </div>
    )
};
