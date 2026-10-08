import {createSlice} from "@reduxjs/toolkit"
import getCookie from "../../utils/cookie.js"

const authSlice = createSlice({
    name: "Auth",
    initialState: {
        user: null,
        // token: getCookie("token") || null,
        isAuthenticated: false
    },
    reducers: {
        setCredentials : (state, action) => {

        }

    }
})

export const {setCredentials} = authSlice.actions
export default authSlice.reducer 