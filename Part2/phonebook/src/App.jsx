import { useState, useEffect } from 'react'
import axios from 'axios'
import PhoneList from './components/PhoneList'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

function App() {

  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    console.log('effect');
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes');
  
  
  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: String(persons.length + 1)
      }
      setPersons(persons.concat(personObject))
      setNewName('')
        setNewNumber('')
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleChange={handleFilterChange} />
      <h2>Add New</h2>
      <PersonForm onSubmit={addPerson} name={newName} number={newNumber} 
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <PhoneList persons={persons} filter={filter} />
    </div>
  )
}

export default App
