const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");


router.post("/", async (req, res) => {
	try {

		const { error } = validate(req.body);
		console.log("50000")
		if (error) {
			console.error("Validation error:", error); // Додайте цей рядок
			return res.status(400).send({ message: error.details[0].message });
		}

		const user = await User.findOne({ email: req.body.email });
		const user_login = await User.findOne({ login: req.body.login });
		if (user) {
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });
		}
		else if (user_login) {
			return res
				.status(409)
				.send({ message: "User with given login already Exist!" });
		}
		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		console.error("Error in user registration:", error); // Додайте цей рядок
		res.status(500).send({ message: "Internal Server Error" });
	}
});


module.exports = router;