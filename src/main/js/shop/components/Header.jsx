import React from 'react';
const isProduction = process.env.NODE_ENV==='production'
var config = require('../config.json')
var header = (isProduction)? config.prod.header : config.dev.header

export default class Header extends React.Component {

    render() {
        return (
                <div>
                    <div className="logo"><img src="img/hop.png" className="logoimg" /></div>
                    <h1>{header.title}</h1>
                    <p>{header.caption}</p>
                    <p className="smalltext">{header.description}</p>
                </div>
              )
    } 
} 