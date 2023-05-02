const pool = require('../database');
const jwt = require('jsonwebtoken')
const autCtrl = {}

autCtrl.verifyToken = async(req,res,next)=>{
    const token = req.header('auth-token');
    if(!token) return res.status(401).json({error: "Acceso denegado, haz login"});
    try{

        const decoded =jwt.verify(token, process.env.TOKEN_SECRET);
        req.userId = decoded.id;
        const user = await pool.query('SELECT * FROM users WHERE id = $1',[req.userId])
        if(!user) return res.status(404).json({error: "Acceso denegado, no exite el usuario"});
        next()
    }catch(error){
        console.log(error)
        res.status(400).json({error: "token invalido"})
    }
}
autCtrl.isAdmin = async(req,res,next)=>{
    try {
        const rolUser = await pool.query('SELECT rol FROM users WHERE id = $1',[req.userId])
        
        if(!rolUser) return res.status(404).json({error: "Acceso denegado, no exite el usuario"});
        const rolOpc = await pool.query('SELECT opc FROM roles WHERE idRol =$1',[rolUser.rows[0].rol])
        if(!rolOpc) return res.status(404).json({error: "Acceso denegado, rol que tiene el usuario no existe"});
        if(rolOpc.rows[0].opc >= 1){
            next();
            return;
        }
        return res.status(404).json({error: "Acceso denegado, se necesita ser administrador"});
    } catch (error) {
        return res.status(500).send({ message: error });
    }
}
autCtrl.isSuperAdmin = async(req,res,next)=>{
    try {
        const rolUser = await pool.query('SELECT rol FROM users WHERE id = $1',[req.userId])
        if(!rolUser) return res.status(404).json({error: "Acceso denegado, no exite el usuario"});
        const rolOpc = await pool.query('SELECT nombre FROM roles WHERE idRol =$1',[rolUser.rows[0].rol])
        if(!rolOpc) return res.status(404).json({error: "Acceso denegado, rol que tiene el usuario no existe"});
        if(rolOpc.rows[0].nombre == 'super'){
            next();
            return;
        }
        return res.status(404).json({error: "Acceso denegado, se necesita ser el super admin"});
    } catch (error) {
        return res.status(500).send({ message: error });
    }
}
module.exports = autCtrl;