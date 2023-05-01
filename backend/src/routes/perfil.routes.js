const {Router} = require('express');
const router = Router();
const {getAllPerfiles,getPerfilById,savePerfil,deletePerfilById,updatePerfilById} = require('../controllers/perfil.ctrl');
router.get('/',getAllPerfiles)
router.post('/',savePerfil)
//id
router.get('/:id',getPerfilById)
router.put('/:id',updatePerfilById)
router.delete('/:id',deletePerfilById)
module.exports = router;