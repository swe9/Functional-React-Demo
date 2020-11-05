import { createSlice } from '@reduxjs/toolkit'
import { fetchGiphyItems } from 'Giphy'

export const itemsSlice = createSlice({
    name: 'items',
    initialState: { value: [] },
    reducers: {
        addItems: (state, action) => {
            state.value = state.value.concat(action.payload)
        }
    }
})

export const addItemsAsync = (offset: number) => {
  return async (dispatch: any, getState: any) => {
      try {
          const newItems = await fetchGiphyItems(offset)
          dispatch(addItems(newItems))
      } catch (err) {
          // some error handling...
      }
    }
}

export const selectItems = (state: any) => state.items.value

export const { addItems } = itemsSlice.actions

export default itemsSlice.reducer