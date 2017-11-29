import React from 'react';
const isProduction = process.env.NODE_ENV==='production'
var config = require('./config.json')

export default class Header extends React.Component {

    render() {
        let title = config.title + " " + producerName();
        return (
                <div>
                    <div><img src="img/hop.png" className="logoimg" /></div>
                    <h1>{title}</h1>
                    <p>{config.caption}</p>
                    <p>{config.description}</p>
                </div>
              )
    } 
} 