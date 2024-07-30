const PhoneList = ({persons, filter}) => {
    if (filter != '') {
        const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));
        return (
            <ul>
                {filteredPersons.map(person => <li key={person.id}>{person.name} {person.number}</li>)}
            </ul>
        )
    }
    else {
        return (
            <ul>
                {persons.map(person => <li key={person.id}>{person.name} {person.number}</li>)}
            </ul>
        )
    }
}

export default PhoneList