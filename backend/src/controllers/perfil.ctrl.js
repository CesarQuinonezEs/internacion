const pool = require('../database');
const ctrl = {};

ctrl.getAllPerfiles = async(req,res) =>{
    try {
        const sessions = await pool.query('select * from perfil');
       res.json(sessions.rows);
        
    } catch (error) {
        next(error);
    }
       
}

ctrl.getPerfilById = async (req,res) => {
    const {id} = req.params;
    try {
        const session = await pool.query('SELECT * FROM perfil where idPerfil = $1',[id])
        res.json(session.rows);
    } catch (error) {
        next(error);
    }
}

ctrl.savePerfil = async(req,res) =>{
    const {nombre, aMaterno,aPaterno,sexo,rol,sesion} = req.body;
    try {
        const result = await pool.query('insert into perfil(nombre, aMaterno,aPaterno,sexo,rol,sesion) values($1, $2,$3,$4,$5,$6) RETURNING *', 
        [nombre, aMaterno,aPaterno,sexo,rol,sesion]);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

ctrl.deletePerfilById = async(req,res) => {
    const {id} = req.params;
    try{
        const result = await pool.query('DELETE FROM perfil WHERE idPerfil = $1 RETURNING *',[id])
        res.json(result);
    }catch(error){
        next(error);

    }
}

ctrl.updatePerfilById = async(req,res) =>{
    const {id} = req.params;
    const{nombre, aMaterno,aPaterno,sexo,rol,sesion} = req.body;
    try {
        const result = await pool.query('UPDATE sesion SET nombre = $1, aMaterno = $2,aPaterno = $3 ,sexo = $4,rol =$5,sesion = $6 WHERE idPerfil = $7',[nombre, aMaterno,aPaterno,sexo,rol,sesion,id])
        res.json(result.rowCount);
    } catch (error) {
        next(error);
    }
}
module.exports = ctrl;