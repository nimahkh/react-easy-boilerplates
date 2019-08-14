import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {Helmet} from "react-helmet";
import {createStore} from 'redux'
import counterApp from './reducers'
import {Provider} from 'react-redux'
import App from './app/App';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles';
import theme from './theme';

export default function serverRenderer() {
    const sheets = new ServerStyleSheets();
    return (req, res, next) => {

        const store = createStore(counterApp)
        const context = {};
        const markup = ReactDOMServer.renderToString(
          sheets.collect(
          <ThemeProvider theme={theme}>
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    <App/>
                </StaticRouter>
            </Provider>
          </ThemeProvider>)
        );
        const preloadedState = store.getState()

        const helmet = Helmet.renderStatic();

        // Grab the CSS from our sheets.
        const css = sheets.toString();

        res.status(200).send(renderFullPage(markup, helmet, css, preloadedState));
    };

    function renderFullPage(markup, helmet, css, preloadedState) {
        return `<html ${helmet.htmlAttributes.toString()}>
            <head>
               ${helmet.title.toString()}
               ${helmet.meta.toString()}
               ${helmet.link.toString()}
            <style id="jss-server-side">${css}</style>
            </head>
            <body ${helmet.bodyAttributes.toString()}>
               <div id="root">${markup}</div>
               <script src="/dist/client.js" async></script>
            </body>
         </html>
    `
    }
}
