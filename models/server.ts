import express, { Express }  from 'express'
import cors from 'cors'
import { connectDB } from '../database/config';
import authRoutes from "../routes/auth"
import  ordersRoutes  from "../routes/orders"

export class Server {
    app: Express;
    port: string | number | undefined;
    authPath: string;
    ordersPath: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = '/auth';
        this.ordersPath = '/orders';
        this.conectarDB();

        this.middlewares();

        this.routes();
    }
    
    async conectarDB(): Promise<void> {
        await connectDB();
    }
    
    middlewares(): void {
        this.app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', 'https://integrador-react-peach.vercel.app');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-token');
            res.sendStatus(200);
            next();
        });
        

        this.app.use(express.json());
    }

    routes(): void {
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.ordersPath, ordersRoutes);
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}