import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {Helmet} from "react-helmet";
import {createStore} from 'redux'
import counterApp from './reducers'
import {Provider} from 'react-redux'
import Template from './app/template';
import App from './app/App';
import {JssProvider, SheetsRegistry} from 'react-jss'

export default function serverRenderer({clientStats, serverStats}) {
    return (req, res, next) => {

        const sheets = new SheetsRegistry()
        const store = createStore(counterApp)
        const context = {};
        const markup = ReactDOMServer.renderToString(
            <Provider store={store}>
                <JssProvider registry={sheets}>
                    <StaticRouter location={req.url} context={context}>
                        <App/>
                    </StaticRouter>
                </JssProvider>
            </Provider>
        );
        const preloadedState = store.getState()

        const helmet = Helmet.renderStatic();

        res.status(200).send(renderFullPage(markup, helmet, sheets, preloadedState));
    };

    function renderFullPage(markup, helmet, sheets, preloadedState) {
        return `<html ${helmet.htmlAttributes.toString()}>
            <head>
               ${helmet.title.toString()}
               ${helmet.meta.toString()}
               ${helmet.link.toString()}      
               <style type="text/css">${sheets.toString()}</style>    
               <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
            /</g,
            '\\\u003c'
        )}
        </script>    
            </head>
            <body ${helmet.bodyAttributes.toString()}>
               <div id="root">${markup}</div>
               <script src="/dist/client.js" async></script>
            </body>
         </html>
    `
    }
}
