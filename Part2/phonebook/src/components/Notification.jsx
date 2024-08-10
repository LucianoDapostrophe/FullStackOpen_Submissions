const Notification = ({message, error}) => {
    if (message === '') {       
        return <></>
    }

    const style = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (error) {
        return (
            <div style={{...style, color: 'red'}}>
                {message}
            </div>
        )
    }
    
    return (
        <div style={style}>
            {message}
        </div>
    )
}
export default Notification