const express = require("express");
const morgan = require("morgan");


const path = require("path");
const postgres = require("./modules/pg/postgres");
const routes = require("./routes/routes");
const databaseMiddleware = require("./middlewares/databaseMiddleware");
const customErrorMiddleware = require("./middlewares/customErrorMiddleware");

async function server(mode) {
	const app = express();

	try {
		app.listen(process.env.PORT || 7000, () =>
			console.log(`SERVER READY ${process.env.PORT || 7000}`)
		);

		
		const db = await postgres()
		await databaseMiddleware(db, app);
		app.use(customErrorMiddleware)
	

		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));
		app.use(express.static(path.join(__dirname, "public")));


		if (mode == "dev") {app.use(morgan("dev"));}
	} catch (error) {
		console.log("SERVER ERROR", error);
	} finally {
	routes(app)
	}
}

module.exports = server;
