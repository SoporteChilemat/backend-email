import express from 'express';
import cors from 'cors';
import emailRoutes from './routes/email';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

// Configurar CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/v1/mail', emailRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
