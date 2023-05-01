const pool = require('../database');
const ctrl = {}
ctrl.getAllRoles = async(req,res) =>{
    try {
        const roles = await pool.query('select * from roles');
       //onsole.log(roles);
       res.json(roles.rows);
        
    } catch (error) {
        console.log(error);
        res.send('Error');
    }
       
}

ctrl.getRolById = async (req,res) => {
    const {id} = req.params;
    try {
        const rol = await pool.query('SELECT * FROM roles where idrol = $1',[id])
        res.json(rol.rows);
    } catch (error) {
        console.log(error);
        res.send('Error');
    }
}

ctrl.saveRol = async(req,res) =>{
    const {nombre, opc} = req.body;
    try {
        const result = await pool.query('insert into roles(nombre, opc) values($1, $2) RETURNING *', [nombre, opc]);
        res.json(result);
    } catch (error) {
        res.send('Error');
    }
}

ctrl.deleteRolById = async(req,res) => {
    const {id} = req.params;
    try{
        const result = await pool.query('DELETE FROM roles WHERE idrol = $1 RETURNING *',[id])
        res.json(result);
    }catch(error){
        res.send('Error');
        console.log(error);

    }
}

ctrl.updateRolById = async(req,res) =>{
    const {id} = req.params;
    const {nombre, opc} = req.body;
    try {
        const result = await pool.query('UPDATE roles SET nombre = $1, opc = $2 WHERE idrol = $3',[nombre,opc,id])
        res.json(result.rowCount);
    } catch (error) {
        console.log(error);
    }
}
module.exports = ctrl;