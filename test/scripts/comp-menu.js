class menu1 extends HTMLElement {
  constructor() {
    super();
    // element created

  }
  set navLocation(value) {
    this.setAttribute("navLocation", value)
  }
  get navLocation() {
    if (!this.hasAttribute("navLocation")) {
      return "bottom";
    } else {
      return this.getAttribute("navLocation");
    }
  }
  connectedCallback() {
    this.id = "ctrl_" + new Date().getTime().toString() + Math.random().toString().replace('.', '');
    let $ = menu1.$;
    var self = this;
    menu1._forEach(menu1.$(".Menu mrbr-ui-menuitem.-hasSubmenu"), function (e) {
      console.log(e);
      e.showMenu = menu1.showMenu;
      e.hideMenu = menu1.hideMenu;
    });

    menu1._forEach(menu1.$(".Menu > mrbr-ui-menuitem.-hasSubmenu"), function (e) {

      e.addEventListener("click", menu1.showMenu);
    });

    menu1._forEach(menu1.$(".Menu > mrbr-ui-menuitem.-hasSubmenu mrbr-ui-menuitem"), function (e) {
      e.addEventListener("mouseenter", menu1.hideAllInactiveMenus);
    });

    menu1._forEach(menu1.$(".Menu > mrbr-ui-menuitem.-hasSubmenu mrbr-ui-menuitem.-hasSubmenu"), function (e) {
      e.addEventListener("mouseenter", menu1.showMenu);
    });

    document.addEventListener("click", menu1.hideAllInactiveMenus);
    // browser calls this method when the element is added to the document
    // (can be called many times if an element is repeatedly added/removed)
  }
  disconnectedCallback() {
    // browser calls this method when the element is removed from the document
    // (can be called many times if an element is repeatedly added/removed)
  }
  static get observedAttributes() {
    return ["location"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name);
  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // (happens in document.adoptNode, very rarely used)
  }
  static $(selector, context) {
    context = context || document;
    return context["querySelectorAll"](selector);
  }

  static _forEach(collection, iterator) {
    for (var key in Object.keys(collection)) {
      iterator(collection[key]);
    }
  }

  static showMenu(menu) {
    var menu = this;
    var ul = menu1.$("mrbr-ui-menu", menu)[0];
    
    if (!ul) return;
    if (ul.classList.contains("-visible")) {
      menu.classList.remove("-active");
      ul.classList.add("-animating");
      setTimeout(function () {
        ul.classList.remove("-visible");
        ul.classList.remove("-animating");
      }, 300);
    } else {
      menu.classList.add("-active");
      ul.classList.add("-animating");
      ul.classList.add("-visible");
      setTimeout(function () {
        ul.classList.remove("-animating")
      }, 25);

    }
  }

  static hideMenu(menu) {
    var menu = this;
    var ul = menu1.$("mrbr-ui-menu", menu)[0];

    if (!ul || !ul.classList.contains("-visible")) return;

    menu.classList.remove("-active");
    ul.classList.add("-animating");
    setTimeout(function () {
      ul.classList.remove("-visible");
      ul.classList.remove("-animating");
    }, 300);
  }

  static hideAllInactiveMenus(menu) {
    var menu = this;
    menu1._forEach(
      menu1.$("mrbr-ui-menuitem.-hasSubmenu.-active:not(:hover)", menu.parent),
      function (e) {
        e.hideMenu && e.hideMenu();
      }
    );
  }


}
window.customElements.define('mrbr-ui-menu', menu1);
