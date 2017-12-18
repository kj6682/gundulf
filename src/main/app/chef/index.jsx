import React, { Component } from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import Bootstrap from '../lib/css/bootstrap.css';

console.log(process.env.DEV_SERVER)
render( <App />, document.getElementById('app'))

