const initTodosRouter = (router, todosRepository) => {

    router.get('/todos', catchAsyncErrors(async(req, res) => {
        const todos = await todosRepository.getTodos();
        res.send(todos);
    }));

    router.post('/todos', async (req, res) => {
        const id = await todosRepository.createTodo(req.body);
        res.status(201).header("Location", `/todos/${id}`).send();

    });

    router.get('/todos/:todoId', async (req, res) => {
        const todo = await todosRepository.getTodo(req.params.todoId);
        if(!todo) {
            res.status(404).end();
        } else {
            res.send(todo);
        }
    });

    router.delete('/todos/:todoId', async (req, res) => {
        const result = todosRepository.deleteTodo(req.params.todoId);
        if(result) {
            res.end();
        } else {
            res.status(500).end();
        }
    });

    function catchAsyncErrors(fn) {
        return (req, res, next) => {
            const routePromise = fn(req, res, next);
            if (routePromise.catch) {
                routePromise.catch(err => next(err));
            }
        };
    }
}

module.exports = initTodosRouter;
