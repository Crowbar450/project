//create the serverrequest
const express = require("express");
const app = express();

//static routing
app.use("/", express.static("./web"));
// app.use(express.static('public'));

//HTML routing
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(
    "C:/Users/asheh/OneDrive/Desktop/college/project/web/html/Index.html"
  );
});

app.get("/html/signup.html", (req, res) => {
  res.sendFile(
    `C:/Users/asheh/OneDrive/Desktop/college/project/web/html/signup.html`
  );
});

app.get("/html/Login.html", (req, res) => {
  res.sendFile(
    `C:/Users/asheh/OneDrive/Desktop/college/project/web/html/Login.html`
  );
});

app.get("/html/page.html", (req, res) => {
  res.sendFile(
    `C:/Users/asheh/OneDrive/Desktop/college/project/web/html/page.html`
  );
  console.log(req);
});

app.get("/html/MyAccount.html", (req, res) => {
  res.sendFile(
    `C:/Users/asheh/OneDrive/Desktop/college/project/web/html/MyAccount.html`
  );
});

app.get("/html/contact-us.html", (req, res) => {
  res.sendFile(
    `C:/Users/asheh/OneDrive/Desktop/college/project/web/html/contact-us.html`
  );
});

app.get("/html/about-us.html", (req, res) => {
  res.sendFile(
    `C:/Users/asheh/OneDrive/Desktop/college/project/web/html/about-us.html`
  );
});

app.get("/css/style.css", (req, res) => {
  res.sendFile(
    `C:/Users/asheh/OneDrive/Desktop/college/project/web/css/style.css`
  );
});

app.get("/media/Email2.png", (req, res) => {
  res.sendFile(
    `C:/Users/asheh/OneDrive/Desktop/college/project/web/media/Email2.png`
  );
});

app.get("/media/Linkin.png", (req, res) => {
  res.sendFile(
    `C:/Users/asheh/OneDrive/Desktop/college/project/web/media/Linkin.png`
  );
});

app.get("/media/twitter.png", (req, res) => {
  res.sendFile(
    `C:/Users/asheh/OneDrive/Desktop/college/project/web/media/twitter.png`
  );
});

app.get("/media/Whatsapp.png", (req, res) => {
  res.sendFile(
    `C:/Users/asheh/OneDrive/Desktop/college/project/web/media/Whatsapp.png`
  );
});

app.get("/server.js", (req, res) => {
  res.sendFile(`C:/Users/asheh/OneDrive/Desktop/college/project/web/server.js`);
});

// signup form
app.post("/signup", (request, response) => {
  const Name = request.body.Name;
  const Email = request.body.Email;
  const username = request.body.username;
  const password = request.body.password;
  addUser(Name, Email, username, password);

  let msg = "<h1>Thank you for signing up</h1>" + Name;
  response.send(msg);
});

//Contact us form
app.post("/Contact", (request, response) => {
  const first_name = request.body.first_name;
  const last_name = request.body.last_name;
  const gender = request.body.gender;
  const mobile = request.body.mobile;
  const date = request.body.dob;
  const email = request.body.email;
  const language = request.body.language;
  const message = request.body.message;
  contactUs(
    first_name,
    last_name,
    gender,
    mobile,
    date,
    email,
    language,
    message
  );

  let msg = "<h1>thank you for contacting us </h1>" + first_name;
  response.send(msg);
});
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");

//MyAccount propertyadd form
app.post("/property", upload.single("propertyIMG"), (request, response) => {
  const owner = request.body.owner;
  const Loaction = request.body.Loaction;
  const Price = request.body.Price;
  const propertyIMG = request.body.propertyIMG;

  console.log(request.owner);
  console.log("salam");

  // const filePath = request.file.path;
  console.log(request.file);

  propertyadd(owner, Loaction, Price, filePath);

  let msg = "<h1>your property has been add. </h1>" + owner;
  response.send(msg);
});
/*
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
app.post("/property", upload.single("propertyIMG"), async (req, res) => {
  try {
    const owner = req.body.owner;
    const location = req.body.location;
    const price = req.body.price;
    const fileData = req.file;

    // Read the file from the server
    const filePath = fileData.path;
    const fileContent = fs.readFileSync(filePath);

    // Create a MySQL connection pool
    const pool = mysql.createPool({
      host: "localhost",
      user: "root",
      password: "root",
      port: "3306",
      database: "test",
    });

    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Perform the database insert
    await connection.query(
      "INSERT INTO property (username, owner, location, price, propertyIMG, num) VALUES (?, ?, ?, ?, ?, (SELECT COUNT(*) FROM Property))",
      [username, owner, location, price, fileContent]
    );
    
    // Release the connection back to the pool
    connection.release();

    console.log("Property and image inserted into the database");
    let msg = "<h1>Your property has been added.</h1>" + owner;
    res.status(200).send(msg);
  } catch (error) {
    console.error(
      "Error inserting property and image into the database:",
      error
    );
    res
      .status(500)
      .send("Error inserting property and image into the database");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
*/
let gusername = "";

//Login form
app.post("/login", (request, response) => {
  const username = request.body.username;
  const password = request.body.password;
  login(username, password);
  console.log(gusername);
  if (gusername === "") {
    console.log("login failed");
  } else {
    response.redirect("/MyAccount");
    let msg = "<h1>welcome </h1>" + username;
    response.send(msg);
  }
});
app.get("/myAccount", (req, res) => {
  console.log("i am in it");
  res.sendFile(
    "C:/Users/asheh/OneDrive/Desktop/college/project/web/html/MyAccount.html"
  );
});
//server
const port = 3000;
app.listen(port, () => {
  console.log("server is running on poet " + port);
});

function addUser(Name, Email, username, password) {
  // Connection
  const mysql = require("mysql2");
  let db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: "3306",
    database: "test",
  });

  db.connect(function (err) {
    if (err) {
      console.error("Error connecting to the database: " + err.stack);
      return;
    }

    console.log("Connected to the database.");

    // SQL command
    let sql = `INSERT INTO users (Name, Email, username, password) VALUES ('${Name}', '${Email}', '${username}', '${password}');`;
    console.log(sql);
    db.query(sql, function (err, result) {
      if (err) {
        console.error("Error executing SQL query: " + err.stack);
        return;
      }

      console.log("1 record has been added.");

      // Close connection
      db.end(function (err) {
        if (err) {
          console.error("Error closing the database connection: " + err.stack);
          return;
        }

        console.log("Connection closed.");
      });
    });
  });
}

function propertyadd(owner, Loaction, Price, filePath) {
  // connection
  const mysql = require("mysql2");
  let db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: "3306",
    database: "test",
  });

  //const db = require("../models");
  //const Image = db.images;

  db.connect(function (err) {
    if (err) {
      console.error("Error connecting to the database: " + err.stack);
      return;
    }

    console.log("Connected to the database.");
    // const filePath = fileData.path;
    const fileContent = fs.readFileSync(filePath);

    // SQL command
    let sql = `INSERT INTO property (username,owner, Loaction, Price, propertyIMG,num) VALUES ('${gusername}','${owner}', '${Loaction}', '${Price}', '${fileContent}',4
    );`;

    db.query(sql, function (err, result) {
      if (err) {
        console.error("Error executing SQL query: " + err.stack);
        return;
      }

      console.log("1 record has been added.");

      // Close connection
      db.end(function (err) {
        if (err) {
          console.error("Error closing the database connection: " + err.stack);
          return;
        }

        console.log("Connection closed.");
      });
    });
  });
}
function login(username, password) {
  // Connection
  const mysql = require("mysql2");
  let db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: "3306",
    database: "test",
  });

  db.connect(function (err) {
    if (err) {
      console.error("Error connecting to the database: " + err.stack);
      return;
    }

    console.log("Connected to the database.");

    // SQL command
    let sql = `SELECT COUNT(*) AS exist FROM users Where (username='${username}' AND password='${password}');
    ;`;

    db.query(sql, function (err, results) {
      const val = results[0].exist;
      if (err) {
        console.error("Error executing SQL query: " + err.stack);
        return;
      }
      if (val === 0) {
        console.log("Invalid username. You can't enter.");
      } else {
        const user = results[0];
        if (val === 1) {
          console.log("Login successful. You can enter.");
          // Perform actions after successful login here
          // the code to enter info page
          gusername = username;
          console.log(gusername);
        } else {
          console.log("Wrong password. You can't enter.");
        }
      }

      // Close connection
      db.end(function (err) {
        if (err) {
          console.error("Error closing the database connection: " + err.stack);
          return;
        }

        console.log("Connection closed.");
      });
    });
  });
}

function contactUs(
  first_name,
  last_name,
  gender,
  mobile,
  date,
  email,
  language,
  message
) {
  // connection
  const mysql = require("mysql2");
  let db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: "3306",
    database: "test",
  });

  db.connect(function (err) {
    if (err) {
      console.error("Error connecting to the database: " + err.stack);
      return;
    }

    console.log("Connected to the database.");

    // SQL command
    let sql = `INSERT INTO contactUs (first_name, last_name, gender, mobile,date,email,language,message) VALUES ('${first_name}', '${last_name}', '${gender}', '${mobile}','${date}' ,'${email}','${language}', '${message}');`;
    db.query(sql, function (err, result) {
      if (err) {
        console.error("Error executing SQL query: " + err.stack);
        return;
      }

      console.log("1 record has been added.");

      // Close connection
      db.end(function (err) {
        if (err) {
          console.error("Error closing the database connection: " + err.stack);
          return;
        }

        console.log("Connection closed.");
      });
    });
  });
}
