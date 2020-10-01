import React from 'react';
export default function PersonForm({onSubmit,name,nameChange,number,numberChange}) {
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    name: <input value={name} onChange={nameChange} />
                </div>
                <div>
                    number: <input value={number} onChange={numberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>

        </div>
    )
};
