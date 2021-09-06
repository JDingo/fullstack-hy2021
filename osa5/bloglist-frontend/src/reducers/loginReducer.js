import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

export const checkLocalLogin = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        blogService.setToken(user.token)

        return {
            type: 'CHECK_LOCAL_LOGIN',
            data: user
        }
    } else {
        return {
            type: 'LOGOUT'
        }
    }
}

export const login = (username, password) => {
    return async dispatch => {
        try {
            const user = await loginService.login({
                username, password
            })

            window.localStorage.setItem(
                'loggedUser', JSON.stringify(user)
            )

            blogService.setToken(user.token)
            dispatch({
                type: 'LOGIN',
                data: user
            })
        } catch (e) {
            dispatch(setNotification({ message: 'Wrong credentials', type: 'error' }))
        }

    }
}

export const logout = () => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)

    return {
        type: 'LOGOUT'
    }
}

const reducer = (state = null, action) => {
    switch (action.type) {
        case 'CHECK_LOCAL_LOGIN': {
            return action.data
        }
        case 'LOGIN':
            return action.data
        case 'LOGOUT':
            return null
        default:
            return state
    }

}

export default reducer