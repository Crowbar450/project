function valu() {
  const username = document.getElementsByName("username")[0].value.trim();
  const password = document.getElementsByName("password")[0].value.trim();

  login(username, password);
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
    let sql = `SELECT COUNT(*)  FROM users Where (username='${username}' AND password='${password}');
    ;`;

    db.query(sql, function (err, results) {
      if (err) {
        console.error("Error executing SQL query: " + err.stack);
        return;
      }

      if (results === 0) {
        alert("Invalid username. You can't enter.");
      } else {
        const user = results[0];
        if (results === 1) {
          console.log("Login successful. You can enter.");
          // Perform actions after successful login here

          // the code to enter info page
        } else {
          alert("Wrong password. You can't enter.");
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
