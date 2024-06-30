import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDb } from "./src/Database/connectDb.js";

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 8000;

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`MongoDB connection failed: ${error.message}`);
  });
