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
    const loginButton = document.querySelector("#LoginButton");
    const emailInput = document.querySelector("#id");
    const passwordInput = document.querySelector("#password");

    
    loginButton.addEventListener("click", async () => {

      const email = emailInput.value;
      const password = passwordInput.value;
    
      if (!email) {
        alert("Please enter an email!");
        return;
      }
      
      if (!password){
        alert("Please enter a password!");
        return;
      }
        
      try {
        const memberData = await getMembers({email, password});
        // console.log(memberData);
        if (!memberData || memberData.length === 0){
          alert("Failed to get member!");
          console.log("false");
          emailInput.value = "";
          passwordInput.value = "";
          return;
        }
        window.location.href = "./homepage.html";

      } catch (error) {
        alert("Failed to get member!");
        return;
      }

      emailInput.value = "";
      passwordInput.value = "";
      
  
    });
  }
  
  

  // 前端呼叫後端function
  async function getMembers(members) {
    const response = await instance.get("/members", {
      params: members
    });
    return response.data;
  }
  
  // async function createMember(members) {
  //   const response = await instance.post("/members", members);
  //   return response.data;
  // }
  

  main();
  