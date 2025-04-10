(() => {
    const state = {
      email: "",
      password: "",
      isLoading: false,
      errorMessage: "",
    };
  
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const errorMessageEl = document.getElementById("errorMessage");
    const loginButton = document.getElementById("loginButton");
    const loadingText = document.getElementById("loadingText");
    const buttonText = document.getElementById("buttonText");
  
    function updateUI() {
      emailInput.value = state.email;
      passwordInput.value = state.password;
  
      if (state.errorMessage) {
        errorMessageEl.textContent = state.errorMessage;
        errorMessageEl.classList.remove("hidden");
      } else {
        errorMessageEl.classList.add("hidden");
      }
  
      loginButton.disabled = state.isLoading;
      loadingText.classList.toggle("hidden", !state.isLoading);
      buttonText.classList.toggle("hidden", state.isLoading);
    }
  
    emailInput.addEventListener("input", (e) => {
      state.email = e.target.value;
      updateUI();
    });
  
    passwordInput.addEventListener("input", (e) => {
      state.password = e.target.value;
      updateUI();
    });
  
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      state.isLoading = true;
      state.errorMessage = "";
      updateUI();
  
      try {
       
        console.log("Logging in with:", state.email, state.password);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        throw new Error("Invalid email or password");
      } catch (error) {
        state.errorMessage = error.message;
      } finally {
        state.isLoading = false;
        updateUI();
      }
    });
  
    updateUI();
  })();
  