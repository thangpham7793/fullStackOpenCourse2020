import React from 'react'
import '../index.css'

const Notification = ({message}) => {

    if (message.length === 0) return null;

    return (
        message.toLowerCase().includes('error') 
        ? <h2 className='error'>
           {message}
          </h2>
        : <h2 className='success'>
            {message}
          </h2>
    )
        
}

export default Notification