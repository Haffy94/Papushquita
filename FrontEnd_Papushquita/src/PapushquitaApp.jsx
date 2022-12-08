import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";
import { Provider } from 'react-redux';
import { store } from './store';
import { Navbar } from './components'
import { useAuthStore } from "./hooks";


export const PapushquitaApp = () => {

  //const { status } = useAuthStore();
  //console.log(status)
  //console.log(checkAuthToken)


  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}
