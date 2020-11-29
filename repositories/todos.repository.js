const short = require("short-uuid");

const createTodosRepository = ({mongoDatabase, collectionName = "todos"}) => {
    const collection = mongoDatabase.collection(collectionName);
    return {
        async createTodo(todo) {
            const id = short.generate();
            const result = await collection.insertOne({ _id: id, ...todo });
            if (result.insertedCount !== 1) {
                throw "Error while saving todo";
            }
            return id;
        },

        async getTodos() {
            const [count, todos] = await Promise.all([
                collection.countDocuments(),
                collection.find().toArray()
            ]);
            return {
                count,
                todos: todos
            };
        },

        async getTodo(id) {
            return collection.findOne({ _id: id }).then(todo => todo);
        },

        async deleteTodo(id) {
            const result = await collection.deleteOne({ _id: id });
            return result.deletedCount === 1;
        }
    };
};

module.exports = createTodosRepository;
