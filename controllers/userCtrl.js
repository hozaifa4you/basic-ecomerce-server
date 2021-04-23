const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.register = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		const user = await User.findOne({ email });
		// if user already exists check
		if (user)
			return res.status(400).json({ msg: "The email already exists." });

		// password length check
		if (password.length < 6)
			return res
				.status(400)
				.json({ msg: "Password must be greater then of equal 6 chars." });

		// password hash and new user save
		const passwordHash = await bcrypt.hash(password, 12);
		const newUser = new User({ email, name, password: passwordHash });
		await newUser
			.save()
			.then(() => res.status(200).json({ msg: "New User saved" }))
			.catch(err => res.status(400).json({ msg: err.message }));
	} catch (err) {
		return res.status(500).json({ msg: err.massage });
	}
};
