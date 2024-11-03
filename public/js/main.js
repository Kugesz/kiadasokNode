//Egyenleg hozzaadasa
const addTransaction = () => {
  const inputAmount = prompt("Add meg a hozzáadni kívánt összeget:");

  if (inputAmount && !isNaN(inputAmount)) {
    const balanceElement = document.getElementById("balanceAmount");

    let currentBalance =
      parseFloat(balanceElement.innerText.replace(/[^0-9.-]+/g, "")) || 0;
    currentBalance += parseFloat(inputAmount);

    balanceElement.innerText = currentBalance.toLocaleString("hu-HU", {
      style: "currency",
      currency: "HUF",
    });
  } else {
    alert("Kérlek, adj meg egy érvényes számot!");
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
