import { useEffect } from 'react';

import {
  addNewPerson,
  getAllPersons,
  updatePerson,
  deletePerson,
} from './service/person';
import { useState } from 'react';
import { Filter } from './components/Filter';
import { Form } from './components/Form';
import { Persons } from './components/Persons';
import { Notification } from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [filter, setFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const personsToShow = filter.trim()
    ? persons.filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )
    : persons;

  const handleNotification = (message, status) => {
    setStatusMessage(status);
    setErrorMessage(message);

    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const handlePersonUpdate = () => {
    if (
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      const personToUpdate = persons.find(
        (person) => person.name === newName
      );
      personToUpdate.number = newNum;
      updatePerson(personToUpdate)
        .then(
          setPersons(
            persons.map((person) =>
              person.id === personToUpdate.id
                ? personToUpdate
                : person
            )
          )
        )
        .catch((error) =>
          handleNotification(error.response.data.error, 'error')
        );
      resetInputs();
      handleNotification(
        `${personToUpdate.name} was successfully updated`,
        'success'
      );
      return true;
    }
    return false;
  };

  const resetInputs = () => {
    setNewName('');
    setNewNum('');
  };

  const isDuplicate = (newName) => {
    const duplicateName = persons.filter(
      (person) => person.name === newName
    );
    if (duplicateName.length) return true;
    return false;
  };

  const handlePerson = (event) => {
    event.preventDefault();
    if (!newNum.trim())
      return handleNotification(
        'Please provide a valid phone number',
        'error'
      );
    if (isDuplicate(newName)) handlePersonUpdate();
    else {
      resetInputs();
      addNewPerson({ name: newName, number: newNum })
        .then((newPerson) => {
          const contactList = [...persons, newPerson];
          setPersons(contactList);
          handleNotification(
            `${newPerson.name} was successfully added`,
            'success'
          );
        })
        .catch((error) =>
          handleNotification(error.response.data.error, 'error')
        );
    }
  };

  const handleName = (event) => {
    setNewName(event.target.value);
  };

  const handleNum = (event) => {
    setNewNum(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleDeletion = (person) => {
    if (window.confirm(`Do you want to delete ${person.name}?`)) {
      deletePerson(person)
        .then(() => {
          const newList = persons.filter((p) => p.id !== person.id);
          setPersons(newList);
          handleNotification(
            `${person.name} was successfully deleted`,
            'success'
          );
        })
        .catch(() =>
          handleNotification(
            `${person.name} has already been removed from the server`,
            'error'
          )
        );
    }
  };

  useEffect(() => {
    getAllPersons().then((persons) => setPersons(persons));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} status={statusMessage} />
      <Filter filter={filter} handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <Form
        handlePerson={handlePerson}
        newName={newName}
        handleName={handleName}
        newNum={newNum}
        handleNum={handleNum}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDeletion={handleDeletion} />
    </div>
  );
};

export default App;
