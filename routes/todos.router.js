const promclient = require('prom-client')
const url = require('url')
const promregister = new promclient.Registry()
promregister.setDefaultLabels({
    app: 'todos-app'
})
promclient.collectDefaultMetrics({ promregister })

const httpRequestDurationMicroseconds = new promclient.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in microseconds',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
})
// Register the histogram
promregister.registerMetric(httpRequestDurationMicroseconds)

const initTodosRouter = (router, todosRepository) => {

    router.get('/metrics', catchAsyncErrors(async(req, res) => {
        console.log(promregister.metrics());
        console.log(promregister.contentType);
        res.setHeader('Content-Type', promregister.contentType)
        res.end(promregister.metrics())
    }));

    router.get('/todos', catchAsyncErrors(async(req, res) => {
        const route = url.parse(req.url).pathname
        const end = httpRequestDurationMicroseconds.startTimer()
        const todos = await todosRepository.getTodos();
        res.send(todos);
        end({ route, code: res.statusCode, method: req.method })
    }));

    router.post('/todos', async (req, res) => {
        const route = url.parse(req.url).pathname
        const end = httpRequestDurationMicroseconds.startTimer()
        const id = await todosRepository.createTodo(req.body);
        res.status(201).header("Location", `/todos/${id}`).send();
        end({ route, code: res.statusCode, method: req.method })
    });

    router.get('/todos/:todoId', async (req, res) => {
        const route = url.parse(req.url).pathname
        const end = httpRequestDurationMicroseconds.startTimer()
        const todo = await todosRepository.getTodo(req.params.todoId);
        if(!todo) {
            res.status(404).end();
        } else {
            res.send(todo);
        }
        end({ route, code: res.statusCode, method: req.method })
    });

    router.delete('/todos/:todoId', async (req, res) => {
        const route = url.parse(req.url).pathname
        const end = httpRequestDurationMicroseconds.startTimer()
        const result = todosRepository.deleteTodo(req.params.todoId);
        if(result) {
            res.end();
        } else {
            res.status(500).end();
        }
        end({ route, code: res.statusCode, method: req.method })
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
