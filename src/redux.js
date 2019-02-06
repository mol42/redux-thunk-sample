import { applyMiddleware, combineReducers, createStore } from 'redux';

import thunk from 'redux-thunk';

// action generator function, which is basically creates 
// an action object and returns it normally we do not have to
// use action generators but it helps us to craeate a utility like
// mechanism to create actions
export const addRepos = repos => ({
  type: 'ADD_REPOS',
  repos,
});

// action generator function, which is basically creates 
// an action object and returns it normally we do not have to
// use action generators but it helps us to craeate a utility like
// mechanism to create actions
export const clearRepos = () => ({ type: 'CLEAR_REPOS' });

// this function is captured and invoked by redux-thunk
// normally redux does not call functions it only accept
// action objects and it works synhroniously
export const getRepos = username => async dispatch => {
  try {
    const url = `https://api.github.com/users/${username}/repos?sort=updated`;
    const response = await fetch(url);
    const responseBody = await response.json();
    dispatch(addRepos(responseBody));
  } catch (error) {
    console.error(error);
    dispatch(clearRepos());
  }
};

// reducer is basically a function which accepts two
// parameters. first parameter is current state second
// parameter is redux action
export const repos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_REPOS':
      return action.repos;
    case 'CLEAR_REPOS':
      return [];
    default:
      return state;
  }
};

// reducers are combined here, the idea with combining reducers is to
// seperate logically connected data together and in their own file.
// for ex : 
//     - user
//     - colleges
//     - messaging
export const reducers = combineReducers({ repos });

// redux store (global data managemer) is created here.
export function configureStore(initialState = {}) {
  // here is important to enable thunk library we register it
  // as middleware while creating the store
  const store = createStore(reducers, initialState, applyMiddleware(thunk));
  return store;
}

export const store = configureStore();
