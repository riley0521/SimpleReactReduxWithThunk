import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { userUpdated } from "./usersSlice";

export function EditUser() {
    const { pathname } = useLocation();
    const userId = pathname.replace("/edit-user/", "");
    console.log(userId);

    const user = useSelector((state) => state.users.find((user) => user.id === userId));

    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [error, setError] = useState(null);

    const handleName = (e) => setName(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);

    const handleClick = () => {
        if(name && email) {
            dispatch(
                userUpdated({
                    id: userId,
                    name,
                    email
                })
            );

            setError(null);
            history.push("/");
        } else {
            setError("Fill in all fields.");
        }

        setName("");
        setEmail("");
    };

    return (
        <div className="container">
            <div className="row">
                <h1>Edit User</h1>
            </div>
            <div className="row">
                <div className="three columns">
                    <label for="nameInput">Name</label>
                    <input 
                        className="u-full-width"
                        type="text"
                        placeholder="John Doe"
                        id="nameInput"
                        onChange={handleName}
                        value={name}
                    />
                    <label for="emailInput">Email</label>
                    <input 
                        className="u-full-width"
                        type="email"
                        placeholder="example@test.com"
                        id="emailInput"
                        onChange={handleEmail}
                        value={email}
                    />
                    {error && error}
                    <button onClick={handleClick} className="button-primary">Save User</button>
                </div>
            </div>
        </div>
    );
}