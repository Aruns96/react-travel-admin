import { createSlice } from "@reduxjs/toolkit";
const useridToken = localStorage.getItem("token") || null;
 console.log('idtoken',useridToken)
 const email = localStorage.getItem("email")||null;
  
const initalAuthState = {
    isLoggedIn : !!useridToken,
    idToken: useridToken,
   email:email
    }

const authSlice=createSlice({
    name:"auth",
    initialState:initalAuthState,
    reducers:{
          setLogin(state, action) {
            state.isLoggedIn = action.payload;
          },
          setIdToken(state, action) {
            state.idToken = action.payload;
          },
          
          logOut(state) {
            state.isLoggedIn = false;
            state.idToken = "";
           
            localStorage.removeItem("token");
            
            localStorage.removeItem("email");
           
          },
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;