import {createSlice} from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: "", 
        isAuthenticated: false,
        isCaptain: false
    },
    reducers: {
        setCredentialsUser : (state, action) => {
            const {token, user} = action.payload
            state.user = user
            state.token = token; 
            state.isCaptain = false;
            state.isAuthenticated = true
        },
        setCredentialsCaptain: (state, action) => {
            const {token, captain} = action.payload;
            state.user = captain
            state.token = token
            state.isCaptain = true;
            state.isAuthenticated = true
        },

        logout: (state) => {
            state.user = null
            state.isAuthenticated= false;
        }

    }
})

export const {setCredentialsUser, setCredentialsCaptain, logout} = authSlice.actions
export default authSlice.reducer 