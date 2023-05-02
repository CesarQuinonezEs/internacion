const pool = require('../database');
const ctrl = {};
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {tokenKey} = require('../config')

ctrl.loginUser = async (req,res)=>{
try {
    const{correo, passwd} = req.body;
    const users = await pool.query('SELECT * FROM users WHERE correo = $1',[correo]);
    //console.log(users);
    if(users.rowCount < 1){
        return res.status(500).json({error:"Email incorrecto"});
    }
    const isValidPasswd = await bcrypt.compare(passwd, users.rows[0].passwd)
    if(!isValidPasswd){
        return res.status(500).json({error:"Contraseña incorrecta"});
    }
    //jwt
    const token = jwt.sign({id: users.rows[0].id},
        tokenKey.token,{
        expiresIn:3600
    });
    res.header('auth-token', token).json({
        error: null,
        data: {token}
    })
    //res.json(token);
} catch (error) {
    console.log(error);
    res.status(500).json({error})
}
}

ctrl.singup = async(req,res)=>{
        const { nombre, aMaterno, aPaterno, sexo, correo, passwd, rol } = req.body;
        const salt = await bcrypt.genSalt(10);
        try {
            const isEmailExist = await pool.query('SELECT * FROM users WHERE correo =$1', [correo]);
            const hashPasswd = await bcrypt.hash(passwd,salt)
            
            if (isEmailExist.rowCount < 1) {
                if(rol){
                const result = await pool.query('insert into users(nombre, aMaterno,aPaterno,sexo,correo,passwd,rol) values($1, $2,$3,$4,$5,$6,$7) RETURNING *',
                    [nombre, aMaterno, aPaterno, sexo, correo, hashPasswd, rol]);
                    res.json(result);
                }else{
                    console.log("entre al else")
                    const result = await pool.query('insert into users(nombre, aMaterno,aPaterno,sexo,correo,passwd,rol) values($1, $2,$3,$4,$5,$6,1) RETURNING *',
                    [nombre, aMaterno, aPaterno, sexo, correo, hashPasswd]);
                    res.json(result);
                }
                
            } else {
                res.status(401).json({ error: "Email ya resgitrado" })
            }
        } catch (error) {
            res.status(500).json({ error })
        }
    
}

module.exports = ctrl;