class extends HTMLElement {
    constructor() {
        super();
        // element created
         //this.innerHTML = '';
      }
    connectedCallback() {
        // browser calls this method when the element is added to the document
        // (can be called many times if an element is repeatedly added/removed)
        // const self = this;
        // window.requestAnimationFrame(() => {
        //     self.addEventListener("menuitem_click", (event) => {
        //         debugger;
        //         console.log("menuitem2",event );
        //         self.dispatchEvent(
        //             new CustomEvent('menuitem_click2', {
        //                 bubbles: true,
        //                 composed: true,
        //                 cancelable: true,
        //                 detail: {
        //                     callback: self
        //                 }
        //             }));
        //     })
        // })
    }
    disconnectedCallback() {
        // browser calls this method when the element is removed from the document
        // (can be called many times if an element is repeatedly added/removed)
    }
    static get observedAttributes() {
        return [/* array of attribute names to monitor for changes */];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        // called when one of attributes listed above is modified
    }
    adoptedCallback() {
        // called when the element is moved to a new document
        // (happens in document.adoptNode, very rarely used)
    }
}