const Person = ({person, handleDeletePerson}) =>
    <>
        <div>
            {person.name} {person.number} <button onClick={() => handleDeletePerson(person.name, person.id)}>delete</button>
        </div>
    </>

export default Person