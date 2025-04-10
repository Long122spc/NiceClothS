(() => {
    const state = {
      formData: {
        name: "",
        email: "",
        subject: "",
        message: "",
      },
      submitForm(event) {
        event.preventDefault();
        console.log("Form submitted:", state.formData);
      },
    };
  
    const form = document.querySelector(".contact-form");
    const inputs = form.querySelectorAll("input, textarea");
  
    inputs.forEach((input) => {
      input.addEventListener("input", (event) => {
        const field = event.target.getAttribute("type") || "message";
        state.formData[field] = event.target.value;
      });
    });
  
    form.addEventListener("submit", state.submitForm);
  })();
  