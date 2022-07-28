import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    return users;
});

const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        loading: false
    },
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
    extraReducers: {
        [fetchUsers.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = [...state.users, ...action.payload];
        },
        [fetchUsers.rejected]: (state, action) => {
            state.loading = false;
        }
    },
});

export const { userAdded, userUpdated, userDeleted } = usersSlice.actions;

export default usersSlice.reducer;