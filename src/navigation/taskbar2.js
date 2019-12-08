class taskbar extends HTMLElement {
    constructor() {
        super();
        // element created
         //[location='bottom']
      }
    static get hostStyle(){
        return `<style> 
    :host {
    position:relative;    
    height:32px;
    color:white;
    background-color:red;
width:100%;
display:block;
    }
</style>`
}
    connectedCallback() {

        // browser calls this method when the element is added to the document
        // (can be called many times if an element is repeatedly added/removed)
                     let template = document.createElement('template');
        template.innerHTML=`<style> 
    :host {
    position:fixed;    
bottom:0px;
    height:32px;
    color:white;
    background-color:red;
width:100%;
display:block;
    }
:host *{
width:10%;
margin:0px;
}
</style>`;
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));  
        let v = document.createElement("h1");
        let v1 = document.createTextNode("Hello");
        v.appendChild(v1);
        this._shadowRoot.appendChild(v);          

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
    get location(){return this.getAttribute('location');}
    set location(value){this.setAttribute('location', value );}
}
customElements.define('mrbr-taskbar', taskbar);
/*
    connectedCallback() {
        // We set a default attribute here; if our end user hasn't provided one,
        // our element will display a "placeholder" text instead.
        if(!this.hasAttribute('text')) {
            this.setAttribute('text', 'placeholder');
        }

        this._renderTodoItem();
    }

    _renderTodoItem() {
        if (this.hasAttribute('checked')) {
            this.$item.classList.add('completed');
            this.$checkbox.setAttribute('checked', '');
        } else {
            this.$item.classList.remove('completed');
            this.$checkbox.removeAttribute('checked');
        }

        this.$text.innerHTML = this._text;
    }

    static get observedAttributes() {
        return ['text'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this._text = newValue;
    }*/