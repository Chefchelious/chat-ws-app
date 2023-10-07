import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IGlobalError,
  ILoginMutation,
  IRegisterMutation,
  IRegisterResponse,
  IValidationError,
} from '../../types';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';
import { RootState } from '../../app/store';
import { unsetUser } from './usersSlice';

export const register = createAsyncThunk<
  IRegisterResponse,
  IRegisterMutation,
  { rejectValue: IValidationError }
>('users/register', async (registerMutation, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<IRegisterResponse>('/users', registerMutation);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const login = createAsyncThunk<
  IRegisterResponse,
  ILoginMutation,
  { rejectValue: IGlobalError }
>('users/login', async (loginMutation, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<IRegisterResponse>('/users/sessions', loginMutation);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const logout = createAsyncThunk<void, undefined, { state: RootState }>(
  'users/logout',
  async (_, { getState, dispatch }) => {
    const token = getState().users.user?.token;

    await axiosApi.delete('/users/sessions', {
      headers: { Authorization: token },
    });

    dispatch(unsetUser());
  },
);
