import React from 'react'
import Field from './Field'

const Form = ({newValues, handleSubmit, handleValueChange}) => {

    //get keys first to generate a field for each key and update if a new key(field) is added to the form through newValues
    const fields = Object.keys(newValues)
                         .map((key, i) => 
                            <Field key={i}
                                   name={key} 
                                   value={newValues[key]}
                                   handleValueChange={handleValueChange}
                            />)

    return (
        <form onSubmit={handleSubmit}>
            {fields}
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default Form