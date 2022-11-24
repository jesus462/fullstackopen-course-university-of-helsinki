import { useEffect, useState } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import Notification from './components/Notification'
import Person from './components/Person'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const personIndex = persons.findIndex(person => person.name === newName)

    if (personIndex !== -1) {
      if (newNumber.length > 0) {
        const newNumberConfirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
        if (newNumberConfirm) {
          personService
            .update(persons[personIndex].id, personObject)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== persons[personIndex].id ? person : returnedPerson))
              setNewName('')
              setNewNumber('')

              setMessage(`Changed number for ${returnedPerson.name}`)
              setTimeout(() => {
                setMessage(null)
              }, 5000)
            })
            .catch(error => {
              setError(true)
              setMessage(
                `Information of ${personObject.name} has already been removed from server`
              )
              setTimeout(() => {
                setMessage(null)
                setError(false)
              }, 5000)
              setPersons(persons.filter(person => person.id !== persons[personIndex].id))
            })
        }
      }
      else alert(`${newName} is already added to phonebook`)
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')

          setMessage(`Added ${returnedPerson.name}`)
              setTimeout(() => {
                setMessage(null)
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

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value)
  }

  const handleDeletePerson = (name, id) => {
    const confirmDelete = window.confirm(`Delete ${name}?`)
    if (confirmDelete) {
      personService
        .deletePerson(id)
        .then(returnedPerson => {
          personService
            .getAll()
            .then(initialPersons => {
              setPersons(initialPersons)
            })
        })
    }
  }

  const personsFiltered = 
    persons.filter(person => 
      person.name.toLowerCase().includes(filterName.toLowerCase())
    )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
      <Filter 
        filterName={filterName} 
        handleFilterNameChange={handleFilterNameChange} 
      />
      <h2>Add a new</h2>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
      />
      <h2>Numbers</h2>
      {personsFiltered.map(person => 
        <Person key={person.id} person={person} handleDeletePerson={handleDeletePerson}/>
      )}
    </div>
  )
}

export default App