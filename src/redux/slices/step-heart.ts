import { createSlice } from '@reduxjs/toolkit';
import { StepHeartState } from 'src/@types/step-heart';
import { dispatch } from '../store';
import Axios from 'axios';

const initialState: StepHeartState = {
  isLoading: false,
  error: null,
  stepHeart: [],
};

const slice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET stepHeart SSUCCESS
    getStepHeartSuccess(state, action) {
      const stepHeart = action.payload;
      state.stepHeart = stepHeart;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
// export const { getStepHeartSuccess } = slice.actions;

// ----------------------------------------------------------------------

export function getStepHeart() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await Axios.get('http://localhost:8081/api/iot/step-heart');
      dispatch(slice.actions.getStepHeartSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
