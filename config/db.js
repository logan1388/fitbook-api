const config = require('config');
const mongoDbUrl = config.get('mongoURI');
const MongoClient = require('mongodb').MongoClient;

let _db;

const initDb = callback => {
    if (_db) {
        console.log('Db is already initialized!');
        return callback(null, _db);
    }
    MongoClient.connect(mongoDbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(client => {
            _db = client.db();
            callback(null, _db);
        })
        .catch(err => {
            callback(err)
        })
};

const getDb = () => {
    if (!_db) {
        throw Error('Database not initialized');
    }
    return _db;
}

module.exports = {
    initDb,
    getDb
}