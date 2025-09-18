import { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
    const [newName, setNewName] = useState("");

    const handlePerson = (event) => {
        event.preventDefault();
        const duplicate = persons.filter((person) => person.name === newName);
        if (duplicate.length)
            return alert(`${newName} is already added to phonebook`);
        const contactList = [...persons, { name: newName }];
        setPersons(contactList);
        setNewName("");
    };

    const handleName = (event) => {
        setNewName(event.target.value);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={handlePerson}>
                <div>
                    name: <input value={newName} onChange={handleName} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((person) => (
                <p key={person.name}>{person.name}</p>
            ))}
        </div>
    );
};

export default App;
