import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const mongoConnect = async () => {
    try {
        console.log('Conectando ao banco...');
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log('Conectado!!!')
    } catch(error) {
        console.log("Erro encontrado: ", error);
    }
}