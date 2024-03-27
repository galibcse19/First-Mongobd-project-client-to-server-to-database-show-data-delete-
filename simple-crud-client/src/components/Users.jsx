import {useLoaderData} from 'react-router-dom'; 
const Users = () => {
    const users = useLoaderData();
    return (
        <div>
            <p>Total users: {users.length}</p>
            <div>
                {
                    users.map(user => <p key={user._id}> {user.name} : {user.email}</p>)
                }
            </div>
        </div>
    );
};

export default Users;