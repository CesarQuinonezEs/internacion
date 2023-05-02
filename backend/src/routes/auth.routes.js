const {Router} = require('express');
const router = Router();
const{savePerfil} = require('../controllers/perfil.ctrl')
const { loginUser,singup } = require('../controllers/auth.ctrl')

router.post('/login',loginUser)
router.post('/singup',singup)
module.exports = router;