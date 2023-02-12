const { Router } = require("express");
const { getRentas, getRentaById, createRenta, putUpdateRenta, deleteRenta } = require("../controller/renta-controller");

const router = Router()

router.get('/rentas',getRentas)
router.get('/rentas/:id',getRentaById)
router.post('/rentas',createRenta)
router.put('/rentas/:id',putUpdateRenta)
router.delete('/rentas/:id',deleteRenta)

module.exports=router;
