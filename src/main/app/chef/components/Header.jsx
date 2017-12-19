import React from 'react';
const isProduction = process.env.NODE_ENV==='production'
var config = require('./config.json')

var producer;
if(!process.env.DEV_SERVER)
    producer = window.proxy.producer;
else
    producer = 'four';


export default class Header extends React.Component {

    render() {
        let title = config.title + " " + producer;
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