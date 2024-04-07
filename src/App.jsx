import { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './Redux/store';
import { GetComments } from './Redux/API/comment'; import { AppRouter } from './app/router';
import './css/Prime.css'
import { getAllCurrentUserRequests } from './Redux/API/request';

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