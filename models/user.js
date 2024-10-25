class User {
  constructor(id, username, password) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.expenses = []; //Ide Expenses tipuso objectumok kerulnek
  }
}

export default User;
