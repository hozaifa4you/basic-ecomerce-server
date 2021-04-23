const { connect, connection } = require("mongoose");

// mongodb connection function
exports.dbConnection = async () => {
	try {
		connect(
			process.env.DB,
			{
				useNewUrlParser: true,
				useCreateIndex: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
			},
			() => {
				console.log(
					`Database connected at: http://${connection.host}:${connection.port}`
				);
			}
		);
	} catch (err) {
		return console.log(err.message);
	}
};
