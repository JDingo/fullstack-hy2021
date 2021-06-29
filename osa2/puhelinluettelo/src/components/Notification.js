import React from 'react'

const Notification = ({ message, operationSuccess }) => {
    const notificationBarStyle = {
        padding: 10,
        borderStyle: 'solid',
        borderRadius: 4,
        fontSize: 20
    }

    const successStyle = {
        background: 'lightgreen'
    }

    const errorStyle = {
        background: 'red'
    }

    if (message === null) {
        return null
    }
    else if (operationSuccess) {
        let style = {...notificationBarStyle, ...successStyle}

        return (
            <div style={style}>
                {message}
            </div>
        )
    }
    else {
        let style = {...notificationBarStyle, ...errorStyle}

        return (
            <div style={style}>
                {message}
            </div>)
    }
}

export default Notification