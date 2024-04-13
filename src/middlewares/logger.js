import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

const logDirectory = path.join(process.cwd(), 'logs');

if (!fs.existsSync(logDirectory)) {
    try {
        fs.mkdirSync(logDirectory);
    } catch (error) {
        const err = new Error(`Error creating log directory: ${error.message}`);
        console.error(err);
    }
}

const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), { flags: 'a' });

export const logger = morgan('combined', { stream: accessLogStream });