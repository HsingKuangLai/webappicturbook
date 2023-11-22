/* global axios */


const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

async function main() {
  setupEventListeners();
  try {
    // here is empty

  } catch (error) {
    alert("Failed to load members!");
  }
}

// 設定EventListeners，裡面包含Sign up按鈕function
function setupEventListeners() {
  const signUpButton = document.querySelector("#signupButton");
  const nameInput = document.querySelector("#user_id");
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");
  const creditcardInput = document.querySelector('#creditCard_num')
  
  signUpButton.addEventListener("click", async () => {
  const name = nameInput.value;
  const email = emailInput.value;
	const password = passwordInput.value;
	const creditCard = creditcardInput.value;
    if (!name) {
      alert("Please enter a name!");
      return;
    }
    if (!email) {
      alert("Please enter an email!");
      return;
    }
	  if (!password){
	  alert("Please enter a password!");
      return;
	  }
	  if (!creditCard){
		alert("Please enter a credit card number!");
		return;
	  }

    try {
      const memeberShip = await createMember({ name, email, password, creditCard });
      console.log(memeberShip);
    } catch (error) {
      alert("Failed to create member!");
      return;
    }
    nameInput.value = "";
    emailInput.value = "";
	  passwordInput.value = "";
	  creditcardInput.value = "";
    alert("Sign up Successfully, press back to return Log in page！")
    

  });
}

// 前端呼叫後端function
async function createMember(members) {
  const response = await instance.post("/members", members);
  return response.data;
}


main();
