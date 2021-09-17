import React from 'react'
import { useSelector } from 'react-redux'

const Users = () => {
    const users = useSelector(store => store.users)

    return (
        <div>
            <h2>Users</h2>
            <table>
                <td /> <td><strong> Blogs Created </strong></td>
                {users.map(user =>
                    <tr key={user.id}>
                        <td>{user.name}</td> <td>{user.blogs.length}</td>
                    </tr>
                )}
            </table>
        </div>
    )
}

export default Users