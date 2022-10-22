import React, {Component} from 'react';
/* import logo from './logo.svg'; */
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Main from './components/MainComponent';
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/ConfigureStore';

const store =ConfigureStore();

/* hàm render ra toàn bộ ứng dụng này */
class App extends Component {  
  render(){
    return (
      <Provider store={store}>
        <BrowserRouter>
            <div className="App">
                <Main/>
           </div>       
        </BrowserRouter>
      </Provider>
    );

  }
  
}

export default App;
