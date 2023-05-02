const {Router} = require('express');
const router = Router();
const {getAllRoles, getRolById, saveRol, deleteRolById,updateRolById} = require('../controllers/rolesCtrl');
const {isSuperAdmin} = require('../middlewares/authJwt');
router.get('/',isSuperAdmin,getAllRoles)
router.post('/', isSuperAdmin,saveRol)
router.get('/:id',isSuperAdmin,getRolById)
router.delete('/:id',isSuperAdmin,deleteRolById)
router.put('/:id',isSuperAdmin,updateRolById)
module.exports = router;