import { useState, useEffect } from 'react'
import personService from './services/persons'
import PhoneListItem from './components/PhoneList'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

function App() {

  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notificationMessage, setNotificationMessagee] = useState('')
  const [errorFlag, setErrorFlag] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  
  const addPerson = (event) => {
    event.preventDefault()
    const updatePerson = persons.find(person => person.name === newName)
    if (updatePerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personObject = {...updatePerson, number : newNumber}
        personService
          .update(personObject.id, personObject)
          .then(updatedPerson => {
            setPersons(persons.map(old => old.id === updatedPerson.id ? updatedPerson : old))
            setNewName('')
            setNewNumber('')
            setNotificationMessagee(`${updatedPerson.name} updated number to ${updatedPerson.number}.`)
            setTimeout( () => {
              setNotificationMessagee('')
            }, 5000)
          })
          .catch(error => {
            setErrorFlag(true)
            setNotificationMessagee(`Information of ${personObject.name} has already been deleted from the server.`)
            setTimeout( () => {
              setNotificationMessagee('')
              setErrorFlag(false)
            }, 5000)
          })
        }
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
        setNotificationMessagee(`${returnedPerson.name} added to the phonebook.`)
        setTimeout( () => {
          setNotificationMessagee('')
        }, 5000)
      })
    }
  }

  const deletePerson = (person) => { 
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(deletedPerson => {
          setPersons(persons.filter(person => person.id !== deletedPerson.id))
          setNotificationMessagee(`${deletedPerson.name} deleted from phonebook.`)
          setTimeout( () => {
            setNotificationMessagee('')
          }, 5000)
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
      <Notification message={notificationMessage} error={errorFlag}/>
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
