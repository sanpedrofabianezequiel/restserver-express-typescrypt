import express from 'express';
import userRoutes from '../routes/usuarios.router';
import cors from 'cors';
import db from '../db/connection';

class Server {
    private app:express.Application;
    private port: string;
    private apiPaths = {
        usuarios:'/api/usuarios'
    }
    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection(){
        try {
            await db.authenticate();
            console.log('Database on')
        } catch (error:any|string) {
            throw new Error(error);
        }
    }
    middlewares(){
        //cors
        this.app.use(cors({
        }))

        //Parciar lecturas de BODY
        this.app.use(express.json())

        //carpeta publica
        this.app.use(express.static('public'));
    }
    routes(){
        this.app.use(this.apiPaths.usuarios, userRoutes)
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Servidor corriendo en el puerto  ${this.port}`);
        })
    }
}


export default Server;