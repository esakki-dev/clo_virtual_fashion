import { Provider } from 'react-redux';
import './App.css'
import AppHeader from './components/AppHeader/AppHeader';
import CloItemsListComponent from './components/CloItemsList/CloItemsListComponent';
import FilterComponent from './components/FilterComponent/FilterComponent';
import { store } from './redux-store/store';
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <header>
            <AppHeader />
          </header>

          <main className='app_body_box'>
            <section className='filter_section'>
              <FilterComponent />
            </section>

            <section className='list_section'>
              <CloItemsListComponent />
            </section>
          </main>
        </Provider>
      </BrowserRouter>
    </>
  )
}

export default App
