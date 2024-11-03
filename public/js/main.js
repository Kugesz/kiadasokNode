//Egyenleg hozzaadasa
const addTransaction = async (event) => {
  event.preventDefault();

  console.log("iras");
  const form = document.getElementById("add-expense-form");
  const description = form.description.value;
  const amount = form.amount.value;
  const category = form.category.value;

  data = {
    description: description,
    amount: amount,
    category: category,
  };

  console.log(data);

  try {
    const response = await fetch("/newExpense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log(response);
    if (response.ok) {
      const result = await response.json();
      console.log(result.message);
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
    const response = await fetch("/setBudget", {
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

//Kijelentkezes
const confirmLogout = () => {
  window.location.href = "/login";
  return true;
};

//Jelszo valtoztatas
const openPasswordModal = () => {
  document.getElementById("passwordModal").style.display = "block";
};

const closePasswordModal = () => {
  document.getElementById("passwordModal").style.display = "none";
};

const changePassword = () => {
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (newPassword !== confirmPassword) {
    alert("A jelszavak nem egyeznek!");
    return false;
  }

  fetch("/change-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: newPassword }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Jelszó sikeresen megváltoztatva!");
        closePasswordModal();
      } else {
        alert("Hiba történt a jelszó megváltoztatása során!");
      }
    })
    .catch((error) => {
      console.error("Hálózati hiba:", error);
      alert("Hiba történt a jelszó megváltoztatása során!");
    });

  return false;
};

window.onclick = function (event) {
  const modal = document.getElementById("passwordModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

const changeMenuState = (menuID) => {
  const element = document.getElementById(menuID);
  const displayState = element.style.display;
  if (displayState == "none") {
    element.style.display = "flex";
  } else {
    element.style.display = "none";
  }
};
