const pool = require('../database');
const ctrl = {};

ctrl.getAllSessions = async(req,res) =>{
    try {
        const sessions = await pool.query('select * from sesion');
       res.json(sessions.rows);
        
    } catch (error) {
        console.log(error);
        res.send('Error');
    }
       
}

ctrl.getSessionById = async (req,res) => {
    const {id} = req.params;
    try {
        const session = await pool.query('SELECT * FROM sesion where id = $1',[id])
        res.json(session.rows);
    } catch (error) {
        console.log(error);
        res.send('Error');
    }
}

ctrl.saveSession = async(req,res) =>{
    const {correo, passwd} = req.body;
    try {
        const result = await pool.query('insert into sesion(correo, passwd) values($1, MD5($2)) RETURNING *', [correo, passwd]);
        res.json(result);
    } catch (error) {
        res.send('Error');
    }
}

ctrl.deleteSessionById = async(req,res) => {
    const {id} = req.params;
    try{
        const result = await pool.query('DELETE FROM sesion WHERE id = $1 RETURNING *',[id])
        res.json(result);
    }catch(error){
        res.send('Error');
        console.log(error);

    }
}

ctrl.updateSessionById = async(req,res) =>{
    const {id} = req.params;
    const {correo, passwd} = req.body;
    try {
        const result = await pool.query('UPDATE sesion SET correo = $1, passwd = MD5($2) WHERE idrol = $3',[correo,passwd,id])
        res.json(result.rowCount);
    } catch (error) {
        console.log(error);
    }
}
module.exports = ctrl;