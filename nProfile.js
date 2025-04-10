(() => {
    const state = {
      name: "",
      phone: "",
      address: "",
      email: "",
      clearInfo() {
        state.name = "";
        update();
        state.phone = "";
        update();
        state.address = "";
        update();
        state.email = "";
        update();
      },
      updateInfo() {
        alert("Profile information updated successfully!");
      },
    };
  
    let context = null;
    let nodesToDestroy = [];
    let pendingUpdate = false;
  
    function destroyAnyNodes() {
      nodesToDestroy.forEach((el) => el.remove());
      nodesToDestroy = [];
    }
  
    function update() {
      if (pendingUpdate === true) {
        return;
      }
      pendingUpdate = true;
  
      document.querySelectorAll("[data-el='div-1']").forEach((el) => {
        el.setAttribute("space", 40);
      });
  
      document.querySelectorAll("[data-el='div-2']").forEach((el) => {
        renderTextNode(el, state.name || "Your Name");
      });
  
      document.querySelectorAll("[data-el='input-1']").forEach((el) => {
        el.value = state.name;
        el.removeEventListener("input", onInput1Input);
        el.addEventListener("input", onInput1Input);
      });
  
      document.querySelectorAll("[data-el='input-3']").forEach((el) => {
        el.value = state.phone;
        el.removeEventListener("input", onInput3Input);
        el.addEventListener("input", onInput3Input);
      });
  
      document.querySelectorAll("[data-el='input-5']").forEach((el) => {
        el.value = state.address;
        el.removeEventListener("input", onInput5Input);
        el.addEventListener("input", onInput5Input);
      });
  
      document.querySelectorAll("[data-el='input-7']").forEach((el) => {
        el.value = state.email;
        el.removeEventListener("input", onInput7Input);
        el.addEventListener("input", onInput7Input);
      });
  
      document.querySelectorAll("[data-el='button-1']").forEach((el) => {
        el.removeEventListener("click", onButton1Click);
        el.addEventListener("click", onButton1Click);
      });
  
      document.querySelectorAll("[data-el='button-2']").forEach((el) => {
        el.removeEventListener("click", onButton2Click);
        el.addEventListener("click", onButton2Click);
      });
  
      destroyAnyNodes();
      pendingUpdate = false;
    }
  
    function onInput1Input(event) {
      state.name = event.target.value;
      update();
    }
  
    function onInput3Input(event) {
      state.phone = event.target.value;
      update();
    }
  
    function onInput5Input(event) {
      state.address = event.target.value;
      update();
    }
  
    function onInput7Input(event) {
      state.email = event.target.value;
      update();
    }
  
    function onButton1Click(event) {
      state.clearInfo();
    }
  
    function onButton2Click(event) {
      state.updateInfo();
    }
  
    function renderTextNode(el, text) {
      const textNode = document.createTextNode(text);
      if (el?.scope) {
        textNode.scope = el.scope;
      }
      if (el?.context) {
        child.context = el.context;
      }
      el.after(textNode);
      nodesToDestroy.push(el.nextSibling);
    }
  
    update();
  })();
  