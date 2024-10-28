import fs from "fs";
import path from "path";
import __dirname from "../util/rootpath.js";

let users = [];

const readFromTheFile = () => {
  fs.readFile(
    path.join(__dirname, "data", "users.json"),
    "utf-8",
    (err, data) => {
      if (err) {
        console.error("Error reading JSON:", err);
        return;
      }

      const jsonData = JSON.parse(data);

      jsonData.forEach((user) => {
        let newUser = new User(user.username, user.password);

        users.push(newUser);
      });
    }
  );
};

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.expenses = []; //Ide Expenses tipuso objectumok kerulnek
  }

  static load() {
    readFromTheFile();
  }

  static checkLogin(){

  }

  static checkRegister(){
    
  }
}

export default User;
