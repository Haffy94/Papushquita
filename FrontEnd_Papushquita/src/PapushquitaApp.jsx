import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";
import { Provider } from 'react-redux';
import { store } from './store';
import { Navbar } from './components'

export const PapushquitaApp = () => {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}
