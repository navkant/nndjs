const { MongoClient, ObjectId } = require("mongodb");

const URI = "mongodb://localhost:27017";
const client = new MongoClient(URI);
const dbName = "xharDatabase";

async function main() {
  await client.connect();
  console.log("Connected successfully  to db");
  const db = client.db(dbName);
  const collection = db.collection("collection1");

  const users = await collection.findOne({
    _id: new ObjectId("691f19234785f2b673817b2a"),
  });
  // .toArray();
  console.log(users);

  // inserting a document
  //   const insertResults = await collection.insertOne({
  //     name: "Brock",
  //     city: "Delhi",
  //   });
  //   console.log("insert Results", insertResults);

  // updating a document by id
  //   const filter = { _id: new ObjectId("691f19234785f2b673817b2a") };
  //   const updatedDocument = { $set: { name: "Navkant Tyagi" } };
  //   const updateResult = await collection.updateOne(filter, updatedDocument);
  //   console.log(updateResult);

  // filter documents
  const results = await collection.find({ name: "Navkant Tyagi" }).toArray();
  console.log("results => ", results);

  return "done";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
