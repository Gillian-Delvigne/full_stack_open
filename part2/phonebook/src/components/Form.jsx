export const Form = ({
  handlePerson,
  newName,
  handleName,
  newNum,
  handleNum,
}) => {
  return (
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
  )
}
