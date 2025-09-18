import { useEffect } from "react";

import { addNewPerson, getAllPersons } from "./service/person";
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

    const handleFormError = () => {
        const duplicateName = persons.filter(
            (person) => person.name === newName
        );
        if (duplicateName.length) {
            alert(`${newName} is already added to phonebook`);
            return true;
        }
        if (!newNum.trim()) {
            alert("Please provide a valid phone number");
            return true;
        }
        return false;
    };

    const handlePerson = (event) => {
        event.preventDefault();
        if (!handleFormError()) {
            addNewPerson({ name: newName, number: newNum }).then(
                (newPerson) => {
                    const contactList = [...persons, newPerson];
                    setPersons(contactList);
                }
            );
            setNewName("");
            setNewNum("");
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
            <Persons persons={personsToShow} />
        </div>
    );
};

export default App;
