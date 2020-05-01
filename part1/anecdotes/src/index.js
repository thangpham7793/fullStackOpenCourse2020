import React, {useState} from 'react'
import ReactDOM from 'react-dom'


const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
    ]

//Button component
const Button = ({handleClick, label}) => <button onClick={handleClick}>{label}</button>

//Display component
const Display = ({content}) => <p>{content}</p>

//Main App component
const App = () => {

    //function to get a random index 
    const randomNum = () => Math.floor(Math.random() * (anecdotes.length))

    
    //store a random number as the first selected index, so there's a new one on reload
    const [selected, setSelected] = useState(randomNum())
    

    //store votes as key:value pair of an object
    const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])


    //get an array of the index of quotes with the highest votes
    const indexOfHighest = votes.map((vote, index) => Math.max(...votes) === vote && index)


    //loop through indexOfHighest to get an array of the most popular quotes
    const mostPopularQuotes = indexOfHighest.map(index => <Display content={anecdotes[index]}/>)


    //use recursion to generate a different random number, which makes sure a new quote is generated each time the button is clicked
    const differentRandomIndex = (currentIndex) => {
        const newIndex = randomNum()
        return newIndex === currentIndex ? differentRandomIndex(currentIndex) : newIndex  
    }


    //define click handlers for each button
    const handleNewQuote = () => setSelected(differentRandomIndex(selected))

    const handleVote = (selected) => () => setVotes(votes => {
        const newVotes = [...votes]
        newVotes[selected] += 1
        return newVotes
    })

    return (
      <div>
        <h2>Anecdote of the Day</h2>
        <Display content={anecdotes[selected]}/>
        <Display content={`has ${votes[selected]} vote(s)`}/>
        <Button label="Vote" handleClick={handleVote(selected)}/>
        <Button label="Get New Quote" handleClick={handleNewQuote}/>
        {/* Only display anecdotes with most votes when there's at least 1 vote */}
        {
            Math.max(...votes) === 0 
            ? <div><h2>Anecdote(s) with most votes</h2>
                   <p>'No Vote Recorded Yet!'</p>
              </div>
            : <><h2>Anecdote(s) with most votes ({Math.max(...votes)})</h2>
              {mostPopularQuotes}</>
        }
      </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'))