import { createSlice } from '@reduxjs/toolkit';
import { StepHeartState } from 'src/@types/step-heart';
import { dispatch } from '../store';
import axios from 'src/utils/axios';

const initialState: StepHeartState = {
  isLoading: false,
  error: null,
  stepHeart: [],
  userData: null,
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

    updateUserSuccess(state, action) {
      state.isLoading = false;
      state.userData = action.payload;
    },

    getUserSuccess(state, action) {
      state.isLoading = false;
      state.userData = action.payload;
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
      const response = await axios.get('/api/iot/step-heart');
      dispatch(slice.actions.getStepHeartSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateUser(data: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put('/api/iot/user', data);
      dispatch(slice.actions.updateUserSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getUser(email: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/iot/user?email=${email}`);
      dispatch(slice.actions.getUserSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
