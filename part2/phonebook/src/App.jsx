import { useState } from "react";
import { Filter } from "./components/Filter";
import { Form } from "./components/Form";
import { Persons } from "./components/Persons";
import { useEffect } from "react";
import axios from "axios";

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

    const handlePerson = (event) => {
        event.preventDefault();
        const duplicateName = persons.filter(
            (person) => person.name === newName
        );
        if (duplicateName.length)
            return alert(`${newName} is already added to phonebook`);
        if (!newNum.trim()) return alert("Please provide a valid phone number");
        const contactList = [...persons, { name: newName, number: newNum }];
        setPersons(contactList);
        setNewName("");
        setNewNum("");
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
        const promise = axios.get("http://localhost:3001/persons");
        promise.then((response) => {
            if (response.status === 200) setPersons(response.data);
        });
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
