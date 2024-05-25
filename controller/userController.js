//db

const dbConnection = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function Register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;

  if (!username || !firstname || !lastname || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please enter all required fields" });
  }
  try {
    const [user] = await dbConnection.query(
      "select username, userid, password from users where username = ? or email = ?",
      [username, email]
    );
    ////Elias codes optional
    //    const user = await dbConnection.query("select * from users where username = ? or email = ?",[username, email])
    //    if(user){
    //     return res.status(400).json({msg:"user already existed"})
    //    }
    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "user already registered" });
    }
    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "password must be at least 8 character" });
    }

    //password encryption
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    await dbConnection.query(
      "INSERT INTO users (username, firstname, lastname, email, password) VALUES(?,?,?,?,?)",
      [username, firstname, lastname, email, hashedPassword]
    );
    return res.status(StatusCodes.CREATED).json({ msg: "user created" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong try again later" });
  }
}

async function Login(req, res) {
  //get the two constraints from the user by destructuring

  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please fill all required fields" });
  }

  try {
    //check the email
    const [user] = await dbConnection.query(
      "select username, userid, password from users where email = ?",
      [email]
    );
    if (user.length == 0) {
      // return res.status(StatusCodes.BAD_REQUEST).json({user})
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid request" });
    }

    //Check password compare password
    const isMach = await bcrypt.compare(password, user[0].password);
    if (!isMach) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid credential" });
    }

    // return res
    //   .status(StatusCodes.ACCEPTED)
    //   .json({ msg: "hello you are loged in" });

    //JSON WEB TOKEN
    const username = user[0].username;
    const userid = user[0].userid;

    const token = jwt.sign({ username, userid }, process.env.JWT_SECRETE, {
      expiresIn: "1d",
    });
    return res
      .status(StatusCodes.OK)
      .json({ msg: "successfuly loged in", token });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong please try again" });
  }
}

//auth midlware

async function Check(req, res) {
  const username = req.user.username;
  const userid = req.user.userid;

  res.status(StatusCodes.OK).json({ msg: "valid user", username, userid });
}

module.exports = { Register, Login, Check };

// const dbConnection = require("../db/dbConfig");
// const { StatusCodes } = require("http-status-codes");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// async function Register(req, res) {
//   const { username, firstname, lastname, email, password } = req.body;
//   if (!username || !firstname || !lastname || !email || !password) {
//     return res
//       .status(StatusCodes.BAD_REQUEST)
//       .json({ msg: "please enter all required filds" });
//   }
//   try {
//     const [user] = await dbConnection.query(
//       "select username, userid, password from users where username = ? or email = ?",
//       [username, email]
//     );
//     if (user.length > 0) {
//       return res
//         .status(StatusCodes.BAD_REQUEST)
//         .json({ msg: "user are already registered" });
//     }
//     if (password.length < 8) {
//       return res
//         .status(StatusCodes.BAD_REQUEST)
//         .json({ msg: "password must be atleast 8 character" });
//     }

//     //password encryption
//     const salt = await bcrypt.genSalt();
//     const hashedPassword = await bcrypt.hash(password, salt);

//     await dbConnection.query(
//       "INSERT INTO users(username, firstname, lastname, email, password)  VALUES(?,?,?,?,?)",
//       [username, firstname, lastname, email, password]
//     );

//     return res.status(StatusCodes.CREATED).json({ msg: "user created" });
//   } catch (error) {
//     return res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ msg: "something went wrong try again later" });
//   }
// }

// async function Login(req, res) {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(StatusCodes.BAD_REQUEST).json({ msg: "please fill all required filds" });
    
//     try {
//       const [user] = await dbConnection.query(
//         "select username, userid, password from users where email = ?",
//         [email]
//       );
     
//       if (user.length == 0) {
//         return res.status(StatusCodes.BAD_REQUEST).json({ msg: "invalid request" });
//       }
//       //compare password
//       const isMach = await bcrypt.compare(password, user[0].password);
//       if (!isMach) {
//         return res
//           .status(StatusCodes.BAD_REQUEST)
//           .json({ msg: "invalid credential" });
//       }
//       //token generate
//       const username = user[0].username;
//       const userid = user[0].userid;
//       const token = jwt.sign(
//         { username, userid }, process.env.JWT_SECRETE,
//         { expiresIn: "1d" ,}
//       );
//       return res.status(StatusCodes.OK).json({ msg: "succesful login" , token});
//     } catch (error) {
//       return res
//         .status(StatusCodes.INTERNAL_SERVER_ERROR)
//         .json({ msg: "something went wrong please try again" });
//     }
//   }
// }
// async function Check(req, res) {
//   const username = req.user.username;
//   const userid = req.user.userid;

//   res.status(StatusCodes.OK).json({ msg: "valid user", username, userid });
// }
// module.exports = {Register, Login, Check}
