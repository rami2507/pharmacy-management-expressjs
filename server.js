const app = require("./app");
const mongoose = require("mongoose");
const port = 3000;

mongoose
  .connect(
    "mongodb+srv://midou123:Midou123@cluster0.0rpa78b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Your Database Has Been Connected Successfuly"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.listen(port, () => {
  console.log("your server is listening on port: 4000");
});
