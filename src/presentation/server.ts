import express, { Router } from 'express'
import path from 'path';

interface Options {
    port: number;
    public_path?: string;
    routes: Router
}

export class Server{

    private app = express();
    private readonly port : number;
    private readonly publicPath : string;
    private readonly routes: Router;

    constructor(options: Options){
        this.port = options.port;
        this.publicPath = options.public_path || 'public';
        this.routes = options.routes
    }

    async start(){

        //* Middleware
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        //* Public Folder
        this.app.use(express.static(this.publicPath));

        //* Routes
        this.app.use(this.routes);

        // * ayuda SPA
        this.app.get('*', (req, res) => {
            console.log(req.url);
            const indexPath = path.join(__dirname, '../../public/index.html');
            res.sendFile(indexPath);
        })

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }


}


