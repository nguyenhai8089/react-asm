import React, {Component} from 'react';
/* import logo from './logo.svg'; */
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Main from './components/MainComponent';


/* hàm render ra toàn bộ ứng dụng này */
class App extends Component {  
  render(){
    return (
        <BrowserRouter>
            <div className="App">
                <Main/>
           </div>       
        </BrowserRouter>
      
    );

  }
  
}

export default App;
