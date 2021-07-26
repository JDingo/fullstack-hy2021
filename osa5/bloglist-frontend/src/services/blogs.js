import axios from 'axios'
const baseUrl = '/api/blogs'

let userToken = null

const setToken = newToken => {
    userToken = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async newObject => {
    const config = {
        headers: { Authorization: userToken }
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = async (updateBlog, blogId) => {
    const response = await axios.put(`${baseUrl}/${blogId}`, updateBlog)
    return response.data
}

const deleteBlog = async blogId => {
    const config = {
        headers: { Authorization: userToken }
    }

    const response = await axios.put(`${baseUrl}/${blogId}`, config)
    return response.data
}

export default { getAll, create, setToken, update, deleteBlog }