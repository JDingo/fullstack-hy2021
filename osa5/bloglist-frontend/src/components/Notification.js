import React from 'react'
import '../index.css'

import { useSelector } from 'react-redux'

const Notification = () => {
    const { message, type } = useSelector(state => state.notification)

    console.log(message, type)

    if (message === null) {
        return null
    }

    if (type === 'error') {
        return (
            <div className='error'>
                {message}
            </div>
        )
    } else if (type === 'success') {
        return (
            <div className='success'>
                {message}
            </div>
        )
    }
}

export default Notification