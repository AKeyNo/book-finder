import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Home } from './Home';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/books/:id'></Route>
        <Router path='*' />
      </Switch>
    </Router>
  );
}

export default App;
