/* global axios */


const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

async function main() {
  setupEventListeners();
  try {
    // here is empty

  } catch (error) {
    Swal.fire({
      icon: 'error', // Set the icon (success, error, warning, info, question)
      title: "Failed to load members!",
      showConfirmButton: true,
    });
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
      Swal.fire({
        icon: 'warning', // Set the icon (success, error, warning, info, question)
        title: 'Please enter name！', 
        showConfirmButton: true,
      })
      return;
    }
    if (!email) {
      Swal.fire({
        icon: 'warning', // Set the icon (success, error, warning, info, question)
        title: 'Please enter email！', 
        showConfirmButton: true,
      })
      return;
    }
	  if (!password){
      Swal.fire({
        icon: 'warning', // Set the icon (success, error, warning, info, question)
        title: 'Please enter password！', 
        showConfirmButton: true,
      })
      return;
	  }
	  if (!creditCard){
      Swal.fire({
        icon: 'warning', // Set the icon (success, error, warning, info, question)
        title: 'Please enter Credit Card Number！', 
        showConfirmButton: true,
      })
		  return;
	  }

    try {
      const memeberShip = await createMember({ name, email, password, creditCard });
      console.log(memeberShip);
    } catch (error) {
      Swal.fire({
        icon: 'error', // Set the icon (success, error, warning, info, question)
        title: "Failed to create member!",
        showConfirmButton: true,
      });
      return;
    }
    nameInput.value = "";
    emailInput.value = "";
	  passwordInput.value = "";
	  creditcardInput.value = "";

    Swal.fire({
      icon: 'success',
      title: 'Sign up Successfully！',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = 'Login.html';
      }
    });
    
    

  });
}

// 前端呼叫後端function
async function createMember(members) {
  const response = await instance.post("/members", members);
  return response.data;
}


main();
