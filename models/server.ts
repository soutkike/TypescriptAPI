import express, { Application } from "express";
import userRoutes from "../routes/usuario"
import cors from "cors";




class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: "/api/usuarios"
    }


    constructor(){
        this.app=express();
        this.port = process.env.PORT || "8000";
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static("public"));

    }

    routes(){
        this.app.use(this.apiPaths.usuarios,userRoutes)
    }

    listen() {
        this.app.listen(this.port, () =>{
            console.log("Servidor corriendo en el puerto: " + this.port)
        })
    }
}

export default Server;