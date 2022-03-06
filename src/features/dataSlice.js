
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    objectId:1000,
    apiData: {},
}

export const fetchData = createAsyncThunk('dataThunk', async (objectId) => {

    const response = await fetch(
        
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`
        

    ).then(res => {
        return res.json()
    })
    console.log(response);

    return response;
    
})


export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        increment: (state) => {

            return { objectId: state.objectId + 1 }

        },
        
        decrement: (state) => {
            
            return { objectId: state.objectId - 1 }

        },

        customId: (state, action) => {

            return { objectId: action.payload }
        },

        resetId: (state) => {

            return { objectId: 0 }
        }

    },
    extraReducers: (builder) => {
    
        builder.addCase( fetchData.fulfilled, ( state, action ) => {
            
            state.apiData = action.payload;
        })
    }    

})

export const { increment, decrement, customId, resetId } = dataSlice.actions

export default dataSlice.reducer
