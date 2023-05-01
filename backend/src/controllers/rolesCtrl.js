const pool = require('../database');
const ctrl = {}
ctrl.getAllRoles = async(req,res) =>{
    try {
        const roles = await pool.query('select * from roles');
       //onsole.log(roles);
       res.json(roles.rows);
        
    } catch (error) {
        next(error);
    }
       
}

ctrl.getRolById = async (req,res) => {
    const {id} = req.params;
    try {
        const rol = await pool.query('SELECT * FROM roles where idrol = $1',[id])
        res.json(rol.rows);
    } catch (error) {
        next(error);
    }
}

ctrl.saveRol = async(req,res) =>{
    const {nombre, opc} = req.body;
    try {
        const result = await pool.query('insert into roles(nombre, opc) values($1, $2) RETURNING *', [nombre, opc]);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

ctrl.deleteRolById = async(req,res) => {
    const {id} = req.params;
    try{
        const result = await pool.query('DELETE FROM roles WHERE idrol = $1 RETURNING *',[id])
        res.json(result);
    }catch(error){
        next(error);

    }
}

ctrl.updateRolById = async(req,res) =>{
    const {id} = req.params;
    const {nombre, opc} = req.body;
    try {
        const result = await pool.query('UPDATE roles SET nombre = $1, opc = $2 WHERE idrol = $3',[nombre,opc,id])
        res.json(result.rowCount);
    } catch (error) {
        next(error);
    }
}
module.exports = ctrl;