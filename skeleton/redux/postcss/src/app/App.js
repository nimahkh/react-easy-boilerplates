import React, {useState} from 'react';
import Helmet from "react-helmet";
import {Switch, Route} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import styles from '../styles/styles.pcss';

function Menu(){
    return (
        <div>
            <ul>
                <li>
                    <NavLink exact to={'/'} activeClassName={styles.active}>Homepage</NavLink>
                </li>
                <li>
                    <NavLink activeClassName={styles.active} to={'/about'}>About</NavLink>
                </li>
                <li>
                    <NavLink activeClassName={styles.active} to={'/contact'}>Contact</NavLink>
                </li>
            </ul>
        </div>
    );
}


function Homepage(){
    return (
        <div className={styles.componentBody}>
            <Helmet title="Home Page"/>
            <Menu/>
            <h1>Homepage</h1>
        </div>
    );
}

function About() {
    return (
        <div>
            <Helmet title="About us"/>
            <Menu/>
            <h1>About</h1>
        </div>
    );
}

function Contact(){
    const [counter,setCounter]=useState(0);

    function handleThis(){
        setCounter(counter+1)
    }

    return (
        <div>
            <Helmet title="Contact us"/>
            <Menu/>
            <h1>Contact</h1>
            <div className={classes.clickMe} onClick={()=>handleThis()}>Click on me to count this :{counter}</div>
        </div>
    );
}

function App () {
        return (
            <div>
                <Helmet
                    htmlAttributes={{lang: "en", amp: undefined}} // amp takes no value
                    titleTemplate="%s | React App"
                    titleAttributes={{itemprop: "name", lang: "en"}}
                    meta={[
                        {name: "description", content: "Server side rendering example"},
                        {name: "viewport", content: "width=device-width, initial-scale=1"},
                    ]}
                    link={[{rel: "stylesheet", href: "/dist/styles.css"}]}
                />
                <Switch>
                    <Route exact path='/' component={Homepage}/>
                    <Route path='/about' component={About}/>
                    <Route path='/contact' component={Contact}/>
                </Switch>
            </div>
        );
}

export default App
