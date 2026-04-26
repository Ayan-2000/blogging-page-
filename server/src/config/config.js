import dotenv from 'dotenv';

dotenv.config();

if (!process.env.PORT) {
    throw new Error('PORT is not defined in .env file');
}

export const config = {
    port: process.env.PORT
};
