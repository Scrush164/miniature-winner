//DATA

//I would put all the const variables for assetName, assetAmount, and vice versa for liabilities...
//But I will have to put the list up here...

let assets = [];
let liabilities = [];


//Calculation Functions
//Not much tbh
function getNetWorth(assets,liabilites){
 return assets - liabilities;
}

//Action Functions

function saveData() {
    localStorage.setItem('assets', JSON.stringify(assets));
    localStorage.setItem('liabilities', JSON.stringify(liabilities));
}

function loadData() {
    const savedAssets = localStorage.getItem('assets');
    const savedLiabilities = localStorage.getItem('liabilities');
    
    if (savedAssets) assets = JSON.parse(savedAssets);
    if (savedLiabilities) liabilities = JSON.parse(savedLiabilities);
    
    updateDisplay();
}

function  updateLiabilitiesList() {
  const container = document.getElementById('liabilitiesList');

  const html = `
    <ul>
      ${assets.map(item => `<li>${item}</li>`).join('')}
    </ul>
  `;
  container.innerHTML = html;
}

function  updateAssetsList() {
  const container = document.getElementById('assetsList');

  const html = `
    <ul>
      ${assets.map(item => `<li>${item.name} - $${item.amount}</li>`).join('')}
    </ul>
  `;
  container.innerHTML = html;
}



function updateDisplay() {
    updateAssetsList();
    updateLiabilitiesList();
    updateNetWorth();
}



function addAsset() {
    const name = document.getElementById('assetName').value;    // Get user input
    const amount = parseFloat(document.getElementById('assetAmount').value);

    if (!name || isNaN(amount) || amount < 0) {
        alert('Please enter a valid asset name and amount');
        return;
    }

    assets.push({ id: Date.now(), name, amount });  // ← ADD TO LIST
    document.getElementById('assetName').value = '';  // Clear form
    document.getElementById('assetAmount').value = '';
    updateDisplay();
    saveData();
}

function addLiability() {
    const name = document.getElementById('liabilityName').value;
    const amount = parseFloat(document.getElementById('liabilityAmount').value);

  if (!name || isNaN(amount) || amount < 0) {
        alert('Please enter a valid liability name and amount');
        return;
    }
    
    liabilities.push({ id: Date.now(), name, amount });
    updateDisplay();
    saveData();
}


function updateNetWorth() {
    const totalAssets = assets.reduce((sum, a) => sum + a.amount, 0);
    const totalLiabilities = liabilities.reduce((sum, l) => sum + l.amount, 0);
    const netWorth = getNetWorth(totalAssets, totalLiabilities);
    
    const netWorthElement = document.getElementById('netWorth');
    netWorthElement.textContent = '$' + netWorth.toFixed(2);
    netWorthElement.classList.toggle('negative', netWorth < 0);
}
