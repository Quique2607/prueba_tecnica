import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/usuario_routes.js";
import authRoutes from "./routes/auth_routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];

// Configuración de CORS
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Permitir el envío de cookies
};

app.use(cors(corsOptions));

app.use("/api/usuario", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(3000);
console.log("server on port", 3000);
