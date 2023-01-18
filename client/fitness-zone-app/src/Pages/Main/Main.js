import { Link } from 'react-router-dom';
import './Main.css';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>FITNESS ZONE</header>
      <button className='App-header'>
        <Link to='/add'>ADD NEW</Link>
      </button>
      <button className='App-header'>
        <Link to='/view'>VIEW ALL</Link>
      </button>
    </div>
  );
}

export default App;
