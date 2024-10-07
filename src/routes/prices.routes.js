import { Router } from "express";
import criptomonedas from "../models/Currency.js"
import { obtenerValoresCriptomonedas } from "../getPrices.js"

const router = Router();

router.post('/precios', async (req, res) => {
    try {
        // Obtener los valores de las criptomonedas
        const preciosActualizados = await obtenerValoresCriptomonedas();

        // Recorrer cada moneda y crearla en la base de datos
        for (const moneda of preciosActualizados) {
            // Usar 'upsert' para evitar duplicados
            await criptomonedas.upsert({
                    id: moneda.id,
                    currency: moneda.nombre, // Almacenar el símbolo
                    value: moneda.valor // Almacenar el valor
            });
        }

        res.status(201).send("Criptomonedas creadas o actualizadas correctamente");
    } catch (error) {
        console.error("Error al crear criptomonedas en la base de datos:", error);
        res.status(500).send("Error al crear criptomonedas");
    }
});


router.get('/precios', async (req, res)=>{

    try {
        // Obtener los valores de las criptomonedas
        const preciosActualizados = await obtenerValoresCriptomonedas();

        // Recorrer cada moneda y crearla en la base de datos
        for (const moneda of preciosActualizados) {
            // Usar 'upsert' para evitar duplicados
            await criptomonedas.upsert({
                    id: moneda.id,
                    currency: moneda.nombre, // Almacenar el símbolo
                    value: moneda.valor // Almacenar el valor
            });
        }
        const Criptomonedas = await criptomonedas.findAll();
        res.json(Criptomonedas);
    } catch (error) {
        console.error("Error al crear criptomonedas en la base de datos:", error);
        res.status(500).send("Error al crear criptomonedas");
    }

})

// router.get('/precios', async (req, res) => {
//     try {
//         const Criptomonedas = await criptomonedas.findAll();
//         console.log(Criptomonedas);
//         return res.json(Criptomonedas);
//     } catch (err) {
//         console.log(err);
//         return res.sendStatus(500);
//     }
// })

export default router;