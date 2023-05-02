const express = require('express')
const morgan = require('morgan');
const app = express();
const port = 4000;
const rolesRoute = require('./routes/roles.routes');
const perfilRoute = require('./routes/perfil.routes');
const authRote = require('./routes/auth.routes')
//middlewares
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use('/api/roles',rolesRoute);
app.use('/api/users',perfilRoute);
app.use(authRote)
//error
app.use((err,req,res,next)=>{
    return res.json({
        "menssage": err.menssage
    })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))