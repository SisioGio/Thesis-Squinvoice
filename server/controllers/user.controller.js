const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const { sequelize } = require("../models");
const config = require("../config/auth.config");

var bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
const { role: Role, refreshToken: RefreshToken } = db;
const jwt = require("jsonwebtoken");
const { DB } = require("../config/db.config");
const { urlencoded } = require("body-parser");

exports.isAuthenticated = async (req, res) => {
  let token = req.headers["x-access-token"];

  try {
    const user = await User.findOne({
      where: { token: token },

      include: [{ model: db.company }],
    });
    if (!user) {
      return res.status(403);
    }

    return res.status(200).send(user);
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};
// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      return res.status(401).send({ message: "Invalid credentials" });
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: config.jwtExpiration,
      });

      let refreshToken = await RefreshToken.createToken(user);

      await User.update(
        { token: token, refreshToken: refreshToken },
        { where: { id: user.id } }
      );

      res.status(200).send({
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        accessToken: token,
        refreshToken: refreshToken,
        companies: await user.getCompanies(),
      });
    } else {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid credentials",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// Register
exports.register = async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;

    if (!(name && surname && email && password)) {
      return res.status(400).send({ message: "All fields are mandatory" });
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      surname,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    return res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  try {
    const { id, name, surname, email, password } = req.body;

    if (!(id && name && surname && email)) {
      return res.status(400).send({ message: "All fields are mandatory" });
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);
    console.log(req.body);
    const user = await User.update(
      {
        name: name,
        surname: surname,
        email: email.toLowerCase(),
        password: encryptedPassword,
      },
      { where: { id: req.body.id } }
    );

    const output = await User.findByPk(id);

    return res.send(output);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

// Retrieve all Users from the database.
exports.findAll = async (req, res) => {
  await User.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    });
};
