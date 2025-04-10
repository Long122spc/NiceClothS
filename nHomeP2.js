(() => {
    const state = {
      cartCount: 0,
      isMenuOpen: false,
      toggleMenu() {
        state.isMenuOpen = !state.isMenuOpen;
        update();
      },
      categories: [
        {
          id: 1,
          name: "Men's Wear",
          image:
            "./PicNiceCloth/Stor4.jpg",
        },
        {
          id: 2,
          name: "Women's Wear",
          image:
            "./PicNiceCloth/Store4.jpg",
        },
        {
          id: 3,
          name: "Accessories",
          image:
            "./PicNiceCloth/Store4.jpg",
        },
        {
          id: 4,
          name: "Footwear",
          image:
            "./PicNiceCloth/Store4.jpg",
        },
      ],
      featuredProducts: [
        {
          id: 1,
          name: "Summer Dress",
          price: 59.99,
          image:
            "./PicNiceCloth/meo3.jpg",
        },
        {
          id: 2,
          name: "Denim Jacket",
          price: 89.99,
          image:
            "./PicNiceCloth/meo3.jpg",
        },
        {
          id: 3,
          name: "Classic T-Shirt",
          price: 24.99,
          image:
            "./PicNiceCloth/meo3.jpg",
        },
        {
          id: 4,
          name: "Leather Bag",
          price: 129.99,
          image:
            "./PicNiceCloth/meo3.jpg",
        },
      ],
    };
  
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
        renderTextNode(el, state.cartCount);
      });
  
      document.querySelectorAll("[data-el='for']").forEach((el) => {
        let array = state.categories;
        renderLoop(el, array, "category");
      });
  
      document.querySelectorAll("[data-el='div-2']").forEach((el) => {
        const category = getScope(el, "category");
        el.key = category.id;
      });
  
      document.querySelectorAll("[data-el='div-3']").forEach((el) => {
        const category = getScope(el, "category");
        renderTextNode(el, category.name);
      });
  
      document.querySelectorAll("[data-el='for-2']").forEach((el) => {
        let array = state.featuredProducts;
        renderLoop(el, array, "product");
      });
  
      document.querySelectorAll("[data-el='div-4']").forEach((el) => {
        const product = getScope(el, "product");
        el.key = product.id;
      });
  
      document.querySelectorAll("[data-el='div-5']").forEach((el) => {
        const product = getScope(el, "product");
        renderTextNode(el, product.name);
      });
  
      document.querySelectorAll("[data-el='div-6']").forEach((el) => {
        const product = getScope(el, "product");
        renderTextNode(el, product.price);
      });
  
      document.querySelectorAll("[data-el='div-7']").forEach((el) => {
        renderTextNode(el, new Date().getFullYear());
      });
  
      destroyAnyNodes();
      pendingUpdate = false;
    }
  
    function renderTextNode(el, text) {
      const textNode = document.createTextNode(text);
      if (el?.scope) {
        textNode.scope = el.scope;
      }
      if (el?.context) {
        textNode.context = el.context;
      }
      el.after(textNode);
      nodesToDestroy.push(el.nextSibling);
    }
  
    function renderLoop(template, array, itemName) {
      const collection = [];
      for (let [index, value] of array.entries()) {
        const elementFragment = template.content.cloneNode(true);
        const children = Array.from(elementFragment.childNodes);
        const localScope = {};
        let scope = localScope;
  
        if (template?.scope) {
          const getParent = {
            get(target, prop, receiver) {
              if (prop in target) {
                return target[prop];
              }
              if (prop in template.scope) {
                return template.scope[prop];
              }
              return target[prop];
            },
          };
          scope = new Proxy(localScope, getParent);
        }
  
        children.forEach((child) => {
          if (itemName !== undefined) {
            scope[itemName] = value;
          }
          child.scope = scope;
          if (template.context) {
            child.context = template.context;
          }
          nodesToDestroy.push(child);
          collection.unshift(child);
        });
  
        collection.forEach((child) => template.after(child));
      }
    }
  
    function getScope(el, name) {
      do {
        let value = el?.scope?.[name];
        if (value !== undefined) {
          return value;
        }
      } while ((el = el.parentNode));
    }
  
    update();
  })();
  