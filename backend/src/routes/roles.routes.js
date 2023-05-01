const {Router} = require('express');
const router = Router();
const {getAllRoles, getRolById} = require('../controllers/rolesCtrl');
router.get('/',getAllRoles)

router.get('/:id',getRolById)

module.exports = router;