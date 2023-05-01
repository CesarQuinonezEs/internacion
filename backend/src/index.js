const express = require('express')
const morgan = require('morgan');
const app = express();
const port = 4000;
const rolesRoute = require('./routes/roles.routes');

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use('/api/roles',rolesRoute);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))