import { Router } from 'express';
import { sendEmail } from '../controllers/emailController';
import { upload } from '../middleware/upload';

const router = Router();

// Permite múltiples archivos adjuntos con el nombre de campo 'attachments'
router.post('/send', upload.array('attachments', 10), sendEmail);

export default router;
