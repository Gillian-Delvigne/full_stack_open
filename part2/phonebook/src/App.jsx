import { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-1234567" },
    ]);
    const [newName, setNewName] = useState("");
    const [newNum, setNewNum] = useState("");
    const [filter, setFilter] = useState("");

    const personsToShow = filter.trim()
        ? persons.filter((person) => person.name.toLowerCase().includes(filter))
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

    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                Filter by name: <input value={filter} onChange={handleFilter} />
            </div>
            <h2>Add a newk</h2>
            <form onSubmit={handlePerson}>
                <div>
                    name: <input value={newName} onChange={handleName} />
                </div>
                <div>
                    number: <input value={newNum} onChange={handleNum} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {personsToShow.map((person) => (
                <p key={person.name}>
                    {person.name} {person.number}
                </p>
            ))}
        </div>
    );
};

export default App;
