import React, { useState, useEffect } from 'react'
import Filter from './components/Filter';
import Info from './components/Info';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import PersonsService from './services/PersonsService';
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
  ])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setPhoneNumber] = useState('')
  const [search, setSearch] = useState('')
  const [info, setInfo] = useState({ type: "", message: "" })
  const addPersons = (event) => {
    event.preventDefault()
    console.log('add', event.target);
    const personFinded = persons.find(p => p.name === newName)
    const newPerson = {
      name: newName,
      number: newPhoneNumber
    }
    if (personFinded) {
      if (window.confirm(`${newName} isalready added to phonebook,replace the old number with a new one?`)) {
        PersonsService.update(personFinded.id, newPerson).then(data => {
          setPersons(persons.map(p => p.id !== personFinded.id ? p : data))
        }).catch(error => {
          const data = error.response.data
          setInfo({ type: 'warning', message: `${data.error}` })
          setTimeout(() => {
            setInfo(null)
          }, 5000);
        })
      }
      return
    }
    PersonsService.add(newPerson).then(data => {
      setPersons(persons.concat({ ...newPerson, id: data.id }))
      setInfo({ type: 'info', message: `Added ${data.name}` })
      setTimeout(() => {
        setInfo(null)
      }, 5000);
    }).catch(error => {
      const data = error.response.data
      setInfo({ type: 'warning', message: `${data.error}` })
      setTimeout(() => {
        setInfo(null)
      }, 5000);
    })
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
  const deletePeson = person => {
    PersonsService.deletePerson(person.id).then(id => {
      setPersons(persons.filter(p => p.id !== id))
    }).catch(error => {
      setInfo({ type: 'warning', message: `Infomation of ${person.name} has already been removed from server` })
      setTimeout(() => {
        setInfo(null)
      }, 5000);
    })
  }
  useEffect(() => {
    PersonsService.getAll().then(data => {
      console.log(data);
      setPersons(data)
    })
  }, [])
  return (
    <div>
      <h2>Phonebook</h2>
      {
        info ? <Info type={info.type} message={info.message}></Info> : []
      }
      <Filter search={search} onChange={searchChange} />
      <h3>add a new</h3>
      <PersonForm onSubmit={addPersons} name={newName} nameChange={nameChange} number={newPhoneNumber} numberChange={phoneNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} search={search} deletePerson={deletePeson} />
    </div>
  )
}

export default App