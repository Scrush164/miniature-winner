//DATA

//I would put all the const variables for assetName, assetAmount, and vice versa for liabilities...
//But I will have to put the list up here...

let assets = [];
let liabilities = [];


//Calculation Functions
//Not much tbh
function getNetWorth(assets,liabilities){
 return assets - liabilities;
}

//Action Functions
//The Fetch helper functions are definitely actions, Maybe I just have to replace the logic inside the first two
//much easier than calling local storage on every other function
//I've become familiar with async and await, i like that more then the then stuff.

async function saveData() {  
  await fetch('/api/data', { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ assets, liabilities })           // I wondered what api/data leads to, 
  });
}


async function loadData(){
 //I found out that fetch api automatically does GET so this is unnecessary
 const response = await fetch('/api/data',{
  method: 'GET' //would it be get or request?
 });

    const data = await response.json();
   
   if (data.assets) assets = data.assets;
   if (data.liabilities) liabilities = data.liabilities;
   
   updateDisplay();
}


//function saveData() {
     //localStorage.setItem('assets', JSON.stringify(assets));
     //localStorage.setItem('liabilities', JSON.stringify(liabilities));
 //}

 //function loadData() {
     //const savedAssets = localStorage.getItem('assets');
     //const savedLiabilities = localStorage.getItem('liabilities');
     
     //if (savedAssets) assets = JSON.parse(savedAssets);
     //if (savedLiabilities) liabilities = JSON.parse(savedLiabilities);
     
     //updateDisplay();
 //}

function  updateLiabilitiesList() {
  const container = document.getElementById('liabilitiesList');

  const html = `
    <ul>
      ${liabilities.map((item, index) => `
        <li>
          ${item.name} - $${item.amount}
          <button class="delBtn" data-index="${index}" data-type="liabilitiesList">
            ×
          </button>
        </li>`).join('')}
    </ul>
  `;
  container.innerHTML = html;
}

function  updateAssetsList() {
  const container = document.getElementById('assetsList');

  const html = `
    <ul>
      ${assets.map((item, index) => `
        <li>
          ${item.name} - $${item.amount}
          <button class="delBtn" data-index="${index}" data-type="assetsList">
            ×
          </button>
        </li>`).join('')}
    </ul>
  `;
  container.innerHTML = html;
}



function updateDisplay() {
    updateAssetsList();
    updateLiabilitiesList();
    updateNetWorth();
}



function addAsset(event) {
    event.preventDefault();
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

function addLiability(event) {
    event.preventDefault();
    const name = document.getElementById('liabilityName').value;
    const amount = parseFloat(document.getElementById('liabilityAmount').value);

  if (!name || isNaN(amount) || amount < 0) {
        alert('Please enter a valid liability name and amount');
        return;
     }
    
    liabilities.push({ id: Date.now(), name, amount });
    document.getElementById('liabilityName').value = '';
    document.getElementById('liabilityAmount').value = '';
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

// Delete handler
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('delBtn')) {
        const index = event.target.getAttribute('data-index');
        const type = event.target.getAttribute('data-type');
        
        if (type === 'assetsList') {
            assets.splice(index, 1);
        } else if (type === 'liabilitiesList') {
            liabilities.splice(index, 1);
        }
        
        updateDisplay();
        saveData();
    }
});

window.addEventListener('load', loadData);
