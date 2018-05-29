const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const person = process.argv.slice(2)[0];
console.log("Searching for: " + person)

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(`SELECT * FROM famous_people WHERE first_name='${person}' OR last_name='${person}'`, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    var personInfo = result.rows;
    for (var i = 0; i < personInfo.length; i++){
      var data = personInfo[i]; //output: 1
      console.log( i+1 + ':' + data.first_name + ' ' + data.last_name + ', born: ' + data.birthdate.toLocaleDateString())
    }
    client.end();
  });
});