const {Router} = require('express');
const router = Router();
const {getAllRoles, getRolById, saveRol, deleteRolById,updateRolById} = require('../controllers/rolesCtrl');
router.get('/',getAllRoles)
router.post('/', saveRol)
router.get('/:id',getRolById)
router.delete('/:id',deleteRolById)
router.put('/:id',updateRolById)
module.exports = router;