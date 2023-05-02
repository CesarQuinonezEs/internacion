const pool = require('../database');
const ctrl = {};
const bcrypt = require('bcrypt');

ctrl.getAllPerfiles = async(req,res) =>{
    try {
        const sessions = await pool.query('select * from users');
       res.json(sessions.rows);
        
    } catch (error) {
        res.status(500).json({error})
    }
       
}

ctrl.getPerfilById = async (req,res) => {
    const {id} = req.params;
    try {
        const session = await pool.query('SELECT * FROM users where id = $1',[id])
        res.json(session.rows);
    } catch (error) {
        res.status(500).json({error})
    }
}

ctrl.savePerfil = async(req,res) =>{
    const {nombre, aMaterno,aPaterno,sexo,correo,passwd,rol} = req.body;
    const salt = await bcrypt.genSalt(10);
    
    try {
        const isEmailExist = await pool.query('SELECT * FROM users WHERE correo =$1',[correo]);
        if(isEmailExist.rowCount < 1){
        const hashPasswd = await bcrypt.hash(passwd,salt)
        const result = await pool.query('insert into users(nombre, aMaterno,aPaterno,sexo,correo,passwd,rol) values($1, $2,$3,$4,$5,$6,$7) RETURNING *', 
        [nombre, aMaterno,aPaterno,sexo,correo,hashPasswd,rol]);
        res.json(result);
        }else{
        res.status(500).json({error: "Email ya resgitrado"})
    }
    } catch (error) {
        res.status(500).json(error)
    }
    
}

ctrl.deletePerfilById = async(req,res) => {
    const {id} = req.params;
    try{
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *',[id])
        res.json(result);
    }catch(error){
        res.status(500).json({error})
    }
}

ctrl.updatePerfilById = async(req,res) =>{
    const {id} = req.params;
    const{nombre, aMaterno,aPaterno,sexo} = req.body;
    try {
        const result = await pool.query('UPDATE users SET nombre = $1, aMaterno = $2,aPaterno = $3 ,sexo = $4 WHERE idPerfil = $7',[nombre, aMaterno,aPaterno,sexo,id])
        res.json(result.rowCount);
    } catch (error) {
        res.status(500).json({error})
    }
}
module.exports = ctrl;