import React, { useEffect } from 'react';
import { Main } from './components/main';
import { Provider, useDispatch } from 'react-redux';
import { store } from './Redux/store';
import { GetComments } from './Redux/API/api';import { AppRouter } from './app/router';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetComments());
  })

  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;