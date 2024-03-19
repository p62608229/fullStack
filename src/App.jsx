import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from './Redux/store';
import { GetComments } from './Redux/API/comment'; import { AppRouter } from './app/router';

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