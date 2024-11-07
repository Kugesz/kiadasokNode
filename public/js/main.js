const renderNewTransaction = (description, amount) => {
  const transactionListElement = document.getElementById("transaction-list");

  transactionListElement.innerHTML += `
  <div class="row">
    <span>${description}: </span> <span>${amount}Ft</span>
  </div>`;
};

const checkOverSpending = async () => {
  try {
    responseBudget = await fetch("/user/getBudget");
    responseSpending = await fetch("/user/getSpending");

    if (responseBudget.ok && responseSpending.ok) {
      const budgetJSON = await responseBudget.json();
      const spendingJSON = await responseSpending.json();

      const budget = budgetJSON.budget;
      const spending = spendingJSON.spending;

      const spendingCircleFillElement =
        document.getElementById("progress-circle");
      const spendingTextElement = document.getElementById("spending-text");
      if (spending > budget) {
        spendingCircleFillElement.style.stroke = "red";
        spendingTextElement.style.fill = "red";
      } else {
        spendingCircleFillElement.style.stroke = "#79e911";
        spendingTextElement.style.fill = "#79e911";
      }
    } else {
      throw new Error("Failed to get data.");
    }
  } catch (err) {
    console.error(err);
  }
};

const updateSpendings = async () => {
  try {
    const response = await fetch("/user/getSpending");

    if (!response.ok) {
      throw new Error("There was an error getting the data!");
    }

    const result = await response.json();

    const spendingElement = document.getElementById("spending-text");
    spendingElement.textContent = result.spending + " Ft";
  } catch (err) {
    console.error("Egy lépett fel a kiadások frissitése alatt!");
  }
};

const updateBalance = (newBalance) => {
  const balanceAmountElement = document.getElementById("balanceAmount");
  balanceAmountElement.innerText = newBalance;
};

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
      checkOverSpending();
      updateSpendings();
      changeMenuState("add-expense-menu");
    } else {
      throw new Error("Error posting data!");
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
      updateBalance(budget);
      checkOverSpending();
      changeMenuState("set-budget-menu");
    } else {
      console.error("Failed to send data.");
    }
  } catch (err) {
    console.error("Hiba lepett fel egy új kiadás hozzáadásánál!");
  }
};

const changePassword = async (event) => {
  event.preventDefault();

  const form = document.getElementById("change-password-form");
  const password = form.elements["password"].value;
  const newPassword = form.elements["new-password"].value;
  const newPasswordAgain = form.elements["new-password-again"].value;

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
      changeMenuState("profile-menu");
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};

// const changeUsername = async (event) => {
//   event.preventDefault();

//   const form = document.getElementById("change-username-form");
//   const password = form.password.value;
//   const newUsername = form.new - username.value;

//   data = {
//     password: password,
//   };

//   try {
//     const response = await fetch("/user/checkPassword", {
//       method: GET,
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     if(!response.ok){
//       throw new Error("There was a problem checking the password!")
//     }

//     const result = await response.json();

//     if(!result.match){
//        change uesername
//     }else{
//        error a jelszo nem jo
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };

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

window.onload = () => {
  checkOverSpending();
};
