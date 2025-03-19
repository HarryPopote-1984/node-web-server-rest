import { Request, Response } from 'express'

const todos = [
    { id: 1, text: 'buy milk', createdAt: new Date() },
    { id: 2, text: 'buy bread', createdAt: null },
    { id: 3, text: 'buy butter', createdAt: new Date() },
]

export class TodosController{

    //* DI
    constructor(){}

    public getTodos = (req: Request, res: Response) => {
        res.json(todos)
    }

    public getTodoById = (req: Request, res: Response) => {

        const id = req.params.id

        if(isNaN(+id)){
            return res.status(400).json({ message: 'Invalid id' })
        }

        const todo = todos.find(todo => todo.id === +id)

        if(!todo){
            return res.status(404).json({ message: 'Todo not found' })
        }

        res.json(todo)

    }

    public createTodo = (req: Request, res: Response) => {

        const {text} = req.body;

        console.log(text);

        if(!text){
            res.status(400).json({error: 'Text is required'})
        }

        const todo = {
            id: todos.length +1 ,
            text : text,
            createdAt: new Date()
        }

        todos.push(todo)

        res.status(201).json({message: `Todo created with id ${todo.id}`});

    }

    public updateTodo = (req: Request, res: Response) => {

        const id = req.params.id;
        if(isNaN(+id)) return res.status(400).json({Error: `Id is not a number ${id}`});

        const todo = todos.find(todo => todo.id === +id);
        if(!todo) return res.status(404).json({Error: `Todo with id ${id} not found`});

        const {text} = req.body;
        if(!text) return res.status(400).json({Error: `Text is required`});

        todo.text = text;

        res.json(todo);

    }

    public deleteTodo = (req:Request, res: Response) => {
        const id = +req.params.id;
    
        const todo = todos.find(todo => todo.id === id );
        if ( !todo ) return res.status(404).json({ error: `Todo with id ${ id } not found` });
    
        todos.splice( todos.indexOf(todo), 1 );
        res.json( todo );
    
      }

}