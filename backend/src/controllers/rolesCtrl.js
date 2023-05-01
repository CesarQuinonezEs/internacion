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

module.exports = ctrl;