import { Router } from "express";
import { conversorDeMontos } from "../amountConverter.js";

const router = Router();


router.post('/conversor', async (req, res) => {
    const { monto, moneda } = req.body;
    
    try {
        const resultados = await conversorDeMontos(monto, moneda);
        res.json(resultados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al convertir las monedas' });
    }
});

export default router;