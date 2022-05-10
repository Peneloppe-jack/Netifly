import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers.js';
import { devToolsEnhancer } from 'redux-devtools-extension';
import  createStore  from 'redux';

import  Container  from "react-bootstrap/Container";

import { MainView }  from "./components/main-view/main-view";

import './index.scss';

const store = createStore ( devToolsEnhancer(), moviesApp);

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
 render() {
    return (
      <Provider store={store}>
      <Container>
        <MainView />
      </Container>
    </Provider>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);