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

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT $1::int AS number", ["1"], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows[0].number); //output: 1
    client.end();
  });



// node lookup_people.js Paul
// Searching ...
// Found 2 person(s) by the name 'Paul':
// - 1: Paul Rudd, born '1969-04-06'
// - 2: Paul Giamatti, born '1967-06-06'