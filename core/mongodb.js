const MongoClient = require("mongodb").MongoClient;

const createMongoDatabaseConnection = async (uri, databaseName = "todosdb") => {
    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    return client.db(databaseName);
};

module.exports = createMongoDatabaseConnection;
