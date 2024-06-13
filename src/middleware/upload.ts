import multer from 'multer';

// Configuración de almacenamiento en memoria
const storage = multer.memoryStorage();

export const upload = multer({ storage });
