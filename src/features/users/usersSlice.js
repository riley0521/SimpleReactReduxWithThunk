import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: "1", name: "John Doe", email: "johndoe@test.com" },
    { id: "2", name: "Jane Doe", email: "janedoe@test.com" },
];

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        userAdded(state, action) {
            state.push(action.payload);
        },
        userUpdated(state, action) {
            const { id, name, email } = action.payload;
            const existingUser = state.find((user) => user.id === id);
            if(existingUser) {
                existingUser.name = name;
                existingUser.email = email;
            }
        },
        userDeleted(state, action) {
            const { id } = action.payload;
            const existingUser = state.find((user) => user.id === id);
            if(existingUser) {
                return state.filter((user) => user.id !== id);
            }
        }
    },
});

export const { userAdded, userUpdated, userDeleted } = usersSlice.actions;

export default usersSlice.reducer;