const PhoneListItem = ({person, onDelete}) => {
    return (
        <tr key={person.id}>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td><button onClick={onDelete}>Delete</button></td>
        </tr>
    )
}

export default PhoneListItem