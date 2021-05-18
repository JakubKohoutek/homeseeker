import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Navigation from './components/navigation';
import Page from './components/page';

import Home from './routes/home';

import { context, defaultStore } from './context';
import { useLocalStorage } from './utils/useLocalStorage';

import './app.css';

const App: React.FC = () => {
  const [store, setStore] = useLocalStorage('user', defaultStore);

  return (
    <Router>
      <context.Provider value={{ store, setStore }}>
        <Page>
          <Navigation />
          <main className="content">
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </main>
        </Page>
      </context.Provider>
    </Router>
  );
};

export default App;
