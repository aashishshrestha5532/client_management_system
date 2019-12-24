const express = require('express')

const ClientContoller = require('../controllers/client-controller')

const router = express.Router()

router.post('/registerClient', ClientContoller.registerClient)
router.put('/client/:id', ClientContoller.updateClient)
router.delete('/client/:id', ClientContoller.deleteClient)
router.get('/client/:id', ClientContoller.getClientById)
router.get('/clients', ClientContoller.getAllClient)

module.exports = router