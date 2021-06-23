import logo from './logo.svg';
import './App.css';

import Main from './pages/Main'

function App() {
  return (
    <div className="App-header" style={{margin:0,padding:0,paddingBottom:'500px'}}>
      <img src={logo} className="App-logo" alt="logo" style={{height: '20vmin'}}/>

      <Main />
      
    </div>
  );
}

export default App;
