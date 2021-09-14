import { useState } from 'react';
import './App.scss';
import Counters from './components/Counters';
import AddCounter from './components/AddCounter';

const mockCounters = [
  {
    namespace: null,
    key: '1ccb732e-b55a-4404-ad3f-0f99c02fe44e',
  },
];

function App() {
  const [counters, setCounters] = useState(mockCounters);

  return (
    <div className="App">
      <header>
        <h1>A Reusable CountAPI React Component</h1>
      </header>
      <div className="app-body">
        <div className="col-1">
          <AddCounter setCounters={setCounters} counters={counters} />
        </div>
        <div className="col-2">
          <Counters counters={counters} />
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
}

export default App;
