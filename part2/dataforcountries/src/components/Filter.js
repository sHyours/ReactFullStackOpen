import React, { useState } from 'react';
import Country from './Country';
export default function Filter({ countries, filter }) {
    const countriesToShow = countries.filter(country => ~country.name.toLowerCase().indexOf(filter.toLowerCase()))
    const [show, setShow] = useState({
        show: false,
        country: undefined
    })
    const clickToShow = (country) => {
        setShow({
            show: true,
            country: country
        })
    }
    if (countriesToShow.length > 10) {
        return (
            <>
                <h2>Too many matches, specify another filter</h2>
            </>
        )
    } else if (countriesToShow.length === 1) {
        const country = countriesToShow[0]
        return (
            <Country country={country}></Country>
        )
    } else {
        return (
            <div>
                {
                    countriesToShow.map(country => (
                        <div key={country.name}>
                            <span>{country.name}</span>
                            <button onClick={() => clickToShow(country)}>show</button>
                        </div>
                    ))
                }
                {
                    show.show ? <Country country={show.country}></Country> : []
                }
            </div>
        )
    }

};
