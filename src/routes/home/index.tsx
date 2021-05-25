import React from 'react';

import Advertisements from '../../components/advertisements';

import './home.css';

const App: React.FunctionComponent = () => {
  return (
    <div className="home">
      <header>
        <h1>HomeSeeker</h1>
        <p>Application to track and trace offers for flats and houses.</p>
      </header>
      <section>
        <Advertisements />
      </section>
    </div>
  );
};

export default App;
