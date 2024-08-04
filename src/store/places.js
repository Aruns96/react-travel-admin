import { createSlice } from "@reduxjs/toolkit";

// const calculateTotalAmount = (expenses) => {
//     return expenses.reduce((sum, expense) => sum + (expense.amount), 0);
//   };
  
const initalplaceState = {
    places: [],
    
    totalAmount :0
   }

const placeSlice=createSlice({
    name:"place",
    initialState:initalplaceState,
    reducers:{
        addPlaces(state,action){
            state.places=(action.payload)
            //state.totalAmount = calculateTotalAmount(state.expenses)
        },
        
          
          editPlaces(state,action){
            const index = state.places.findIndex(place => place.id === action.payload.id);
            if (index !== -1) {
              state.places[index] = action.payload;
              //state.totalAmount = calculateTotalAmount(state.expenses);
              
            }
          },
          removePlaces(state,action){
            state.places = state.places.filter(place => place.id !== action.payload);
            //state.totalAmount = calculateTotalAmount(state.expenses);
          }
         
    }
   
    
})

export const placeActions = placeSlice.actions;
export default placeSlice.reducer;