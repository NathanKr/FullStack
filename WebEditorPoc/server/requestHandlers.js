const mongo = require("mongodb");
const dev = require("./dev");
const constants = require("./constants");
const mongoClient = mongo.MongoClient;

const getcollectionPElements = db => {
  const dbObject = db.db(dev.dbName);
  const collectionPElements = dbObject.collection(constants.CollectionP_Name);
  return collectionPElements;
};

const getconnectedDb = () => {
  const connectedDb = mongoClient.connect(
    dev.mongoDbUrl,
    { useNewUrlParser: true }
  );
  return connectedDb;
};

// --- expect post with array of p elements as json in request body
function handle_setArP(request, response) {
  response.writeHead(201, { "Content-Type": "application/json" });
  let body = [];

  request
    .on("error", err => {
      throw err;
    })
    .on("data", chunk => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();
      console.log("body : ",body);
      const objBody = JSON.parse(body);
      getconnectedDb()
        .then(db => {
          console.log("connected to db");
          const newValues = { $set: { data: objBody } };

          getcollectionPElements(db)
            .updateOne({}, newValues, { upsert: true }) // -- create if not exist , usefull for empty db
            .then(result => {
              console.log("server updated data to MongoDb");
              console.log(objBody);
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
    });
}

function handle_getArP(response) {
  response.writeHead(200, { "Content-Type": "application/json" });

  getconnectedDb()
    .then(db => {
      console.log("connected to db");

      getcollectionPElements(db)
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

function handle_error(response,error) {
  response.writeHead(500);
  console.log(error);
  response.end();
}

exports.handle_getArP = handle_getArP;
exports.handle_setArP = handle_setArP;
exports.handle_error = handle_error;
