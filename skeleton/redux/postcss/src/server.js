import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {Helmet} from "react-helmet";
import {createStore} from 'redux'
import counterApp from './reducers'
import {Provider} from 'react-redux'
import Template from './app/template';
import App from './app/App';

export default function serverRenderer() {
    return (req, res, next) => {

        const store = createStore(counterApp)
        const context = {};
        const markup = ReactDOMServer.renderToString(
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    <App/>
                </StaticRouter>
            </Provider>
        );
        const preloadedState = store.getState()

        const helmet = Helmet.renderStatic();

        res.status(200).send(renderFullPage(markup, helmet, preloadedState));
    };

    function renderFullPage(markup, helmet, preloadedState) {
        return `<html ${helmet.htmlAttributes.toString()}>
            <head>
               ${helmet.title.toString()}
               ${helmet.meta.toString()}
               ${helmet.link.toString()}      

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
