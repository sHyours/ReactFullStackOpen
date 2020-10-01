import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
  ])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setPhoneNumber] = useState('')
  const [search, setSearch] = useState('')
  const addPersons = (event) => {
    event.preventDefault()
    console.log('add', event.target);
    if (persons.some(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat({
      name: newName,
      number: newPhoneNumber
    }))
  }
  const nameChange = (e) => {
    setNewName(e.target.value);
  }
  const phoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  }
  const searchChange = (e) => {
    setSearch(e.target.value);
  }
  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
    })
  }, [])
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} onChange={searchChange} />
      <h3>add a new</h3>
      <PersonForm onSubmit={addPersons} name={newName} nameChange={nameChange} number={newPhoneNumber} numberChange={phoneNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} search={search} />
    </div>
  )
}

export default App