class extends HTMLElement {
	static get manifest() {
		const entry = Mrbr.System.ManifestEntry;
		return [new entry(entry.FileTypes.Style, "Mrbr.UI.Dialogs.Dialog")];
	}
	static get using() { return ["Mrbr.System.EventHandler"]; }
	constructor(config) {
		super();
		const self = this;
		self._minWidth = 320;
		self._minHeight = 280;
		self._resizePixel = 5;
		self._isDrag = false;
		self._isResize = false;
		self._resizeMode = '';
		self.controlboxButtons = [];
		self._container = null;
		self._taskbarContainer = null;
		self._closing = [];
		self._eventHandler = new Mrbr.System.EventHandler({ target: self });
		self._template = (config && config.template) ? config.template : self.innerHTML;
		self._contentTemplate = (config && config.content) ? config.content : "";
		self._buttonTemplate = (config && config.buttons) ? config.buttons : "";
		self._template1 = Mrbr.UI.Utils.Utils.template("Mrbr.UI.Dialogs.Dialog");
		self._dialog_resize_size = {
			left: null,
			top: null,
			width: null,
			height: null
		};

	}
	set contentTemplate(value) {
		this._contentTemplate = value;
	}
	get contentTemplate() { return this._contentTemplate; }
	get taskbarContainer() { return this._taskbarContainer }
	set taskbarContainer(value) {
		const this_taskbarContainer = this._taskbarContainer;
		this._taskbarContainer = value;
		if (!this_taskbarContainer) {
			this.createTaskBar();
		}
	}
	set title(value) {
		this.setAttribute("title", value)
		this.dispatchEvent(new CustomEvent("mrbr-ui-dialogs-title-change", {}))
	}
	get title() {
		if (!this.hasAttribute("title")) {
			return "";
		} else {
			return this.getAttribute("title");
		}
	}
	get container() { return this._container }
	set container(value) { this._container = value; }
	static get EVENTS() {
		return {
			minimised: "mrbr-ui-dialogs-events-minimised",
			maximised: "mrbr-ui-dialogs-events-maximised",
			activated: "mrbr-ui-dialogs-events-activated",//	Occurs when the form is activated in code or by the user.
			//autosizechanged: "mrbr-ui-dialogs-events-autosizechanged",//	Occurs when the AutoSize property changes.
			//autovalidatechanged: "mrbr-ui-dialogs-events-autovalidatechanged",//	Occurs when the AutoValidate property changes.
			//backcolorchanged: "mrbr-ui-dialogs-events-backcolorchanged",//	Occurs when the value of the BackColor property changes.
			//backgroundimagechanged: "mrbr-ui-dialogs-events-backgroundimagechanged",//	Occurs when the value of the BackgroundImage property changes.
			//backgroundimagelayoutchanged: "mrbr-ui-dialogs-events-backgroundimagelayoutchanged",//	Occurs when the BackgroundImageLayout property changes.
			//bindingcontextchanged: "mrbr-ui-dialogs-events-bindingcontextchanged",//	Occurs when the value of the BindingContext property changes.
			//causesvalidationchanged: "mrbr-ui-dialogs-events-causesvalidationchanged",//	Occurs when the value of the CausesValidation property changes.
			//changeuicues: "mrbr-ui-dialogs-events-changeuicues",//	Occurs when the focus or keyboard user interface (UI) cues change.
			//click: "mrbr-ui-dialogs-events-click",//	Occurs when the control is clicked.
			//clientsizechanged: "mrbr-ui-dialogs-events-clientsizechanged",//	Occurs when the value of the ClientSize property changes.
			closed: "mrbr-ui-dialogs-events-closed",//	Occurs when the form is closed.
			closing: "mrbr-ui-dialogs-events-closing",//	Occurs when the form is closing.
			//contextmenuchanged: "mrbr-ui-dialogs-events-contextmenuchanged",//	Occurs when the value of the ContextMenu property changes.
			//contextmenustripchanged: "mrbr-ui-dialogs-events-contextmenustripchanged",//	Occurs when the value of the ContextMenuStrip property changes.
			//controladded: "mrbr-ui-dialogs-events-controladded",//	Occurs when a new control is added to the Control.ControlCollection.
			//controlremoved: "mrbr-ui-dialogs-events-controlremoved",//	Occurs when a control is removed from the Control.ControlCollection.
			//cursorchanged: "mrbr-ui-dialogs-events-cursorchanged",//	Occurs when the value of the Cursor property changes.
			//deactivate: "mrbr-ui-dialogs-events-deactivate",//	Occurs when the form loses focus and is no longer the active form.
			//disposed: "mrbr-ui-dialogs-events-disposed",//	Occurs when the component is disposed by a call to the Dispose() method.
			//dockchanged: "mrbr-ui-dialogs-events-dockchanged",//	Occurs when the value of the Dock property changes.
			//doubleclick: "mrbr-ui-dialogs-events-doubleclick",//	Occurs when the control is double-clicked.
			//dpichanged: "mrbr-ui-dialogs-events-dpichanged",//	Occurs when the DPI setting changes on the display device where the form is currently displayed.
			//dpichangedafterparent: "mrbr-ui-dialogs-events-dpichangedafterparent",//	Occurs when the DPI setting for a control is changed programmatically after the DPI of its parent control or form has changed.
			//dpichangedbeforeparent: "mrbr-ui-dialogs-events-dpichangedbeforeparent",//	Occurs when the DPI setting for a control is changed programmatically before a DPI change event for its parent control or form has occurred.
			//dragdrop: "mrbr-ui-dialogs-events-dragdrop",//	Occurs when a drag-and-drop operation is completed.
			//dragenter:	"mrbr-ui-dialogs-events-dragenter",//	Occurs when an object is dragged into the control's bounds.
			//dragleave:	"mrbr-ui-dialogs-events-dragleave",//	Occurs when an object is dragged out of the control's bounds.
			//dragover:	"mrbr-ui-dialogs-events-dragover",//	Occurs when an object is dragged over the control's bounds.
			//enabledchanged: "mrbr-ui-dialogs-events-enabledchanged",//	Occurs when the Enabled property value has changed.
			//enter: "mrbr-ui-dialogs-events-enter",//	Occurs when the control is entered.
			//fontchanged: "mrbr-ui-dialogs-events-enter",//	Occurs when the Font property value changes.
			//forecolorchanged: "mrbr-ui-dialogs-events-enter",//	Occurs when the ForeColor property value changes.
			//formclosed: "mrbr-ui-dialogs-events-formclosed",//	Occurs after the form is closed.
			//formclosing: "mrbr-ui-dialogs-events-formclosing",//	Occurs before the form is closed.
			//givefeedback: "mrbr-ui-dialogs-events-givefeedback",//	Occurs during a drag operation.
			//gotfocus: "mrbr-ui-dialogs-events-gotfocus",//	Occurs when the control receives focus.
			//handlecreated: "mrbr-ui-dialogs-events-handlecreated",//	Occurs when a handle is created for the control.
			//handledestroyed: "mrbr-ui-dialogs-events-handledestroyed",//	Occurs when the control's handle is in the process of being destroyed.
			//helpbuttonclicked: "mrbr-ui-dialogs-events-helpbuttonclicked",//	Occurs when the Help button is clicked.
			//helprequested: "mrbr-ui-dialogs-events-helprequested",//	Occurs when the user requests help for a control.
			//imemodechanged: "mrbr-ui-dialogs-events-imemodechanged",//	Occurs when the ImeMode property has changed.
			//inputlanguagechanged: "mrbr-ui-dialogs-events-inputlanguagechanged",//	Occurs after the input language of the form has changed.
			//inputlanguagechanging: "mrbr-ui-dialogs-events-inputlanguagechanging",//	Occurs when the user attempts to change the input language for the form.
			//invalidated: "mrbr-ui-dialogs-events-invalidated",//	Occurs when a control's display requires redrawing.
			//keydown: "mrbr-ui-dialogs-events-keydown",//	Occurs when a key is pressed while the control has focus.
			//keypress: "mrbr-ui-dialogs-events-keypress",//	Occurs when a character. space or backspace key is pressed while the control has focus.
			//keyup: "mrbr-ui-dialogs-events-keyup",//	Occurs when a key is released while the control has focus.
			//layout: "mrbr-ui-dialogs-events-layout",//	Occurs when a control should reposition its child controls.
			//leave: "mrbr-ui-dialogs-events-leave",//	Occurs when the input focus leaves the control.
			//load: "mrbr-ui-dialogs-events-load",//	Occurs before a form is displayed for the first time.
			//locationchanged: "mrbr-ui-dialogs-events-locationchanged",//	Occurs when the Location property value has changed.
			//lostfocus: "mrbr-ui-dialogs-events-lostfocus",//	Occurs when the control loses focus.
			//marginchanged: "mrbr-ui-dialogs-events-marginchanged",//	Occurs when the Margin property changes.
			//maximizedboundschanged: "mrbr-ui-dialogs-events-maximizedboundschanged",//	Occurs when the value of the MaximizedBounds property has changed.
			//maximumsizechanged: "mrbr-ui-dialogs-events-maximumsizechanged",//	Occurs when the value of the MaximumSize property has changed.
			//mdichildactivate: "mrbr-ui-dialogs-events-maximumsizechanged",//	Occurs when a multiple-document interface (MDI) child form is activated or closed within an MDI application.
			//menucomplete: "mrbr-ui-dialogs-events-menucomplete",//	Occurs when the menu of a form loses focus.
			//menustart: "mrbr-ui-dialogs-events-menustart",//	Occurs when the menu of a form receives focus.
			//minimumsizechanged: "mrbr-ui-dialogs-events-minimumsizechanged",//	Occurs when the value of the MinimumSize property has changed.
			//mousecapturechanged: "mrbr-ui-dialogs-events-mousecapturechanged",//	Occurs when the control loses mouse capture.
			//mouseclick: "mrbr-ui-dialogs-events-mouseclick",//	Occurs when the control is clicked by the mouse.
			//mousedoubleclick: "mrbr-ui-dialogs-events-mousedoubleclick",//	Occurs when the control is double clicked by the mouse.
			//mousedown: "mrbr-ui-dialogs-events-mousedown",//	Occurs when the mouse pointer is over the control and a mouse button is pressed.
			//mouseenter: "mrbr-ui-dialogs-events-mouseenter",//	Occurs when the mouse pointer enters the control.
			//mousehover: "mrbr-ui-dialogs-events-mousehover",//	Occurs when the mouse pointer rests on the control.
			//mouseleave: "mrbr-ui-dialogs-events-mouseleave",//	Occurs when the mouse pointer leaves the control.
			//mousemove: "mrbr-ui-dialogs-events-mousemove",//	Occurs when the mouse pointer is moved over the control.
			//mouseup: "mrbr-ui-dialogs-events-mouseup",//	Occurs when the mouse pointer is over the control and a mouse button is released.
			//mousewheel: "mrbr-ui-dialogs-events-mousewheel",//	Occurs when the mouse wheel moves while the control has focus.
			//move: "mrbr-ui-dialogs-events-move",//	Occurs when the control is moved.
			//paddingchanged:	"mrbr-ui-dialogs-events-paddingchanged",//	Occurs when the control's padding changes.
			//paint: "mrbr-ui-dialogs-events-paint",//	Occurs when the control is redrawn.
			//parentchanged: "mrbr-ui-dialogs-events-parentchanged",//	Occurs when the Parent property value changes.
			//previewkeydown: "mrbr-ui-dialogs-events-previewkeydown",//	Occurs before the KeyDown event when a key is pressed while focus is on this control.
			//queryaccessibilityhelp: "mrbr-ui-dialogs-events-queryaccessibilityhelp",//	Occurs when AccessibleObject is providing help to accessibility applications.
			//querycontinuedrag: "mrbr-ui-dialogs-events-querycontinuedrag",//	Occurs during a drag-and-drop operation and enables the drag source to determine whether the drag-and-drop operation should be canceled.
			//regionchanged: "mrbr-ui-dialogs-events-regionchanged",//	Occurs when the value of the Region property changes.
			resized: "mrbr-ui-dialogs-events-resized",//	Occurs when the control is resized.
			//resizebegin: "mrbr-ui-dialogs-events-resizebegin",//	Occurs when a form enters resizing mode.
			//resizeend: "mrbr-ui-dialogs-events-resizeend",//	Occurs when a form exits resizing mode.
			//righttoleftchanged: "mrbr-ui-dialogs-events-righttoleftchanged",//	Occurs when the RightToLeft property value changes.
			//righttoleftlayoutchanged: "mrbr-ui-dialogs-events-righttoleftlayoutchanged",//	Occurs after the value of the RightToLeftLayout property changes.
			//scroll: "mrbr-ui-dialogs-events-scroll",//	Occurs when the user or code scrolls through the client area.
			//shown: "mrbr-ui-dialogs-events-shown",//	Occurs whenever the form is first displayed.
			//sizechanged: "mrbr-ui-dialogs-events-sizechanged",//	Occurs when the Size property value changes.
			//stylechanged: "mrbr-ui-dialogs-events-stylechanged",//	Occurs when the control style changes.
			//systemcolorschanged: "mrbr-ui-dialogs-events-systemcolorschanged",//	Occurs when the system colors change.
			//tabindexchanged: "mrbr-ui-dialogs-events-tabindexchanged",//	Occurs when the value of the TabIndex property changes.
			//tabstopchanged: "mrbr-ui-dialogs-events-tabstopchanged",//	Occurs when the TabStop property changes.
			//textchanged: "mrbr-ui-dialogs-events-textchanged",//	Occurs when the Text property value changes.
			//validated: "mrbr-ui-dialogs-events-validated",//	Occurs when the control is finished validating.
			//validating: "mrbr-ui-dialogs-events-validating",//	Occurs when the control is validating.
			//visiblechanged: "mrbr-ui-dialogs-events-visiblechanged"//	Occurs when the Visible property value changes.
		}
	}
	connectedCallback() {
		const self = this;
		self.attachShadow({ mode: "open" });
		self.shadowRoot.innerHTML = self._template + self._template1;
		self.shadowRoot.querySelector(".mrbr-ui-dialogs-contentcontainer").innerHTML = self.contentTemplate;
		self._init();
	}
	maxSize() {

		const self = this,
			rect = self._getOffset(self),
			container = self.container || document.body;
		let arrMaxX = [
			container.scrollWidth,
			container.offsetWidth
		],
			arrMaxY = [
				container.scrollHeight,
				container.offsetHeight,
			];
		if (container.documentElement) {
			arrMaxX = arrMaxX.concat(
				[
					container.documentElement.clientWidth,
					container.documentElement.offsetWidth,
					container.documentElement.scrollWidth
				]);
			arrMaxY = arrMaxY.concat(
				[
					container.documentElement.clientHeight,
					container.documentElement.offsetHeight,
					container.documentElement.scrollHeight
				])
		}
		self._maxX = Math.max.apply(null, arrMaxX)
		const considerSelfTaskbarSize = self.taskbar.parentElement === self.parentElement;
		self._maxY = Math.max.apply(null, arrMaxY) - parseFloat(window.getComputedStyle(self).getPropertyValue("--default-control-border-width"));
		self._minX = Math.max(parseFloat(container.offsetLeft), isNaN(parseFloat(container.offsetX)) ? 0 : parseFloat(container.offsetX), isNaN(parseFloat(container.style.left)) ? 0 : parseFloat(container.style.left))
		self._minY = Math.max(parseFloat(container.offsetTop), isNaN(parseFloat(container.offsetY)) ? 0 : parseFloat(container.offsetY), isNaN(parseFloat(container.style.top)) ? 0 : parseFloat(container.style.top))
		return rect;
	}
	get eventHandler() { return this._eventHandler; }
	set eventHandler(value) { this._eventHandler = value; }
	_onMouseDown(event) {
		const self = this,
			eventHandler = this.eventHandler;

		if (!(self.isDraggableHeader(event) ||
			self === event.target ||
			self._dialogContent === event.target ||
			self._dialogContent.parentElement === event.target ||
			self._dialogButtonPane === event.target
		)) { return; }
		self._documentMouseMove_handle = eventHandler.add('mousemove', self._onMouseMove.bind(self), { target: document });
		self._documentMouseUp_handle = eventHandler.add('mouseup', self._onMouseUp.bind(self), { target: document });
		const rect = self.maxSize();
		if (rect.right > self._maxX) { self._maxX = rect.right; }
		if (rect.bottom > self._maxY) { self._maxY = rect.bottom; }
		self._startX = event.pageX 
		self._startY = event.pageY 
		self._startWidth = self.clientWidth;
		self._startHeight = self.clientHeight;
		self._leftPos = rect.left;
		self._topPos = rect.top;

		if (self.isDraggableHeader(event) && self._resizeMode == '') {
			self._setCursor("move");
			self._isDrag = true;
			self._dialogTitle.style.cursor = "move";
		}
		else if (self.windowState === "normal" && self._resizeMode != '') {
			const computedStyle = window.getComputedStyle(self);
			self.resizeState = {
				startX: event.pageX,
				startY: event.pageY,
				startLeft: self.offsetLeft,
				startTop: self.offsetTop,
				minX: self.container.offsetLeft,
				minY: self.container.offsetTop,
				maxX: self.container.offsetWidth,
				maxY: self.container.offsetHeight,

				minDeltaX: event.pageX - self.container.offsetLeft,
				minDeltaY: event.pageY - self.container.offsetTop,
				maxDeltaX: self.container.clientWidth + self.container.offsetLeft - event.pageX,
				maxDeltaY: self.container.clientHeight + self.container.offsetTop - event.pageY,

				startWidth: parseInt(self.clientWidth),
				startHeight: parseInt(self.clientHeight)
			}
			self._isResize = true;
		}
		if (self === event.target) {
			event.stopPropagation();
		}
		event.preventDefault();
	}
	resizeDelta(event) {
		const self = this;
		if (!self.resizeDelta || !event) { return { deltaX: 0, deltaY: 0 }; }
		return {
			deltaX: (event.pageX >= self.resizeState.minX ? event.pageX : self.resizeState.minX) - self.resizeState.startX,
			deltaY: (event.pageY >= self.resizeState.minY ? event.pageY : self.resizeState.minY) - self.resizeState.startY
		}

	}
	inElementBounds(event, element) {
		const rect = element.getBoundingClientRect(),
			x = event.clientX,
			y = event.clientY;
		return (x < rect.left || x >= rect.right) || (y < rect.top || y >= rect.bottom) ? false : true;
	}

	isDraggableHeader(event) {
		const self = this,
			target = event.target
		return self.windowState === "normal"
			&& (
				(target === self && self.inElementBounds(event, self._dialogTitle)) ||
				target === self._dialogTitle ||
				(target.parentElement && target.parentElement === self._dialogTitle) ||
				(target.parentElement && target.parentElement.parentElement && target.parentElement.parentElement === self._dialogTitle))
	}
	_onMouseMove(event) {
		const self = this;
		if (!(self.isDraggableHeader(event) ||

			self === event.target ||
			self._dialogContent === event.target ||
			self._dialogContent.parentElement === event.target ||
			self._dialogButtonPane === event.target) &&
			!self._isDrag &&
			self._resizeMode == '') {
			return;
		}
		const thisStyle = window.getComputedStyle(self),
			borderSize = parseFloat(thisStyle.getPropertyValue("--default-control-border-width")) * parseFloat(thisStyle.getPropertyValue("--default-size"));
		if (self._isDrag) {
			self.isDragging(event, borderSize);
		}
		else if (self._isResize) {
			self.isResizing(event);
		}

		else {
			self.setResizing(event);
		}
		event.preventDefault();
	};
	_dialog_resize(event) {
		const self = this,
			style = self.style,
			size = event.detail;
		if (!event || !event.detail || !event.detail) { return; }
		if (size.height && size.height >= self._minHeight) {
			if (size.height) { self._dialog_resize_size.height = size.height }
			if (size.top) { self._dialog_resize_size.top = size.top }
		}

		if (size.width && size.width >= self._minWidth) {
			if (size.width) { self._dialog_resize_size.width = size.width }
			if (size.left) { self._dialog_resize_size.left = size.left }
		}
		window.requestAnimationFrame(() => {
			if (size.height && size.height >= self._minHeight) {
				if (size.height) { style.height = `${size.height}px` }
				if (size.top) { style.top = `${size.top}px`; }
			}
			if (size.width && size.width >= self._minWidth) {
				if (size.width) { style.width = `${size.width}px` }
				if (size.left) { style.left = `${size.left}px`; }
			}
			self._dialog_resize_size = {
				left: null,
				top: null,
				width: null,
				height: null
			};
		});
	}

	setResizing(event) {
		const self = this;
		let cursorStyle, resizeMode = '';
		if (self.windowState === "normal" &&
			(self.isDraggableHeader(event) ||
				self === event.target ||
				self._dialogContent === event.target ||
				self._dialogContent.parentElement === event.target ||
				self._dialogButtonPane === event.target)) {
			let rect = self._getOffset(self);
			if (event.pageY - self._resizePixel < rect.top + self._resizePixel) {
				resizeMode = 'n';
			}
			else if (event.pageY + self._resizePixel > rect.bottom - self._resizePixel) {
				resizeMode = 's';
			}
			if (event.pageX - self._resizePixel < rect.left + self._resizePixel) {
				resizeMode += 'w';
			}
			else if (event.pageX + self._resizePixel > rect.right - self._resizePixel) {
				resizeMode += 'e';
			}
		}
		if (resizeMode !== '' && self._resizeMode !== resizeMode) {
			switch (resizeMode) {
				case "n":
				case "s":
					cursorStyle = 'ns-resize';
					break;
				case "e":
				case "w":
					cursorStyle = 'ew-resize';
					break;
				case "ne":
				case "sw":
					cursorStyle = 'nesw-resize';
					break;
				case "nw":
				case "se":
					cursorStyle = 'nwse-resize';
			}
			self._setCursor(cursorStyle);
			self._resizeMode = resizeMode;
		}
		else if (resizeMode === '' && self._resizeMode !== '') {
			self._setCursor('');
			self._resizeMode = '';
		}
		return resizeMode;
	}

	isResizing(event) {
		const self = this;
		self._resizeMode.split("").forEach(resizeType => {
			self[`resize_${resizeType}`](event)
		})

		self._setDialogContent();
	}
	resize_n(event) {
		const self = this,
			resizeState = self.resizeState,
			resizeDelta = self.resizeDelta(event);
		const dy = Math.min(resizeDelta.deltaY, resizeState.maxDeltaY);
		self.dispatchEvent(new CustomEvent("mrbr-ui-dialogs-dialog-resize", { detail: { height: resizeState.startHeight - dy, top: Math.max(resizeState.minY, resizeState.startTop + dy) } }))
	}
	resize_s(event) {
		const self = this,
			resizeState = self.resizeState,
			resizeDelta = self.resizeDelta(event);
		self.dispatchEvent(new CustomEvent("mrbr-ui-dialogs-dialog-resize", { detail: { height: resizeState.startHeight + Math.min(resizeDelta.deltaY, resizeState.maxDeltaY) } }))
	}

	resize_e(event) {
		const self = this,
			resizeState = self.resizeState,
			resizeDelta = self.resizeDelta(event);
		self.dispatchEvent(new CustomEvent("mrbr-ui-dialogs-dialog-resize", { detail: { width: resizeState.startWidth + Math.min(resizeDelta.deltaX, resizeState.maxDeltaX) } }))

	}
	resize_w(event) {
		const self = this,
			resizeState = self.resizeState,
			resizeDelta = self.resizeDelta(event);
		const dx = Math.min(resizeDelta.deltaX, resizeState.maxDeltaX);
		self.dispatchEvent(new CustomEvent("mrbr-ui-dialogs-dialog-resize", { detail: { width: resizeState.startWidth - dx, left: Math.max(resizeState.minX, resizeState.startLeft + dx) } }))
	}

	isDragging(event, borderSize) {
		const self = this, scrollSize = 32, sizeBuffer = 20,
			style = self.style;
		let deltaX = self._startX - event.pageX,
			deltaY = self._startY - event.pageY,
			left = self._leftPos - deltaX,
			top = self._topPos - deltaY,
			scrollLeft = Math.max(document.body.scrollLeft, document.documentElement.scrollLeft),
			scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
		if (deltaX < 0 && left + self._startWidth + borderSize * 2 > self._maxX + self._minX) { left = self._maxX - (self._startWidth + borderSize * 4 + 2) + self._minX; }
		else if (deltaX > 0 && left < self._minX) { left = self._minX; }

		if (deltaY < 0 && top + self._startHeight + borderSize * 2 > self._maxY + self._minY) { top = self._maxY - (self._startHeight + borderSize * 4 + 2) + self._minY }
		else if (deltaY > 0 && top < self._minY) { top = self._minY; }

		self._setCursor("move");
		self._dialogTitle.style.cursor = "move";

		if (left + self._startWidth + borderSize * 2 > self._maxX + self._minX) { left = self._maxX - (self._startWidth + borderSize * 4 + 1); }
		if (top + self._startHeight + borderSize * 2 > self._maxY + self._minY) { top = self._maxY - (self._startHeight + borderSize * 4 + 1); }
		style.left = `${left}px`;
		style.top = `${top}px`;
		if (event.clientY > window.innerHeight - scrollSize) { scrollTop += scrollSize; }
		else if (event.clientY < scrollSize) { scrollTop -= scrollSize; }
		if (event.clientX > window.innerWidth - scrollSize) { scrollLeft += scrollSize; }
		else if (event.clientX < scrollSize) { scrollLeft -= scrollSize; }
		if (top + self._startHeight == self._maxY) { scrollTop = self._maxY - window.innerHeight + sizeBuffer; }
		else if (top == 0) { scrollTop = 0; }
		if (left + self._startWidth == self._maxX) { scrollLeft = self._maxX - window.innerWidth + sizeBuffer; }
		else if (left == 0) { scrollLeft = 0; }
		if (self._startHeight > window.innerHeight) {
			if (event.clientY < window.innerHeight / 2) { scrollTop = 0; }
			else { scrollTop = self._maxY - window.innerHeight + sizeBuffer; }
		}
		if (self._startWidth > window.innerWidth) {
			if (event.clientX < window.innerWidth / 2) { scrollLeft = 0; }
			else { scrollLeft = self._maxX - window.innerWidth + sizeBuffer; }
		}
		window.scrollTo(scrollLeft, scrollTop);
	}

	_onMouseUp(event) {
		const self = this,
			eventHandler = self.eventHandler;
		if (!(self.isDraggableHeader(event) || self._dialogButtonPane === event.target) && !self._isDrag && self._resizeMode == '') { return; }
		self._documentMouseMove_handle = eventHandler.remove(self._documentMouseMove_handle);
		self._documentMouseUp_handle = eventHandler.remove(self._documentMouseUp_handle);
		if (self._isDrag) {
			self._setCursor('');
			self._isDrag = false;
			self._dialogTitle.style.cursor = "";
		}
		else if (self._isResize) {
			self._setCursor('');
			self._isResize = false;
			self._resizeMode = '';
		}
		event.preventDefault();
		event.stopPropagation();
	}
	_getOffset(element) {
		var rect = element.getBoundingClientRect(),
			offsetX = self.parentElement && this.parentElement.scrollX || 0,
			offsetY = self.parentElement && this.parentElement.scrollY || 0;
		return {
			left: rect.left + offsetX,
			top: rect.top + offsetY,
			right: rect.right + offsetX,
			bottom: rect.bottom + offsetY
		}
	}

	_setCursor(cursor) {
		const self = this;
		self.style.cursor = cursor;
		self._dialogTitle.style.cursor = cursor;
		self._buttons[0].style.cursor = cursor;
	}

	_setDialogContent() {
		const self = this,
			_dialogContentStyle = window.getComputedStyle(self._dialogContent);
		let _dialogButtonPaneStyle,
			_dialogButtonPaneStyleBefore;
		if (self._buttons.length > 1) {
			_dialogButtonPaneStyle = window.getComputedStyle(self._dialogButtonPane);
			_dialogButtonPaneStyleBefore = window.getComputedStyle(self._dialogButtonPane, ":before");
		}
		const considerSelfTaskbarSize = self.taskbar && self.taskbar.parentElement === self.parentElement;
		let bottom = + (parseFloat(_dialogContentStyle.getPropertyValue("--default-control-padding")) * parseFloat(_dialogContentStyle.getPropertyValue("--default-size"))) * 2
			+ self._dialogContent.offsetHeight - self._dialogContent.clientHeight
			+ considerSelfTaskbarSize ? parseInt(_dialogButtonPaneStyleBefore.borderBottom ? _dialogButtonPaneStyleBefore.borderBottom : "0") * 2
			+ (self._buttons.length > 1 ?
				- parseInt(_dialogButtonPaneStyleBefore.top)
				+ parseInt(_dialogButtonPaneStyle.height)
				+ parseInt(_dialogButtonPaneStyle.bottom)
				: 0) : 0
		self._dialogContent.style.bottom = `${bottom}px`
	}
	showDialog() {
		const self = this;
		self.style.display = 'block';
	}
	createTaskBar() {
		const self = this;
		if (self.taskbar !== undefined || !self.taskbarContainer) {return;}
		let taskbar = self.taskbarContainer.querySelector(".mrbr-ui-dialogs-taskbar");
		if (taskbar !== null) {
			this.taskbar = taskbar;
			self.createTaskbarButton();
			const desktop = document.getElementsByTagName("mrbr-ui-containers-desktop");
			if (desktop && desktop[0]) {
				self._desktopNavlocationChange_handle = self.eventHandler.add("mrbr-ui-desktop-navlocation-change", function (event) {
					self.taskbar.setAttribute("navlocation", event.detail);
					if (self.windowState === "maximised") {
						self.window_resizing(event);
					}
				}, { target: desktop[0] })
			}
			return;
		}
		taskbar = document.createElement("div");
		taskbar.classList.add("mrbr-ui-dialogs-taskbar")
		self.taskbar = taskbar;
		self.taskbarContainer.appendChild(self.taskbar);
		self.createTaskbarButton()
	}
	_init() {
		const self = this,
			style = self.style,
			eventHandler = self.eventHandler;
		style.visibility = 'hidden';
		style.display = 'block';
		self._dialogTitle = self.shadowRoot.querySelector('.mrbr-ui-dialogs-titlebar');

		self._dialogContent = self.shadowRoot.querySelector('.mrbr-ui-dialogs-content');
		self._dialogButtonPane = self.shadowRoot.querySelector('.mrbr-ui-dialogs-buttonbar');
		self._buttons = self.shadowRoot.querySelectorAll('button');
		let buttonsetStyle = window.getComputedStyle(self._dialogButtonPane.querySelector('.mrbr-ui-dialogs-buttonset')),
			buttonSetStyleWidth = parseFloat(buttonsetStyle.width);
		let _dialogContentStyle = window.getComputedStyle(self._dialogContent);
		self._minWidth = Math.max(self.clientWidth, self._minWidth, buttonSetStyleWidth);
		style.width = `${self._minWidth}px`;

		style.height = self._minHeight + 'px';

		self._setDialogContent();
		style.left = ((window.innerWidth - self.clientWidth) / 2) + 'px';
		style.top = ((window.innerHeight - self.clientHeight) / 2) + 'px';

		style.display = 'none';
		style.visibility = 'visible';

		self._dialogContent.childNodes[0].tabIndex = '0';
		const controlboxRight = self.shadowRoot.querySelector(".mrbr-ui-dialogs-titlebar .mrbr-ui-dialogs-controlbox-right");
		self.setSVGColour(".mrbr-ui-dialogs-titlebar .mrbr-ui-dialogs-controlbox-left .mrbr-ui-dialogs-icon");
		self._resizePixel = 2 * ((parseFloat(_dialogContentStyle.getPropertyValue("--default-control-padding")) * parseFloat(_dialogContentStyle.getPropertyValue("--default-size"))) + parseFloat(_dialogContentStyle.getPropertyValue("--default-control-border-width")));
		self.wireEvents();
		self.createTaskBar();
		self.setTitle();
		self.classList.add("mrbr-ui-dialog-visible");
	}
	setTitle() {
		const self = this;
		let mrbrUiDialogsTitle = self.shadowRoot.querySelector(".mrbr-ui-dialogs-title");
		if (!mrbrUiDialogsTitle || !self.title) { return; }
		mrbrUiDialogsTitle.innerHTML = "";
		mrbrUiDialogsTitle.appendChild(document.createTextNode(self.title));

		if (!self.taskbarButton) {return; }
		self.taskbarButton.querySelector(".mrbr-ui-dialogs-taskbarbutton-title").appendChild(document.createTextNode(self.title));

	}
	wireEvents() {
		const self = this,
			eventHandler = self.eventHandler,
			controlboxRight = self.shadowRoot.querySelector(".mrbr-ui-dialogs-titlebar .mrbr-ui-dialogs-controlbox-right");
		self._controlboxButton_click_handle = [];
		self._dialogMouseDown_handle = eventHandler.add('mousedown', self._onMouseDown.bind(self), { target: self });
		self._dialog_mouseMove_handle = eventHandler.add('mousemove', self._onMouseMove.bind(self), { target: self });

		if (controlboxRight !== undefined) {
			[
				controlboxRight.querySelector("button[name='mrbr-ui-dialogs-controlbox-min']"),
				controlboxRight.querySelector("button[name='mrbr-ui-dialogs-controlbox-max']"),
				controlboxRight.querySelector("button[name='mrbr-ui-dialogs-controlbox-close']")
			].forEach(btn => {
				if (btn === undefined) { return; }
				self.controlboxButtons.push(btn);
				self._controlboxButton_click_handle[btn.name] = eventHandler.add("click", self.controlboxButton_click.bind(self), { target: btn });
			})
			self._controlboxClick_handle = eventHandler.add("controlbox_click", self.controlboxClick.bind(self), { target: self })
		}
		self._minimised_handle = eventHandler.add(Mrbr.UI.Dialogs.Dialog.EVENTS.minimised, self.minimised.bind(self), { target: self })
		self._maximised_handle = eventHandler.add(Mrbr.UI.Dialogs.Dialog.EVENTS.maximised, self.maximised.bind(self), { target: self })
		self._closing_handle = eventHandler.add(Mrbr.UI.Dialogs.Dialog.EVENTS.closing, self.closing.bind(self), { target: self })
		self._mousedown_handle = eventHandler.add("mousedown", event => {
			self.dispatchEvent(new CustomEvent("mrbr-control-layer-focused", { bubbles: true, composed: true, detail: { source: self } }));
		});
		self.dispatchEvent(new CustomEvent("mrbr-control-layer-register", { bubbles: true, composed: true, detail: { source: self } }));
		self.dispatchEvent(new CustomEvent("mrbr-control-layer-focused", { bubbles: true, composed: true, detail: { source: self } }));
		self._titleChange_handle = eventHandler.add("mrbr-ui-dialogs-title-change", self.setTitle.bind(self), { target: self })
		self._dialog_resize_handler = eventHandler.add("mrbr-ui-dialogs-dialog-resize", self._dialog_resize.bind(self), { target: self })
	}
	controlboxButton_click(event) {
		this.dispatchEvent(new CustomEvent("controlbox_click", { 'detail': event.target }));
	}
	controlboxClick(event) {
		const self = this,
			button = event.detail;
		switch (button.name) {
			case "mrbr-ui-dialogs-controlbox-min":
				window.requestAnimationFrame(() => self.dispatchEvent(new CustomEvent(Mrbr.UI.Dialogs.Dialog.EVENTS.minimised, { detail: { event } })))
				break;
			case "mrbr-ui-dialogs-controlbox-max":
				window.requestAnimationFrame(() => self.dispatchEvent(new CustomEvent(Mrbr.UI.Dialogs.Dialog.EVENTS.maximised, { detail: { event } })))
				break;
			case "mrbr-ui-dialogs-controlbox-close":
				window.requestAnimationFrame(() => self.dispatchEvent(new CustomEvent(Mrbr.UI.Dialogs.Dialog.EVENTS.closing, { detail: { event, cancelClose: false } })))
				break;
		}
	}
	minimised(event) {
		const self = this;
		const window_getComputedStyle = window.getComputedStyle;
		if (self.windowState !== "minimised") {
			self.lastWindowState = self.windowState;
		}
		self.windowState = "minimised";
		self.classList.remove("mrbr-ui-dialog-visible");
		self.classList.add("mrbr-ui-dialog-hidden");
		((fn, last) => fn(fn, last))((fn, last) => {
			window.requestAnimationFrame(() => {
				let opacity = window_getComputedStyle(self).getPropertyValue("opacity");
				if (opacity > last) { return; }
				(opacity > 0.1) ? fn(fn, opacity) : (() => {
					let self_style_display = self.style.display;
					self.style.display = "none";
					const showDialog = () => {
						self.style.display = self_style_display;
						self.style.opacity = window_getComputedStyle(self).getPropertyValue("opacity");
						self.classList.remove("mrbr-ui-dialog-hidden");
						self.style.opacity = "";
						self.classList.add("mrbr-ui-dialog-visible");
						self._taskbarButtonClick_showDialog_handle = self.eventHandler.remove(self._taskbarButtonClick_showDialog_handle);
						self.windowState = self.lastWindowState;
						self.dispatchEvent(new CustomEvent("mrbr-control-layer-focused", { bubbles: true, composed: true, detail: { source: self } }));
					}
					self._taskbarButtonClick_showDialog_handle = self.eventHandler.add("click", showDialog, { target: self.taskbarButton })
				})();
			})
		})
	}
	createTaskbarButton() {
		const self = this,
			window_getComputedStyle = window.getComputedStyle;
		self.taskbarButton = document.createElement("div");
		self.taskbarButton.classList.add("taskbarbutton");
		self.taskbarButton.innerHTML = `<div>
			<div class="mrbr-ui-dialogs-icon"></div>
		<div class="mrbr-ui-dialogs-taskbarbutton-title"></div>
			<button name="mrbr-ui-dialogs-controlbox-close"></button>
		</div>`
		self.taskbarButton.classList.add("mrbr-ui-dialog-visible");

		let target = self.taskbarButton.querySelector(".mrbr-ui-dialogs-icon");
		let source = self.shadowRoot.querySelector(".mrbr-ui-dialogs-titlebar .mrbr-ui-dialogs-controlbox-left .mrbr-ui-dialogs-icon");
		target.style.backgroundImage = window_getComputedStyle(source).backgroundImage;
		self.setSVGColour(".mrbr-ui-dialogs-icon", self.taskbarButton)

		target = self.taskbarButton.querySelector("div > button[name='mrbr-ui-dialogs-controlbox-close']");
		source = self.shadowRoot.querySelector(".mrbr-ui-dialogs-titlebar button[name='mrbr-ui-dialogs-controlbox-close']");
		target.style.backgroundImage = window_getComputedStyle(source).backgroundImage;
		self.setSVGColour("div > button[name='mrbr-ui-dialogs-controlbox-close']", self.taskbarButton)
		self.taskbar.appendChild(self.taskbarButton);
		source.addEventListener("click", () => {
			window.requestAnimationFrame(() => self.taskbarButton.dispatchEvent(new CustomEvent(Mrbr.UI.Dialogs.Dialog.EVENTS.closing, { detail: { event, cancelClose: false } })))
		})
		self._taskbarButton_click = self.eventHandler.add("click", event => {
			if (event.target === target) {
				self.dispatchEvent(new CustomEvent(Mrbr.UI.Dialogs.Dialog.EVENTS.closing, { detail: { event, cancelClose: false } }));
				event.stopPropagation();
			}
			else if (self.windowState === "normal") {
				self.dispatchEvent(new CustomEvent(Mrbr.UI.Dialogs.Dialog.EVENTS.minimised, {}))
			}
		}, { target: self.taskbarButton });
		self.setTitle();
	}
	removeTaskbarButton() {
		const self = this;
		if (!self.taskbarButton) { return; }
		let parentElement = self.taskbarButton.parentElement;
		parentElement.removeChild(self.taskbarButton);
	}
	maximised(event) {
		const self = this,
			window_getComputedStyle = window.getComputedStyle;

		if (self.windowState === "normal") {
			self.stateSize = {
				width: self.style.width,
				left: self.style.left,
				height: self.style.height,
				top: self.style.top
			}
			self.classList.add("mrbr-ui-dialog-hidden");
			self.classList.remove("mrbr-ui-dialog-visible");
			((fn, last) => fn(fn, last))((fn, last) => {
				window.requestAnimationFrame(() => {
					let opacity = window_getComputedStyle(self).getPropertyValue("opacity");
					if (opacity > last) { return; }
					(opacity > 0.1) ? fn(fn, opacity) : (() => {
						self.maximiseDialog.bind(self)(event);
						self.classList.add("mrbr-ui-dialog-visible");
						self.classList.remove("mrbr-ui-dialog-hidden");
					})()
				})
			})
			self._windowResize_handle = self.eventHandler.add("resize", self.window_resizing.bind(self), { target: window })
		}
		else {
			self.classList.add("mrbr-ui-dialog-hidden");
			self.classList.remove("mrbr-ui-dialog-visible");
			((fn, last) => fn(fn, last))((fn, last) => {
				window.requestAnimationFrame(() => {
					let opacity = window_getComputedStyle(self).getPropertyValue("opacity");
					if (opacity > last) { return; }
					(opacity > 0.1) ? fn(fn, opacity) : (() => {
						self.restoreDialog.bind(self)(event);
						self.classList.add("mrbr-ui-dialog-visible");
						self.classList.remove("mrbr-ui-dialog-hidden");
					})()
				})
			})
			window.removeEventListener("resize", self.window_resizing)
		}
	}
	restoreDialog(event) {
		const self = this;
		self.style.width = self.stateSize.width;
		self.style.left = self.stateSize.left;
		self.style.height = self.stateSize.height;
		self.style.top = self.stateSize.top;
		self.windowState = "normal";
	}

	maximiseDialog(event) {
		const self = this;

		self.style.width = `${self._maxX}px`;
		self.style.left = `${self._minX}px`;
		self.style.height = `${self._maxY}px`;
		self.style.top = `${self._minY}px`;
		self.windowState = "maximised";
	}
	window_resizing() {
		const self = this;
		self.maxSize();
		self.maximiseDialog.bind(self)(event)
	}

	closing(closingArgs, preload = true) {
		const self = this;
		if ((typeof closingArgs).toLowerCase() === "function") {
			self._closing.push({ fn: closingArgs, preload });
			return;
		}
		self._closing.filter(fnClosing => fnClosing.preload).forEach(fnClosing => fnClosing.fn(closingArgs));
		if (event.detail.cancelClose === true) {
			return;
		}
		self.close(event);
		self._closing.filter(fnClosing => !fnClosing.preload).forEach(fnClosing => fnClosing.fn(closingArgs));

	}
	close(event) {
		const self = this,
			window_getComputedStyle = window.getComputedStyle;
		self.classList.remove("mrbr-ui-dialog-visible");
		self.classList.add("mrbr-ui-dialog-hidden");
		if (self.taskbarButton) {
			self.taskbarButton.classList.remove("mrbr-ui-dialog-visible");
			self.taskbarButton.classList.add("mrbr-ui-dialog-hidden");
		}
		((fn, last) => fn(fn, last))((fn, last) => {
			window.requestAnimationFrame(() => {
				let opacity = window_getComputedStyle(this).getPropertyValue("opacity");
				if (opacity > last) { return; }
				(opacity > 0.1) ? fn(fn, opacity) : (() => {
					self.style.display = "none";
					if (self.taskbarButton) {
						self.taskbarButton.style.display = "none";
					}
					self.dispatchEvent(new CustomEvent(Mrbr.UI.Dialogs.Dialog.EVENTS.closed, { details: { source: self } }))
				})();
			})
		})
	}
	destroy() {
		let self = this;
		window.requestAnimationFrame(() => {
			self.eventHandler.removeAll();
			self.removeTaskbarButton();
			self.parentElement.removeChild(this);
			self = null;
		});
	}
	setSVGColour(selector, self) {

		window.requestAnimationFrame(() => {

			self = self || this;
			let selected = (self.shadowRoot) ? self.shadowRoot.querySelector(selector) : self.querySelector(selector),
				computedStyle = window.getComputedStyle(selected);
			let cssUrl = computedStyle.backgroundImage;
			if (cssUrl === undefined) { return; }
			const urlRegex = /url\((?:'|\")data:image\/svg\+xml;utf8,(.+?)(?:'|\")\)|url\(\"(.+?)\"\)/i;
			let m,
				backgroundImageUrl,
				isDataUrl = false;
			if ((m = urlRegex.exec(cssUrl)) !== null) {
				if (m[1] && m[1].length > 0) {
					backgroundImageUrl = m[1].trim();
					isDataUrl = true;
				}
				else if (m[2] && m[2].length > 0) {
					backgroundImageUrl = m[2].trim();
				}
			}
			else {
				return;
			}
			let colour = computedStyle.color,
				stroke = computedStyle.stroke,
				fill = computedStyle.fill;
			if (colour === undefined || colour === "none") { colour = null; }
			if (stroke === undefined || stroke.toString() === "none") { stroke = colour };
			if (fill === undefined || fill.toString() === "none") { fill = colour; }
			if (!colour && !stroke && !fill) {
				return;
			}
			if (!isDataUrl) {
				if (!backgroundImageUrl.endsWith(".svg")) {
					return;
				}
				else {
					fetch(backgroundImageUrl)
						.then(response => response.text())
						.then(text => (new window.DOMParser()).parseFromString(text, "text/xml"))
						.then(data => {
							let svg = data.childNodes[0],
								script = svg.getElementsByTagName("script")[0];
							if (script) {
								svg.removeChild(script);
							}
							let paths = svg.getElementsByTagName("path");
							if (paths && paths.length > 0) {
								for (let pathCounter = 0, pathCount = paths.length; pathCounter < pathCount; pathCounter++) {
									paths[pathCounter].setAttribute("fill", fill);
									paths[pathCounter].setAttribute("stroke", stroke);
								}
							}
							const dataUrl = `url('data:image/svg+xml;utf8,${new XMLSerializer().serializeToString(svg).replace(/\n|\r\n|\n\r/g, "")}')`
							window.requestAnimationFrame(() => { selected.style.backgroundImage = dataUrl })
						})
						.catch(error => self.dispatchEvent(new CustomEvent("exception", { details: { source: "setSVGColour", error: error } })))
				}
			}
			else {
				try {
					let data = new window.DOMParser()
						.parseFromString(backgroundImageUrl.replace(/\\\"/g, "\"").replace(/\\\'/g, "\'"), "text/xml")
					let svg = data.childNodes[0],
						script = svg.getElementsByTagName("script")[0];
					if (script) {
						svg.removeChild(script);
					}
					let paths = data.getElementsByTagName("path");
					if (paths && paths.length > 0) {
						for (let pathCounter = 0, pathCount = paths.length; pathCounter < pathCount; pathCounter++) {
							paths[pathCounter].setAttribute("fill", fill);
							paths[pathCounter].setAttribute("stroke", stroke);
						}
					}
					const dataUrl = `url('data:image/svg+xml;utf8,${new XMLSerializer().serializeToString(svg).replace(/(\<!--.*?\-->)/g, "").replace(/\n|\r\n|\n\r/g, "")}')`
					window.requestAnimationFrame(() => { selected.style.backgroundImage = dataUrl })
				} catch (error) {
					self.dispatchEvent(new CustomEvent("exception", { details: { source: "setSVGColour", error: error } }));
				}
			}
		})
	}
	set windowState(value) {
		this.setAttribute("windowstate", value)
	}
	get windowState() {
		if (!this.hasAttribute("windowstate")) {
			this.setAttribute("windowstate", "normal")
		}
		return this.getAttribute("windowstate");
	}
}