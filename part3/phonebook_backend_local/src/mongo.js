const mongoose = require("mongoose");

if (process.argv.length === 3 || process.argv.length === 5) {
    const password = process.argv[2];
    const url = `mongodb+srv://gillian_db:${password}@cluster0.h05vttv.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=Cluster0`;
    mongoose.set("strictQuery", false);
    mongoose.connect(url);

    const personSchema = new mongoose.Schema({
        name: String,
        number: String,
    });

    const Person = mongoose.model("Person", personSchema);

    if (process.argv.length > 3) {
        const personName = process.argv[3];
        const personNumber = process.argv[4];

        const newPerson = new Person({
            name: personName,
            number: personNumber,
        });

        newPerson.save().then((result) => {
            console.log(
                `added ${personName} number ${personNumber} to Phonebook`
            );
            mongoose.connection.close();
        });
    } else {
        Person.find({}).then((persons) => {
            console.log("phonebook:");
            persons.forEach((person) => {
                console.log(`${person.name} ${person.number}`);
            });
            mongoose.connection.close();
        });
    }
} else {
    console.log("give password and contact info as argument");
    process.exit(1);
}
