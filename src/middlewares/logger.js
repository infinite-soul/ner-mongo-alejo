import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

const logDirectory = path.join(process.cwd(), 'logs');


if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}


const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), { flags: 'a' });


export const logger = morgan('combined', { stream: accessLogStream });