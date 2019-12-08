class menuitem extends HTMLElement {
  constructor() {
    super();
    // element created    
  }
  get parentMenu(){return this.hasAttribute('parentmenu');}
  set parentMenu(value){

    if (value) {
      this.setAttribute('parentmenu', '');
    } else {
      this.removeAttribute('parentmenu');
    }
    
    
    }
  get icon(){return this.getAttribute('icon');}
  set icon(value){this.setAttribute('icon', value );}
  get text(){return this.getAttribute('text');}
  set text(value){this.setAttribute('text', value );}
  get href(){const href = this.getAttribute('href'); return (!href || href === "") ? "#": href;}
  set href(value){this.setAttribute('href', value );}
  set navLocation(value) {
    this.setAttribute("navlocation", value)
  }
  get navLocation() {
    if (!this.hasAttribute("navlocation")) {
      return "bottom";
    } else {
      return this.getAttribute("navlocation");
    }
  }
  connectedCallback() {
      this.id = "ctrl_" + new Date().getTime().toString() + Math.random().toString().replace('.', '');
      const text = this.text;
      //if (this.parentMenu) this.classList.add("-hasSubmenu");
      this.childNodes.forEach(node =>{ if(node.tagName && node.tagName.toLowerCase() === "mrbr-ui-menu" && !(node.classList.contains("-hasSubmenu"))){this.classList.add("-hasSubmenu")}}  );
        

      //.querySelectorAll("")
      const div = document.createElement("div");

      const a = document.createElement("a"),
      txt = document.createTextNode(this.text);
       
       a.appendChild(txt);
      //a.innerHTML = (this.text);
      //a.innerHTML = "text";
      //const ih = this.innerHTML;
      //this.innerHTML=`<a href="${this.href}">${text}</a>` + ih;
      //this.appendChild()
      this.prepend(a);
      this.prepend(div);
      const div2 = document.createElement("div");
      this.appendChild(div2);
      //this.innerHTML=`<a href="#">${text}</a>`;
    // browser calls this method when the element is added to the document
    // (can be called many times if an element is repeatedly added/removed)
  }
  disconnectedCallback() {
    // browser calls this method when the element is removed from the document
    // (can be called many times if an element is repeatedly added/removed)
  }
  static get observedAttributes() {
    return ["navlocation"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name);
  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // (happens in document.adoptNode, very rarely used)
  }
}
window.customElements.define('mrbr-ui-menuitem', menuitem);