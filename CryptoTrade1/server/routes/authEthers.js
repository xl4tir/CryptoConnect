const router = require("express").Router();
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
	try {
		// Перевірка, чи є адреса користувача в запиті
		if (!req.body.userAddress)
			return res.status(400).send({ message: "User address is required" });

		// Знайдемо користувача за адресою, або створимо нового, якщо він не існує
		let user = await User.findOne({ userAddress: req.body.userAddress });
		if (!user) {
			user = new User({ userAddress: req.body.userAddress });
			await user.save();
		}

		// Генерація JWT токена для користувача
		const token = jwt.sign({ _id: user._id }, process.env.JWTPRIVATEKEY, {
			expiresIn: "7d",
		});

		// Відправлення токена на клієнт
		res.status(200).send({ data: token, message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
