const express = require('express')
const app = express();
const port = 4000;
const db = require('./config/mongoose')

// for layouts
const expressLayouts = require('express-ejs-layouts')


// for static files
app.use(express.static('./static'))
app.use(expressLayouts);


// extract styles and scripts for layout
app.set('layout extractStyles', true)
app.set("layout extractScripts", true)


// setup views
app.set('view engine', 'ejs');
app.set('views', './views');


app.use('/', require('./routes'))


app.listen(port, (err) => {

    if (err) {
        console.log('error in starting the server');
    }

    console.log(`express server is running on port ${port}`)
})