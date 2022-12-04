import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { Offer } from '../types/offer';
import { Review } from '../types/review';
import { AuthData } from '../types/auth-data';
import { AuthInfo } from '../types/auth-info';
import { APIRoutes, AuthorizationStatuses } from '../constants';
import { setOffers,
  setOffersLoadingStatus,
  setAuthorizationStatus,
  setCurrentOffer,
  setCurrentOfferLoadingStatus,
  setReviews,
  setReviewsLoadingStatus,
  setNearbyOffers,
  setNearbyOffersLoadingStatus } from './actions';
import { saveToken, dropToken } from '../services/token';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersLoadingStatus(true));
    const {data} = await api.get<Offer[]>(APIRoutes.Offers);
    dispatch(setOffersLoadingStatus(false));
    dispatch(setOffers(data));
  }
);

export const fetchCurrentOfferAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/fetchCurrentOffer',
  async (offerID, {dispatch, extra: api}) => {
    dispatch(setCurrentOfferLoadingStatus(true));
    const {data} = await api.get<Offer>(`${APIRoutes.Offers}/${offerID}`);
    dispatch(setCurrentOfferLoadingStatus(false));
    dispatch(setCurrentOffer(data));
  }
);

export const fetchReviewsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'reviews/fetchReviews',
  async (offerID, {dispatch, extra: api}) => {
    dispatch(setReviewsLoadingStatus(true));
    const {data} = await api.get<Review[]>(`${APIRoutes.Comments}/${offerID}`);
    dispatch(setReviewsLoadingStatus(false));
    dispatch(setReviews(data));
  }
);

export const fetchNearbyOffersAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchNearbyOffers',
  async (offerID, {dispatch, extra: api}) => {
    dispatch(setNearbyOffersLoadingStatus(true));
    const {data} = await api.get<Offer[]>(`${APIRoutes.Offers}/${offerID}/nearby`);
    dispatch(setNearbyOffersLoadingStatus(false));
    dispatch(setNearbyOffers(data));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkLogin',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoutes.Login);
      dispatch(setAuthorizationStatus(AuthorizationStatuses.Auth));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatuses.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/Login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<AuthInfo>(APIRoutes.Login, {email, password});
    saveToken(token);
    dispatch(setAuthorizationStatus(AuthorizationStatuses.Auth));
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoutes.Logout);
    dropToken();
    dispatch(setAuthorizationStatus(AuthorizationStatuses.NoAuth));
  },
);
