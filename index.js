const express = require("express");
const app = express();

const cors = require("cors");

const userRoute = require("./routes/userRoute");

const postRoute = require("./routes/postRoute");

app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || 5004;

app.use("/api/user", userRoute);

app.use("/api/post", postRoute);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
