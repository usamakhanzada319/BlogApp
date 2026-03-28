import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  status: false, //by defult false, user abi authticate nahi h
  userData: null // user  ki information yaha sy ley daye bydefult null q k abi koi data nahi h
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true
      state.userData = action.payload.userData
    },

    logout: state => {
      state.status = false
      state.userData = null
    }
  }
})

export default authSlice.reducer

export const { login, logout } = authSlice.actions
