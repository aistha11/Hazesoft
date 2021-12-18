import express from "express";
import path from "path";
import cors from "cors";
import { config } from "dotenv";
import apiRouter from "./api.routes";
import createError from "./utils/createError";
import logger from "./middlewares/logger";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import passport from "passport";
import cookieSession from "cookie-session";

// import * as swaggerDoc from './swagger.json';

config();

const app = express();

//Middlewares
app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// For an actual app you should configure this with an experation time, better keys, proxy and secure
app.use(
  cookieSession({
    name: "medicalapp",
    keys: ["key1", "key2"],
  })
);

// app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname, "public")));

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.sendFile("index");
  // res.send({msg: "Hello"});
});

app.use("/api", apiRouter);


const PORT = process.env.PORT || 3000;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Medical Api",
      version: '1.0.0',
      description: "Customer API Documentation",
      contact: {
        name: "Hazesoft",
      },
      servers: ["http://localhost:5000/api"],
    },
    host: "localhost:5000/api",
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Send response when is error
app.use((req, res, next) => {
  next(createError(404, "Page Not Found"));
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    status: "Error",
    message: error.message || "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});
