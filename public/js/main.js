const renderNewTransaction = (description, amount) => {
  const transactionListElement = document.getElementById("transaction-list");

  transactionListElement.innerHTML += `
  <div class="row">
    <span>${description}: </span> <span>${amount}Ft</span>
  </div>`;
};

const checkOverSpending = () => {};

//Egyenleg hozzaadasa
const addTransaction = async (event) => {
  event.preventDefault();

  const form = document.getElementById("add-expense-form");
  const description = form.description.value;
  const amount = form.amount.value;
  const category = form.category.value;

  data = {
    description: description,
    amount: amount,
    category: category,
  };

  try {
    const response = await fetch("/user/newExpense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      renderNewTransaction(description, amount);
    } else {
      console.log("Failed to send data.");
    }
  } catch (err) {
    console.error("Hiba lépett fel egy új kiadás hozzáadásánál!");
  }
};

// Egyenleg valtoztatas
const setBudget = async (event) => {
  event.preventDefault();

  const form = document.getElementById("set-budget-form");
  const budget = form.budget.value;

  data = {
    budget: budget,
  };

  try {
    const response = await fetch("/user/setBudget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result.message);
    } else {
      console.log("Failed to send data.");
    }
  } catch (err) {
    console.error("Hiba lepett fel egy új kiadás hozzáadásánál!");
  }
};

const changePassword = async (event) => {
  event.preventDefault();

  const form = document.getElementById("change-password-form");
  const password = form.password.value;
  const newPassword = form.new - password.value;
  const newPasswordAgain = form.new - password - again.value;

  if (newPassword != newPasswordAgain) {
    //! Error
  }
  try {
    const response = await fetch("/user/changePassword", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: newPassword }),
    });
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};

const changeUsername = async (event) => {
  event.preventDefault();

  const form = document.getElementById("change-username-form");
};

menuOpen = false;
const changeMenuState = (menuID) => {
  const element = document.getElementById(menuID);
  const displayState = element.style.display;
  if (!menuOpen && displayState == "none") {
    menuOpen = true;
    element.style.display = "flex";
  } else if (menuOpen && displayState == "flex") {
    menuOpen = false;
    element.style.display = "none";
  }
};
