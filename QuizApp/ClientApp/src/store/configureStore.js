import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
// import * as Quiz from './Quiz';
// import * as Quizzes from './Quizzes';
// import * as Question from './Question';
// import * as Questions from './Questions';
import * as ViewName from './ViewName';
import * as ShowNotification from './ShowNotification';
import * as User from './User';

export default function configureStore (history, initialState) {
  const reducers = {
    // quiz: Quiz.reducer,
    // quizzes: Quizzes.reducer,
    // question: Question.reducer,
    // questions: Questions.reducer,
    viewName: ViewName.reducer,
    isNotificationOpen: ShowNotification.reducer,
    user: User.reducer
  };

  const middleware = [
    thunk,
    routerMiddleware(history)
  ];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
    enhancers.push(window.devToolsExtension());
  }

  const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer
  });

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
}
