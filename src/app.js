// server.js
import express from 'express';
import mongoose from 'mongoose';
import router from '././routes/routes.js';
import { logger } from './middlewares/logger.js';
import { requestLogger } from '././middlewares/requestLogger.js';
import { errorHandler } from '././middlewares/errorHandler.js';
import { connectionString } from './daos/mongodb/conection.js';
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(logger);
app.use(router);
app.use(errorHandler);

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(error => console.error('Error connecting to database:', error));
