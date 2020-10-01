import React, { useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
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