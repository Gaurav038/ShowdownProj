import { useState, useEffect } from 'react';
import { getUsers, deleteUser} from '../Service/api';
import { Link } from 'react-router-dom';
import {Button} from '@material-ui/core'




const AllUsers = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers();
    }, []);


    const getAllUsers = async () => {
        let response = await getUsers();
        setUsers(response.data);
    }

    const DeleteUser = async(id) => {
        const response = await deleteUser(id);
        getAllUsers();
    }

    return (
        <div
            className="home-container container mt-4 animate__animated animate__fadeIn animate__slow"
            style={{marginBottom: '50px'}}
        >
            <div className="row">
                <h1 className="text-center">Employee List</h1>
            </div>
            <div className="row">
                <div className="col">
                    <table
                        className="customers-table table table-dark table-striped table-bordered border-dark mt-4"
                    >
                        <thead className="text-center fs-6">
                            <tr>
                                <th>Email</th>
                                <th>Full Name</th>
                                <th>User Name</th>
                                <th>Delete Button</th>
                            </tr>
                        </thead>
                        <tbody className="text-center fs-6">
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.employee_name}</td>
                                    <td>{user.employee_email}</td>
                                    <td>
                                        {user.employee_Username}
                                    </td>
                                    <td><Button color="primary" variant="contained" style={{marginRight:10}} onClick={() => DeleteUser(user._id)}>Delete user</Button></td>                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default AllUsers;