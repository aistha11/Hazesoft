import express from 'express';
import path from 'path';
import cors from 'cors';
import { config } from 'dotenv';
import apiRouter from './api.routes';
import createError from './utils/createError';
import logger from './middlewares/logger';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

config();

const app = express();

//Middlewares
app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.sendFile('index');
});

app.use('/api', apiRouter);

const PORT = process.env.PORT || 3000;

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Medical Api',
            description: "Customer API Documentation",
            contact: {
                name: "Hazesoft"
            },
            servers: ["http://localhost:5000"]
        }
    },
    // ['.routes/*.js]
    apis: ["index.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, ()=> {
    console.log(`Server Started on port ${PORT}`)
});