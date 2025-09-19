import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAllPersons = () => {
    const request = axios.get("http://localhost:3001/persons");
    return request
        .then((response) => {
            if (response.status === 200) return response.data;
        })
        .catch((error) => alert(error));
};

const addNewPerson = (person) => {
    const request = axios.post(baseUrl, person);
    return request
        .then((response) => {
            if (response.statusText === "Created") return response.data;
        })
        .catch((error) => alert(error));
};

const updatePerson = (person) => {
    const request = axios.put(`${baseUrl}/${person.id}`, person);
    return request
        .then((response) => {
            if (response.status === 200) return response.data;
        })
        .catch((error) => alert(error));
};

const deletePerson = (person) => {
    const request = axios.delete(`${baseUrl}/${person.id}`);
    return request
        .then((response) => {
            if (response.status === 200) return response;
        })
        .catch((error) => alert(error));
};

export { getAllPersons, addNewPerson, updatePerson, deletePerson };
