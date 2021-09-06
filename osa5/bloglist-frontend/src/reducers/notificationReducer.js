let timeoutID = null

export const setNotification = (data) => {
    return async dispatch => {
        if (timeoutID !== null) {
            clearTimeout(timeoutID)
        }

        await dispatch({
            type: 'SET_NOTIFICATION',
            data
        })

        timeoutID = setTimeout(() => {
            dispatch({ type: 'CLEAR_NOTIFICATION' })
        }, 5000)
    }
}

const reducer = (state = { message: null, type: null }, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data
        case 'CLEAR_NOTIFICATION':
            return { message: null, type: null }
        default:
            return state
    }

}

export default reducer