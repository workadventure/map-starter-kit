console.log("External Script Loaded")
const {ethereum} = window;

// Define DOM element params
const connectButton = document.getElementById('connectButton')
const errorText = document.getElementById('errorText')
const activeAccountId = document.getElementById('activeAccount')
const senderId = document.getElementById('senderId')
const receiverId = document.getElementById('receiverId')
const ethValueInput = document.getElementById('ethValueInput')
const sendTransactionPanel = document.getElementById('sendTransactionPanel')
const sendTransactionButton = document.getElementById('sendTransaction')
const transactionErrorText = document.getElementById('transactionErrorText')

let accounts = [];
let activeAccount;

const initialize = async () => {
    initializeOnboarding();
    if (ethereum.isConnected && (accounts.length === 0 || accounts.length > 0 && activeAccount !== accounts[0])) {
        await loadActiveAccount()
    }
    await initializeWorkAdventureApi()
}

const loadActiveAccount = async () => {
    const activeAccounts = await ethereum.request({method: 'eth_accounts'})
    if (activeAccounts.length > 0) {
        activeAccount = activeAccounts[0];
        activeAccountId.innerText = `WalletID: ${activeAccount}`;
        senderId.innerText = activeAccounts;
        connectButton.innerText = 'Wallet Connected';
        sendTransactionPanel.style.display = "block";
    } else {
        initializeOnboarding()
    }
}

const initializeOnboarding = () => {
    const onboarding = new MetaMaskOnboarding();
    if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
        connectButton.innerText = 'Click here to install MetaMask!';
        connectButton.onclick = () => {
            connectButton.innerText = 'Onboarding in progress';
            connectButton.disabled = true;
            onboarding.startOnboarding();
        };
    } else if (accounts && accounts.length > 0) {
        connectButton.innerText = 'Wallet Connected';
        connectButton.disabled = true;
        sendTransactionPanel.style.display = "block";
        onboarding.stopOnboarding();
    } else {
        connectButton.innerText = 'Connect Wallet';
        sendTransactionPanel.style.display = "none";
        activeAccount = undefined;
        accounts = [];
        activeAccountId.innerText = null;
        connectButton.onclick = async () => {
            await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
        };
    }
};

const initializeWorkAdventureApi = async () => {
    console.log("Initializing WA")
    errorText.innerText = null;
    try {
        await new Promise((resolve, reject) => {
            WA.onInit().then(resolve, reject)
            setTimeout(reject, 5000)
        })
        console.log("WA Loaded")
    } catch (err) {
        console.log("Cannot load Work Adventure API")
        errorText.innerText = "Error loading Work Adventure API";
    }
}

const sendTransaction = async () => {
    resetTransactionError()
    const ethAmount = ethValueInput.value;
    const receiverAddress = receiverId.value;
    if (!ethers.utils.isAddress(receiverAddress)) {
        displayTransactionError("Invalid receiver address")
        return
    }
    if (isNaN(parseFloat(ethAmount))) {
        displayTransactionError("Invalid eth amount provided")
        return
    }
    const amountInWei = ethers.utils.parseEther(ethAmount)

    try {
        sendTransactionButton.disabled = true;
        sendTransactionButton.innerText = "Processing Transaction";
        const params = [
            {
                from: activeAccount,
                to: receiverId.value,
                value: amountInWei.toHexString(),
            }
        ];
        await ethereum.request({
            method: 'eth_sendTransaction',
            params,
        })
    }catch (err){
        console.error("Error sending transaction", err)
         displayTransactionError("Error sending transaction")
    }finally {
        ethValueInput.value = null;
        receiverId.value = null;
        sendTransactionButton.disabled = false;
        sendTransactionButton.innerText = "Send Transaction";
    }
}

const displayTransactionError = (message)=>{
    transactionErrorText.innerText = message;
}
const resetTransactionError = ()=> transactionErrorText.innerText = null;

if (MetaMaskOnboarding.isMetaMaskInstalled()) {
    window.ethereum.on('accountsChanged', async (newAccounts) => {
        accounts = newAccounts;
        initializeOnboarding();
        await loadActiveAccount()
    });
}

window.addEventListener('load', initialize)