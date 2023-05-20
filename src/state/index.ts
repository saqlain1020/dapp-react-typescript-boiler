import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import decimalsReducer from "./decimals/decimalsReducer";
import balancesReducer from "./balances/balancesReducer";
import { reducer as notificationsReducer } from "reapop";

const persistedDecimalReducer = persistReducer({ key: "decimals", version: 1, storage }, decimalsReducer);

const rootReducer = combineReducers({
  notifications: notificationsReducer(),
  balances: balancesReducer,
  decimals: persistedDecimalReducer,
});

const store = configureStore({
  // devTools: process.env.NODE_ENV !== "production",
  devTools: true,
  reducer: rootReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

// add custom middleware

export default store;

export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
