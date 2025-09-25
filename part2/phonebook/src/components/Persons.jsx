export const Persons = ({ persons, handleDeletion }) => {
  return (
    <div>
      {persons.map((person) => {
        return (
          <p key={person.id}>
            {person.name} {person.number}{' '}
            <button onClick={() => handleDeletion(person)}>delete</button>
          </p>
        );
      })}
    </div>
  );
};
