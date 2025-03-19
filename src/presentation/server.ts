import express from 'express'
import path from 'path';

interface Options {
    port: number;
    public_path?: string;
}

export class Server{

    private app = express();
    private readonly port : number;
    private readonly publicPath : string;

    constructor(options: Options){
        this.port = options.port;
        this.publicPath = options.public_path || 'public';

    }

    async start(){

        //* Middleware

        //* Public Folder
        this.app.use(express.static(this.publicPath));

        this.app.get('*', (req, res) => {
            console.log(req.url);
            
            const indexPath = path.join(__dirname, '../../public/index.html');
            res.sendFile(indexPath);

            return;

        })

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }


}


