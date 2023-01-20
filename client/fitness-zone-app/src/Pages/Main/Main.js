import { Link } from 'react-router-dom';
import './Main.css';

function App() {
  return (
    <div className='App'>
      <div className='backgroundImageWrapper'></div>
      <div className='appContainer'>
        <header className='appHeader'>FITNESS ZONE</header>
        <button className='mainButton'>
          <Link to='/add'>ADD NEW</Link>
        </button>
        <button className='mainButton'>
          <Link to='/view'>VIEW ALL</Link>
        </button>
      </div>
    </div>
  );
}

export default App;
