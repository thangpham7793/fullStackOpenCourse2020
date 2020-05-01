import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    // calculate different stats based on existing states
    const totalVotes = good + neutral + bad
    const average = (good - bad)/totalVotes
    const positivePercentage = good/totalVotes * 100 

    // define click handlers for each button
    const countGood = () => setGood(good + 1)
    const countNeutral = () => setNeutral(neutral + 1)
    const countBad = () => setBad(bad + 1)

    return (
      <div>
        <h2>Give Feedback </h2>
        <Button text="good" handleClick={countGood}/>
        <Button text="neutral" handleClick={countNeutral}/>
        <Button text="bad" handleClick={countBad}/>
        <h2>Statistics</h2>
        {/* show stats only when there's at least 1 vote */}
        {totalVotes
        ? <table>
            <tbody>
                <Stat label="good" value={good}/>
                <Stat label="neutral" value={neutral}/>
                <Stat label="bad" value={bad}/>
                <Stat label="total votes" value={totalVotes}/>
                <Stat label="average" value={average}/>
                <Stat label="positive" value={`${positivePercentage}%`}/>
            </tbody>
         </table>
        : 'No feedback given'
        }
      </div>
    )
  }
  
  //Stat component
  const Stat = props => <tr><td>{props.label}</td><td>{props.value}</td></tr>
  //Button component
  const Button = props => <button onClick={props.handleClick}>{props.text}</button>
  
  ReactDOM.render(<App />, document.getElementById('root'))