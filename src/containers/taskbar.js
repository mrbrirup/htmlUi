class extends HTMLElement {
    static get manifest() {
        const entry = Mrbr.System.ManifestEntry;
        return [
            new entry(entry.FileTypes.Component, "Mrbr.UI.Navigation.Menu"),
            new entry(entry.FileTypes.Component, "Mrbr.UI.Controls.Button"),
            new entry(entry.FileTypes.Style, "Mrbr.UI.Containers.TaskBar")
        ];
    }
    constructor() {
        super();
        this.button = new Mrbr.UI.Controls.Button();
        this.button.src= Mrbr.System.Assembly.resolveNamespaceToFile("Mrbr.UI.Resources.Images.menu-button-of-three-horizontal-lines","svg")
        this.menu = new Mrbr.UI.Navigation.Menu();
        this.menu.direction = "up";
    }
    connectedCallback() {
        this.button.appendChild(this.menu);
        this.appendChild(this.button)
        let self = this;
        let m1 = document.createElement("mrbr-ui-navigation-menuitem")
        m1.label = "Hello";
        this.menu.rootMenu.appendChild(m1);
    
        let m2 = document.createElement("mrbr-ui-navigation-menuitem")
        m2.label = "World";
        m2.setAttribute("submenu",'')
        this.menu.rootMenu.appendChild(m2);
        
        
        let m3 = document.createElement("mrbr-ui-navigation-menuitem")
        m3.label = "Again";
        m3.setAttribute("submenu",'')
        m2.menuItems.appendChild(m3);
        
        let m4 = document.createElement("mrbr-ui-navigation-menuitem")
        m4.label = "Again1";
        let m5 = document.createElement("mrbr-ui-navigation-menuitem")
        m5.label = "Again2";
        let m6 = document.createElement("mrbr-ui-navigation-menuitem")
        m6.label = "Again3";
        
        m3.menuItems.appendChild(m4);
        m3.menuItems.appendChild(m5);
        m3.menuItems.appendChild(m6);

        //this.button.addEventListener("click", function(){self.menu.style.display = "block"})
        self.button.addEventListener("click", function(){
            self.menu.classList.add("show");
            self.menu.nav.classList.add("show");});
        self.button.addEventListener("mouseleave", function(){self.menu.classList.remove("show")});
        

        // browser calls this method when the element is added to the document
        // (can be called many times if an element is repeatedly added/removed)
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