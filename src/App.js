import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Home } from './Home';
import { BookPage } from './BookPage';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
require('dotenv').config();

const theme = createTheme({
  palette: {
    type: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/book/:id'>
            <BookPage />
          </Route>
          <Router path='*'></Router>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
