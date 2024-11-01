//menurendszer uzemeltetese!

//Egyenleg hozzaadasa
function addTransaction() {
    
    const inputAmount = prompt("Add meg a hozzáadni kívánt összeget:");
    
   
    if (inputAmount && !isNaN(inputAmount)) {
      const balanceElement = document.getElementById("balanceAmount");

      
      let currentBalance = parseFloat(balanceElement.innerText.replace(/[^0-9.-]+/g,"")) || 0;
      currentBalance += parseFloat(inputAmount);

      
      balanceElement.innerText = currentBalance.toLocaleString("hu-HU", { style: "currency", currency: "HUF" });
    } else {
      alert("Kérlek, adj meg egy érvényes számot!");
    }
}

//Kijelentkezes
function confirmLogout() {
    window.location.href = "/login";
    return true;
  }