class widgetclock extends HTMLElement {
  constructor() {
    super();
    // element created
    this.shadowroot = this.attachShadow({
      mode: 'open'
    });
    this.id = "ctrl_" + new Date().getTime().toString() + Math.random().toString().replace('.', '');
    this.dateId = "ctrl_" + new Date().getTime().toString() + Math.random().toString().replace('.', '');
    this.timeId = "ctrl_" + new Date().getTime().toString() + Math.random().toString().replace('.', '');
    this._initialised = false;
    this._dateField = null;
    this._timeField = null;
  }


  get dateField() {
    return this._dateField;
  }
  set dateField(value) {
    this._dateField = value;
  }

  get timeField() {
    return this._timeField;
  }
  set timeField(value) {
    this._timeField = value;
  }
  get initialised() {
    return this._initialised;
  }
  set initialised(value) {
    this._initialised = value;
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
  connectedCallback() {


    this.shadowroot.innerHTML = [`<style>`,
      `:host{`,
      `height:var(--default-control-toolbar-size);`,
      `-webkit-user-select: none; /* Safari */`,
      `-moz-user-select: none; /* Firefox */`,
      `-ms-user-select: none; /* IE10+/Edge */`,
      `user-select: none; /* Standard */`,
      `}`,
      `:host .clockparent {`,
      `box-sizing:border-box;`,
      `font-size:var(--default-control-caption-font-size);`,
      `font-family: var(--default-control-font-name);`,
      `display:flex;`,
      `flex-direction: column;`,
      `text-align:center;`,
      `background-color: var(--default-control-background-color);`,
      `border:var(--default-control-border-width) outset transparent;`,
      `transition: border-color var(--default-control-animation-speed);`,
      `}`,
      `:host([navlocation='top']) .clockparent, :host([navlocation='bottom']) .clockparent  {`,
      `flex-direction:row;`,
      `width:auto;`,
      `height:var(--default-control-toolbar-size);`,
      `padding:var(--default-control-padding);`,
      `}`,
      `:host([navlocation='top']) .clockparent > div , :host([navlocation='bottom']) .clockparent > div{`,
      `height:1rem;`,
      `width:auto;`,
      `white-space:nowrap;    `,
      `box-sizing:border-box;  `,
      `}`,
      `:host([navlocation='top']) .clockparent > div:first-child , :host([navlocation='bottom']) .clockparent > div:first-child{`,
      `padding-right:var(--default-control-icon-spacing);`,
      `}`,
      `:host([navlocation='left']) .clockparent, :host([navlocation='right']) .clockparent  {`,
      `flex-direction:column;`,
      `width:auto;`,
      `}`,
      `:host([navlocation='left']) .clockparent > div , :host([navlocation='right']) .clockparent >div{`,
      `height:1rem;`,
      `width:auto;`,
      `white-space:nowrap;`,
      `padding:var(--default-control-padding);`,
      `box-sizing:border-box;`,
      `}`,
      `:host .clockparent:hover {`,
      `border:var(--default-control-border-width) outset var(--default-colour-button-hilight);`,
      `transition: border-color var(--default-control-animation-speed);`,
      `}`,
      `</style>`,
      `<div class="clockparent" >`,
      `<div id="${this.timeId}"></div>`,
      `<div id="${this.dateId}"></div>`,
      `</div>`
    ].join('');
    requestAnimationFrame(_ => {
      setTimeout(this.startTime.bind(this), 1);
      setInterval(this.startTime.bind(this), 1000);
    })
    if (this.initialised === false) {
      this.dateField = this.shadowroot.getElementById(this.dateId);
      this.timeField = this.shadowroot.getElementById(this.timeId)
      this.initialised = true;
    }
  }

  startTime() {
    const today = new Date(),
      newTime = today.toLocaleString('en-GB', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }),
      newDate = today.toLocaleDateString("en-GB", {
        dateStyle: "medium"
      });
    if (newDate !== this.dateField.innerHTML) {
      this.dateField.innerHTML = newDate
    }
    if (newTime !== this.timeField.innerHTML) {
      this.timeField.innerHTML = newTime
    }
  }
  disconnectedCallback() {
    // browser calls this method when the element is removed from the document
    // (can be called many times if an element is repeatedly added/removed)
  }
  static get observedAttributes() {
    return ["navlocation"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    // called when one of attributes listed above is modified
  }
  adoptedCallback() {
    // called when the element is moved to a new document
    // (happens in document.adoptNode, very rarely used)
  }
}
window.customElements.define('mrbr-ui-widget-clock', widgetclock);
