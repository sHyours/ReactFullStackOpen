import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
function App() {
  const [keyword, setKeyword] = useState('')
  const [countries, setCountries] = useState([])
  const keywordChange = e => {
    setKeyword(e.target.value)
  }
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(({ data }) => setCountries(data))
  }, [])
  return (
    <div className="App">
      find countries: <input value={keyword} onChange={keywordChange} />
      <Filter countries={countries} filter={keyword} />
    </div>
  );
}

export default App;
