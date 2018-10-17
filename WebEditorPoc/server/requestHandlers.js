const mongo = require("mongodb");
const dev = require("./dev");
const constants = require("./constants");
const mongoClient = mongo.MongoClient;

function handle_getArP(response) {
  response.writeHead(200, { "Content-Type": "application/json" });

  const connectedDb = mongoClient.connect(
    dev.mongoDbUrl,
    { useNewUrlParser: true }
  );

  connectedDb
    .then(db => {
      console.log("connected to db");
      const dbObject = db.db(dev.dbName);
      const collectionPElements = dbObject.collection(
        constants.CollectionP_Name
      );
      const cursor = collectionPElements.find({});
      cursor
        .toArray()
        .then(arPElements => {
          console.log(arPElements);
          const json = JSON.stringify(arPElements);
          response.write(json);
          response.end();
        })
        .catch(err => {
          throw err;
        });
      db.close();
    })
    .catch(err => {
      throw err;
    });
}

exports.handle_getArP = handle_getArP;
