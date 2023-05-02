const {Router} = require('express');
const router = Router();
const {getAllPerfiles,getPerfilById,savePerfil,deletePerfilById,updatePerfilById} = require('../controllers/perfil.ctrl');
const {verifyToken,isAdmin,isSuperAdmin} = require('../middlewares/authJwt');

router.get('/',verifyToken,getAllPerfiles)
router.post('/',[verifyToken,isAdmin],savePerfil)
//id
router.get('/:id',verifyToken,getPerfilById)
router.put('/:id',[verifyToken],updatePerfilById)
router.delete('/:id',[verifyToken,isSuperAdmin],deletePerfilById)
module.exports = router;