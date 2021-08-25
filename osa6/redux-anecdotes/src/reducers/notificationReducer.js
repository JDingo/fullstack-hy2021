let timeoutID = null

export const setNotification = (message, time) => {
    return async dispatch => {
        if (timeoutID !== null) {
            clearTimeout(timeoutID)
        }

        await dispatch({
            type: 'SET_NOTIFICATION',
            data: {
                message
            }
        })

        timeoutID = setTimeout(() => {
            dispatch({ type: 'REMOVE_NOTIFICATION' })
        }, time * 1000)
    }
}

const reducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data.message
        case 'REMOVE_NOTIFICATION':
            return null
        default:
            return state
    }
}

export default reducer