import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userReducer from './slices/userSlice';
import rootSaga from './sagas/rootSaga';
import friendsReducer from './slices/friendsSlice';
import treadReducer from './slices/treadsSlice';
import commentsReducer from './slices/commentsSlice';
import postsReducer from './slices/postsSlice'

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    user: userReducer,
    friends: friendsReducer,
    tread: treadReducer,
    comment: commentsReducer,
    post: postsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
