import { createReducer } from '@reduxjs/toolkit';
import { setOffers,
  changeCity,
  toggleSortMenu,
  changeSortOption,
  changeActivePlaceCardID,
  setAuthorizationStatus,
  setCurrentOffer,
  setOffersLoadingStatus,
  setCurrentOfferLoadingStatus,
  setReviews,
  setReviewsLoadingStatus } from './actions';
import {City} from '../types/city';
import {Offer} from '../types/offer';
import { Review } from '../types/review';
import { CITIES } from '../constants';
import {SORT_OPTIONS, AuthorizationStatuses} from '../constants';

type InitialState = {
  city: City;
  offers: Offer[];
  currentOffer: Offer | null;
  isSortMenuOpened: boolean;
  activeSortOption: string;
  activePlaceCardID: number | null;
  isOffersDataLoading: boolean;
  isCurrentOfferDataLoadint: boolean;
  authorizationStatus: AuthorizationStatuses;
  reviews: Review[];
  isReviewsDataLoading: boolean;
}

const initialState: InitialState = {
  city: CITIES[0],
  offers: [],
  currentOffer: null,
  isSortMenuOpened: false,
  activeSortOption: SORT_OPTIONS[0],
  activePlaceCardID: null,
  isOffersDataLoading: false,
  isCurrentOfferDataLoadint: false,
  authorizationStatus: AuthorizationStatuses.Unknown,
  reviews: [],
  isReviewsDataLoading: false
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(toggleSortMenu, (state) => {
      state.isSortMenuOpened = !state.isSortMenuOpened;
    })
    .addCase(changeSortOption, (state, action) => {
      state.activeSortOption = action.payload;
    })
    .addCase(changeActivePlaceCardID, (state, action) => {
      state.activePlaceCardID = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setCurrentOfferLoadingStatus, (state, action) => {
      state.isCurrentOfferDataLoadint = action.payload;
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setReviewsLoadingStatus, (state, action) => {
      state.isReviewsDataLoading = action.payload;
    });
});

export {reducer};
