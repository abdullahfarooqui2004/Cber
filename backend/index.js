import app from "./src/app.js";
import connectDb from "./src/config/db.config.js";

const PORT = process.env.PORT;

connectDb();
app.listen(PORT, () => {
	console.log("Server started");
});
