import express from "express";
import connect from "../dbConnection.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
const db = connect;
const secretKey = "ahvwddbbibihfdioodinii";

router.post("/register", (req, res, next) => {
  const { name, email, password } = req.body;

  const emailCheckSql = `SELECT * FROM userinfo WHERE LOWER(email) = LOWER(${db.escape(
    req.body.email
  )});`;
  const signupQuery = (pass) =>
    `INSERT INTO userinfo (name, email, password) VALUES ('${name}', ${db.escape(
      email
    )}, ${db.escape(pass)})`;

  db.query(emailCheckSql, (err, result) => {
    if (result.length) {
      return res.status(409).json({
        success: false,
        msg: "This user is already in use!",
      });
    } else {
      // username is available
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            success: false,
            msg: err,
          });
        } else {
          db.query(signupQuery(hash), (err, result) => {
            if (err) {
              throw err;
            }
            return res.status(201).json({
              success: true,
              msg: "The user has been registerd with us!",
            });
          });
        }
      });
    }
  });
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  const emailCheckSql = `SELECT * FROM userinfo WHERE LOWER(email) = LOWER(${db.escape(
    email
  )})`;

  db.query(emailCheckSql, (err, result) => {
    if (!result.length) {
      return res.status(401).json({
        success: false,
        msg: "Email or password is incorrect!",
      });
    }
    // check password
    bcrypt.compare(password, result[0]["password"], (bErr, bResult) => {
      // wrong password
      if (bErr) {
        throw bErr;
      }
      if (bResult) {
        const token = jwt.sign(
          { id: result[0].id },
          secretKey,
          { expiresIn: "1h" }
        );
        return res.status(200).json({
          success: true,
          msg: "Logged in!",
          token,
          user: {
            name: result[0].name,
            email: result[0].email,
            id: result[0].id,
          },
        });
      }
      return res.status(401).json({
        success: false,
        msg: "Username or password is incorrect!",
      });
    });
  });
});

router.post("/get-user", (req, res, next) => {
    const idSql = "SELECT * FROM userinfo where id=?"
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer") ||
    !req.headers.authorization.split(" ")[1]
  ) {
    return res.status(422).json({
      success: false,
      message: "Please provide the token",
    });
  }

  const theToken = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(theToken, secretKey);

  db.query(
    idSql,
    decoded.id,
    function (error, results, fields) {
      if (error) throw error;
      return res.status(200).json({
        success: true,
        user: {
          name: results[0].name,
          email: results[0].email,
          id: results[0].id,
        },
        message: "Fetch Successfully.",
      });
    }
  );
});

export default router;
