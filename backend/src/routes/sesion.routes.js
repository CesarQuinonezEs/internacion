const {Router} = require('express');
const router = Router();
const {getAllSessions,getSessionById,deleteSessionById,saveSession,updateSessionById} = require('../controllers/sesion.ctrl');
router.get('/',getAllSessions)
router.post('/',saveSession)
//id
router.get('/:id',getSessionById)
router.put('/:id',updateSessionById)
router.delete('/:id',deleteSessionById)
module.exports = router;