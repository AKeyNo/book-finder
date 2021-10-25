import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { BookSearch } from './pages/BookSearch';
import { BookPage } from './pages/BookPage';
import { Profile } from './pages/Profile';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { TokenProvider } from './services/TokenContext';
import CssBaseline from '@material-ui/core/CssBaseline';
require('dotenv').config();

const theme = createTheme({
  palette: {
    type: 'dark',
  },
});

function App() {
  return (
    <TokenProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar />
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/search'>
              <BookSearch />
            </Route>
            <Route exact path='/about'>
              <About />
            </Route>
            <Route exact path='/book/:id'>
              <BookPage />
            </Route>
            <Route exact path='/profile/:user_id'>
              <Profile />
            </Route>
            <Router path='*'></Router>
          </Switch>
        </Router>
      </ThemeProvider>
    </TokenProvider>
  );
}

export default App;
