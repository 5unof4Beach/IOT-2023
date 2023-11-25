import { createSlice } from '@reduxjs/toolkit';
import { StepHeartState } from 'src/@types/step-heart';
import { dispatch } from '../store';
import axios from 'src/utils/axios';
import pureAxios from 'axios';

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
      state.isLoading = false;
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

export function getStepHeart(email: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/iot/step-heart?userId=${email}`);
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

export function saveGPTResponse(email: string, prompt: string, key: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await pureAxios.post(
        `https://api.openai.com/v1/chat/completions`,
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        },
        {
          headers: { Authorization: `Bearer ${process.env.CHAT_GPT_API_KEY}` },
        }
      );
      dispatch(updateUser({ [key]: response.data.choices[0].message.content, email }));

      // const content = 'Test'
      // dispatch(updateUser({ [key]: content, email }));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
