import { useState, useEffect } from 'react'
import personService from './services/persons'
import PhoneListItem from './components/PhoneList'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

function App() {

  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  
  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const deletePerson = (person) => { 
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(deletedPerson => {
          setPersons(persons.filter(person => person.id !== deletedPerson.id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  
  const personsToShow = filter != '' 
  ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) 
  : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleChange={handleFilterChange} />
      <h2>Add New</h2>
      <PersonForm onSubmit={addPerson} name={newName} number={newNumber} 
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <table>
        <tbody>
          {personsToShow.map(person => 
            <PhoneListItem key={person.id} person={person} onDelete={() => deletePerson(person)} />)}
        </tbody>
      </table>
    </div>
  )
}

export default App
