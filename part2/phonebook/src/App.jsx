import { useEffect } from "react";

import {
    addNewPerson,
    getAllPersons,
    updatePerson,
    deletePerson,
} from "./service/person";
import { useState } from "react";
import { Filter } from "./components/Filter";
import { Form } from "./components/Form";
import { Persons } from "./components/Persons";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNum, setNewNum] = useState("");
    const [filter, setFilter] = useState("");

    const personsToShow = filter.trim()
        ? persons.filter((person) =>
              person.name.toLowerCase().includes(filter.toLowerCase())
          )
        : persons;

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
            updatePerson(personToUpdate).then(
                setPersons(
                    persons.map((person) =>
                        person.id === personToUpdate.id
                            ? personToUpdate
                            : person
                    )
                )
            );
            return true;
        }
        return false;
    };

    const resetInputs = () => {
        setNewName("");
        setNewNum("");
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
        let shouldReset = false;
        if (!newNum.trim()) return alert("Please provide a valid phone number");
        if (isDuplicate(newName)) shouldReset = handlePersonUpdate();
        else {
            addNewPerson({ name: newName, number: newNum }).then(
                (newPerson) => {
                    const contactList = [...persons, newPerson];
                    setPersons(contactList);
                    shouldReset = true;
                }
            );
        }
        if (shouldReset) resetInputs();
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
            deletePerson(person).then(() => {
                const newList = persons.filter((p) => {
                    return p.id !== person.id;
                });
                setPersons(newList);
            });
        }
    };

    useEffect(() => {
        getAllPersons().then((persons) => setPersons(persons));
    }, []);

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} handleFilter={handleFilter} />
            <h3>Add a newk</h3>
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
