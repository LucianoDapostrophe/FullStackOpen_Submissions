import { useState } from 'react'

const Button = ({handleClick, text}) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const Header = ({text}) => {
    return <h1>{text}</h1>
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]
    
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(8).fill(0))
    const [maxIndex, setMaxIndex] = useState(0)

    const updateMax = (arr) => {
        let newMax = maxIndex
        const keyArray = Object.keys(arr)
        for (let i = 0; i < keyArray.length; i++) {
            if (arr[i] > arr[newMax]) {
                newMax = i
            }
        }
        return newMax
    }
    
    const handleVoteClick = () => {
        const copy = {...votes}
        copy[selected] += 1
        setVotes(copy)
        setMaxIndex(updateMax(copy))
    }

    const handleAnecdoteClick = () => {
        setSelected(Math.floor(Math.random() * 8))
    }
    
    
    return (
        <div>
            <Header text='Anecdote of the Day' />
            {anecdotes[selected]}
            <p>Votes {votes[selected]}</p>
            <div>
                <Button handleClick={handleVoteClick} text='vote' />
                <Button handleClick={handleAnecdoteClick} text='next anecdote' />
            </div>
            <Header text='Anecdote with most votes' />
            {anecdotes[maxIndex]}
            <p>Has {votes[maxIndex]} Votes</p>
        </div>
  )
}

export default App