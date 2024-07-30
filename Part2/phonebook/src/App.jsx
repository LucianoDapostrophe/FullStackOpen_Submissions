import { useState } from 'react'
import PhoneList from './components/PhoneList'

function App() {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '040-1234567',
      id: 1
    },
    {
      name: 'art blart',
      number: '555-5555',
      id: 2
    },
    {
      name: 'archie jughead',
      number: '778-123 4567',
      id: 3
    },
    {
      name: 'bob',
      number: '123456789',
      id: 4
    }
  ])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
      <div>
        filter shown with 
        <input value={filter} onChange={handleFilterChange}/>
      </div>
      <h2>Add New</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <PhoneList persons={persons} filter={filter} />
    </div>
  )
}

export default App
