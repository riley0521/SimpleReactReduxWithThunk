import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userDeleted, fetchUsers } from "./usersSlice";

export function UserList() {
  const { users } = useSelector((state) => state.users);
  console.log(users);

  const dispatch = useDispatch();

  const handleClick = (id) => {
    dispatch(
      userDeleted({
        id
      })
    );
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Redux CRUD User app</h1>
      </div>
      <div className="row">
        <div className="two columns">
            <button onClick={() => dispatch(fetchUsers())} className="button-primary">Load Users</button>
        </div>
        <div className="two columns">
            <Link to="/add-user">
              <button className="button-primary">Add User</button>
            </Link>
        </div>
      </div>
      <div className="row">
        <table className="u-full-width">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users && users.map((item, i) => (
                  <tr key={i}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>
                      <button onClick={() => handleClick(item.id)}>Delete</button>
                      <Link to={`/edit-user/${item.id}`}>
                        <button>Edit</button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}
