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

      collectionPElements
        .findOne({})
        .then(document => {
          console.log(document);
          const json = JSON.stringify(document.data);
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