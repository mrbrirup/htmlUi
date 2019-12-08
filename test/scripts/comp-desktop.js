class desktop extends HTMLElement {
  constructor() {
    super();
    // element created
    this.id = "ctrl_" + new Date().getTime().toString() + Math.random().toString().replace('.', '');
    this.desktopId = "ctrl_" + new Date().getTime().toString() + Math.random().toString().replace('.', '');
    this.menuMenuId = "ctrl_" + new Date().getTime().toString() + Math.random().toString().replace('.', '');
    this.menuControlBoxId = "ctrl_" + new Date().getTime().toString() + Math.random().toString().replace('.', '');
    this.navHomeId = "ctrl_" + new Date().getTime().toString() + Math.random().toString().replace('.', '');      
    this._template = 
[
        `<div class="mrbr-ui-desktop-navhost">`,
            `<nav>`,
               // `<mrbr-ui-menu id="${this.menuMenuId}">`,
                    //`<mrbr-ui-menuitem class="mrbr-ui-desktop-navhome" id="${this.navHomeId}"></mrbr-ui-menuitem>`,
        `	    <mrbr-ui-menu class="Menu -horizontal">
		    <mrbr-ui-menuitem class="-noChevron" text = "Hello">
		        <mrbr-ui-menu>
			        <mrbr-ui-menuitem href="#" text="Bacon"></mrbr-ui-menuitem>
			        <mrbr-ui-menuitem href="#" text="Ipsum"></mrbr-ui-menuitem>
			        <mrbr-ui-menuitem href="#" text="Dolor"></mrbr-ui-menuitem>
			        <mrbr-ui-menuitem href="#" text="Amet"></mrbr-ui-menuitem>
		        </mrbr-ui-menu>
		    </mrbr-ui-menuitem>
		    <mrbr-ui-menuitem  text="Alpha" href="#">
		        <mrbr-ui-menu>
			        <mrbr-ui-menuitem href="#" text="Bacon"></mrbr-ui-menuitem>
			        <mrbr-ui-menuitem href="#" text="Ipsum"></mrbr-ui-menuitem>
					<mrbr-ui-menuitem text="Sub-Menu" href="#" parentmenu>
						<mrbr-ui-menu>
							<mrbr-ui-menuitem href="#" text="Bacon"></mrbr-ui-menuitem>
					        <mrbr-ui-menuitem href="#" text="Ipsum"></mrbr-ui-menuitem>
					        <mrbr-ui-menuitem href="#" text="Dolor"></mrbr-ui-menuitem>
					        <mrbr-ui-menuitem href="#" text="Amet"></mrbr-ui-menuitem>
						</mrbr-ui-menu>
					</mrbr-ui-menuitem>
			        <mrbr-ui-menuitem href="#" text="Dolor"></mrbr-ui-menuitem>
			        <mrbr-ui-menuitem  href="#" text="Amet"></mrbr-ui-menuitem>
					<mrbr-ui-menuitem  text="Another Sub-menu">
						<mrbr-ui-menu>
							<mrbr-ui-menuitem href="#" text="Bacon"></mrbr-ui-menuitem>
					        <mrbr-ui-menuitem href="#"text="Ipsum"></mrbr-ui-menuitem>
							<mrbr-ui-menuitem  text="Sub-sub-menu!">								
								<mrbr-ui-menu>
									<mrbr-ui-menuitem href="#" text="Bacon"></mrbr-ui-menuitem>
							        <mrbr-ui-menuitem href="#" text="Ipsum"></mrbr-ui-menuitem>
							        <mrbr-ui-menuitem href="#" text="Dolor"></mrbr-ui-menuitem>
							        <mrbr-ui-menuitem href="#" text="Amet"></mrbr-ui-menuitem>
								</mrbr-ui-menu>
							</mrbr-ui-menuitem>
					        <mrbr-ui-menuitem href="#" text="Dolor"></mrbr-ui-menuitem>
					        <mrbr-ui-menuitem href="#" text="Amet"></mrbr-ui-menuitem>
						</mrbr-ui-menu>
					</mrbr-ui-menuitem>
		        </mrbr-ui-menu>
		    </mrbr-ui-menuitem>
		    <mrbr-ui-menuitem href="#" text="Beta"></mrbr-ui-menuitem>
		    <mrbr-ui-menuitem  href="#" text="Gamma">
		        <mrbr-ui-menu>
			        <mrbr-ui-menuitem href="#" text="Ipsum"></mrbr-ui-menuitem>
			        <mrbr-ui-menuitem href="#" text="Dolorsssssssssssssssssssssssss">						
						<mrbr-ui-menu>
							<mrbr-ui-menuitem href="#" text="Bacon"></mrbr-ui-menuitem>
					        <mrbr-ui-menuitem href="#" text="Ipsum"></mrbr-ui-menuitem>
					        <mrbr-ui-menuitem href="#" text="Dolor"></mrbr-ui-menuitem>
					        <mrbr-ui-menuitem href="#" text="Amet"></mrbr-ui-menuitem>
						</mrbr-ui-menu>
					</mrbr-ui-menuitem>
			        <mrbr-ui-menuitem href="#"  text="Amet"></mrbr-ui-menuitem>
					<mrbr-ui-menuitem href="#"  text="Tail pork loin chicken"></mrbr-ui-menuitem>
					<mrbr-ui-menuitem href="#"  text="Bacon ipsum dolor amet pork loin rump filet mignon swine"></mrbr-ui-menuitem>
		        </mrbr-ui-menu>
		    </mrbr-ui-menuitem>
		    <mrbr-ui-menuitem href="#"  text="Delta"></mrbr-ui-menuitem>
		    <mrbr-ui-menuitem href="#" text="Epsilon"></mrbr-ui-menuitem>
		</mrbr-ui-menu>`,
                //`</mrbr-ui-menu>`,
            `</nav>`,
            `<div id="${this.menuControlBoxId}" class="mrbr-ui-desktop-controlbox">`,
                `<mrbr-ui-widget-clock navlocation="${this.navlocation}></mrbr-ui-widget-clock">`,
            `</div>`,
            `<div id="${this.desktopId}" class="mrbr-ui-desktop-desktop">`,
            `</div>`,
        `</div>`
    ].join('');
    this._initialised = false;
      this.controlBox = null;
      this.desktop = null;
  }
    set desktop(value){this._desktop = value;}
    get desktop(){return this._desktop;}
    
  get initialised() {
    return this._initialised;
  }
  set initialised(value) {
    this._initialised = value;
  }
  get template() {
    return this._template;
  }
  set template(value) {
    this._template = value;
  }
  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }
  get desktopId() {
    return this._desktopId;
  }
  set desktopId(value) {
    this._desktopId = value;
  }
  get menuMenuId() {
    return this._menuMenuId;
  }
  set menuMenuId(value) {
    this._menuMenuId = value;
  }
  get menuControlBoxId() {
    return this._menuControlBoxId;
  }
  set menuControlBoxId(value) {
    this._menuControlBoxId = value;
  }
  get navHomeId() {
    return this._navHomeId;
  }
  set navHomeId(value) {
    this._navHomeId = value;
  }
  set navlocation(value) {
    this.setAttribute("navlocation", value)
  }
  get navlocation() {
    if (!this.hasAttribute("navlocation")) {
      return "bottom";
    } else {
      return this.getAttribute("navlocation");
    }
  }
    set controlBox(value){this._controlBox = value;}
    get controlBox(){return this._controlBox}
  connectedCallback() {
      if(!this.initialised){
        this.innerHTML = this.template;      
          this.desktop= document.getElementById(this.desktopId);
          this.controlBox = document.getElementById(this.menuControlBoxId);        
          this.initialised = true;
      }    
    this.setChildPositions(this.navlocation);
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
  setChildPositions(position) {
    const ctrlBox = document.getElementById(this.menuControlBoxId);      
      this.childNodes.forEach(node => node.setAttribute("navlocation", position));
    if (ctrlBox) {
      ctrlBox.childNodes.forEach(node => node.setAttribute("navlocation", position));
    }
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "navlocation") {
      this.setChildPositions(newValue);
    }

  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // (happens in document.adoptNode, very rarely used)
  }
}
window.customElements.define('mrbr-ui-desktop', desktop);

/*
 `<menu style="    margin:0px;padding:0px;display:block;height: 1rem;
    width: auto;
    white-space: nowrap;
    box-sizing: border-box;
    width: auto;
    height: var(--default-control-toolbar-size);
    padding: var(--default-control-padding);
    background-color: var(--default-control-background-color);
    /* font-size: var(--default-control-caption-font-size); */
    /*font-family: var(--default-control-font-name);
"><menuitem style="height: var(--default-control-toolbar-size);box-sizing:border-boxlll">Hello</menuitem></menu>`,

*/