import express from 'express';
import routes from './routes/index.route.js';
import dotenv from 'dotenv';
import { connectToMongo } from './configs/mongodb.config.js';

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());

app.use("/", routes);

const startServer = async () => {
    try {
        await connectToMongo();
        app.listen(port, () => console.log('Servidor iniciado'));
    } catch (error) {
        console.error("Error al iniciar el servidor:", error);  
    }
}

startServer();