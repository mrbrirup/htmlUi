class extends HTMLElement {
	constructor() {
		super();
		this._minWidth = 100;
		this._minHeight = 1;
		this._resizePixel = 5;
		this._parent;
		this._dialogTitle;
		this._dialogContent;
		this._dialogButtonPane;
		this._maxX;
		this._maxY;
		this._startX;
		this._startY;
		this._startWidth;
		this._startHeight;
		this._leftPos;
		this._topPos;
		this._isDrag = false;
		this._isResize = false;
		this._resizeMode = '';
		this._buttons;
		// this._zIndex;
		// this._zIndexFlag = false;
		this._setDialogContent;
		this.controlboxButtons = [];
		this._container = null;
		this._taskbarContainer = null;
		this._closing = [];
	}
	get taskbarContainer() { return this._taskbarContainer }
	set taskbarContainer(value) {
		const this_taskbarContainer = this._taskbarContainer;
		this._taskbarContainer = value;
		if (!this_taskbarContainer) {
			this.createTaskBar();
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
		self.innerHTML = `	<div class="mrbr-ui-dialogs-titlebar">
		<div class="mrbr-ui-dialogs-controlbox-left">
			<div class="mrbr-ui-dialogs-icon"></div>
		</div>
		<div class="mrbr-ui-dialogs-controlbox-centre">
		<div>Hello</div>
		</div>
		<div class="mrbr-ui-dialogs-controlbox-right">
			<button name="mrbr-ui-dialogs-controlbox-min"></button>
			<button name="mrbr-ui-dialogs-controlbox-max"></button>
			<button name="mrbr-ui-dialogs-controlbox-close"></button>
		</div>
		</div>
		<div class="mrbr-ui-dialogs-content">
			<div class="mrbr-ui-dialogs-contentcontainer">
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
			</div>
		</div>
		<div class="mrbr-ui-dialogs-buttonbar">
			<div class="mrbr-ui-dialogs-buttonset">
				<button name="ok">OK</button>
				<button name="cancel">Cancel</button>
			</div>
		</div>`
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
		self._maxY = Math.max.apply(null, arrMaxY) - (considerSelfTaskbarSize ? parseFloat(self.taskbar.clientHeight) : 0) - parseFloat(window.getComputedStyle(self).getPropertyValue("--default-control-border-width"));
		//self._minX = Math.max(parseFloat(container.clientWidth), parseFloat(container.offsetX), parseFloat(container.style.left))
		self._minX = Math.max(parseFloat(container.offsetLeft), isNaN(parseFloat(container.offsetX)) ? 0 : parseFloat(container.offsetX), isNaN(parseFloat(container.style.left)) ? 0 : parseFloat(container.style.left))
		self._minY = Math.max(parseFloat(container.offsetTop), isNaN(parseFloat(container.offsetY)) ? 0 : parseFloat(container.offsetY), isNaN(parseFloat(container.style.top)) ? 0 : parseFloat(container.style.top))
		//debugger
		return rect;
	}
	_onMouseDown(evt) {
		const self = this;
		//self._zIndexFlag = true;
		if (!(self.isDraggableHeader(evt.target) ||
			self._dialogContent === evt.target ||
			self._dialogContent.parentElement === evt.target ||
			self._dialogButtonPane === evt.target
		)) { return; }
		document.addEventListener('mousemove', self._onMouseMove.bind(self));
		document.addEventListener('mouseup', self._onMouseUp.bind(self));
		const rect = self.maxSize();
		if (rect.right > self._maxX) { self._maxX = rect.right; }
		if (rect.bottom > self._maxY) { self._maxY = rect.bottom; }
		self._startX = evt.pageX;
		self._startY = evt.pageY;
		self._startWidth = self.clientWidth;
		self._startHeight = self.clientHeight;
		self._leftPos = rect.left;
		self._topPos = rect.top;
		if (self.isDraggableHeader(evt.target) && self._resizeMode == '') {
			self._setCursor('move');
			self._isDrag = true;
		}
		else if (self.windowState === "normal" && self._resizeMode != '') {
			self._isResize = true;
		}
		if (self === evt.target) {
			evt.stopPropagation();
		}
		evt.preventDefault();
	}
	isDraggableHeader(target) {
		const self = this;
		return self.windowState === "normal"
			&& (
				target === self._dialogTitle ||
				(target.parentElement && target.parentElement === self._dialogTitle) ||
				(target.parentElement && target.parentElement.parentElement && target.parentElement.parentElement === self._dialogTitle))
	}
	_onMouseMove(evt) {
		const self = this;
		if (!(self.isDraggableHeader(evt.target) ||
			self._dialogContent === evt.target ||
			self._dialogContent.parentElement === evt.target ||
			self._dialogButtonPane === evt.target) &&
			!self._isDrag &&
			self._resizeMode == '') { return; }
		const thisStyle = window.getComputedStyle(self),
			borderSize = parseFloat(thisStyle.getPropertyValue("--default-control-border-width")) * parseFloat(thisStyle.getPropertyValue("--default-size"));
		if (self._isDrag) {
			self.isDragging(evt, borderSize);
		}
		else if (self._isResize) {
			self.isResizing(evt);
		}
		else if (evt.target.tagName.toLowerCase() !== 'button') {
			self.setResizing(evt);
		}
		if (evt.target === self) {
			evt.stopPropagation();
		}
		evt.preventDefault();
	};

	setResizing(evt) {
		const self = this;
		let cursorStyle, resizeMode = '';
		if (self.windowState === "normal" &&
			(self.isDraggableHeader(evt.target) ||
				self._dialogContent === evt.target ||
				self._dialogContent.parentElement === evt.target ||
				self._dialogButtonPane === evt.target)) {
			let rect = self._getOffset(self);
			if (evt.pageY < rect.top + self._resizePixel) {
				resizeMode = 'n';
			}
			else if (evt.pageY > rect.bottom - self._resizePixel) {
				resizeMode = 's';
			}
			if (evt.pageX < rect.left + self._resizePixel) {
				resizeMode += 'w';
			}
			else if (evt.pageX > rect.right - self._resizePixel) {
				resizeMode += 'e';
			}
		}
		if (resizeMode !== '' && self._resizeMode !== resizeMode) {
			if (resizeMode === 'n' || resizeMode === 's')
				cursorStyle = 'ns-resize';
			else if (resizeMode === 'e' || resizeMode === 'w')
				cursorStyle = 'ew-resize';
			else if (resizeMode === 'ne' || resizeMode === 'sw')
				cursorStyle = 'nesw-resize';
			else if (resizeMode === 'nw' || resizeMode === 'se')
				cursorStyle = 'nwse-resize';
			self._setCursor(cursorStyle);
			self._resizeMode = resizeMode;
		}
		else if (resizeMode === '' && self._resizeMode !== '') {
			self._setCursor('');
			self._resizeMode = '';
		}
		return resizeMode;
	}

	isResizing(evt) {
		const self = this;
		self[`resize_${self._resizeMode}`](evt)
		self._setDialogContent();
	}

	resize_se(evt) {
		const self = this,
			style = self.style;
		let dw, dh, w, h;
		dw = evt.pageX - self._startX;
		dh = evt.pageY - self._startY;
		if (self._leftPos + self._startWidth + dw > self._maxX) {
			dw = self._maxX - self._leftPos - self._startW;
		}
		if (self._topPos + self._startHeight + dh > self._maxY) {
			dh = self._maxY - self._topPos - self._startH;
		}
		w = self._startWidth + dw;
		h = self._startHeight + dh;
		if (w < self._minWidth) {
			w = self._minWidth;
		}
		if (h < self._minHeight) {
			h = self._minHeight;
		}
		style.width = `${w}px`;
		style.height = `${h}px`;
	}

	resize_ne(evt) {
		const self = this,
			style = self.style;
		let dw, dh, w, h;
		dw = evt.pageX - self._startX;
		dh = self._startY - evt.pageY;
		if (self._leftPos + self._startWidth + dw > self._maxX) {
			dw = self._maxX - self._leftPos - self._startW;
		}
		if (self._topPos - dh < 0) {
			dh = self._topPos;
		}
		w = self._startWidth + dw;
		h = self._startHeight + dh;
		if (w < self._minWidth) {
			w = self._minWidth;
		}
		if (h < self._minHeight) {
			h = self._minHeight;
			dh = h - self._startH;
		}
		style.width = `${w}px`;
		style.height = `${h}px`;
		style.top = `${(self._topPos - dh)}px`;
	}

	resize_sw(evt) {
		const self = this,
			style = self.style;
		let dw, dh, w, h;
		dw = self._startX - evt.pageX;
		dh = evt.pageY - self._startY;
		if (self._leftPos - dw < 0) {
			dw = self._leftPos;
		}
		if (self._topPos + self._startHeight + dh > self._maxY) {
			dh = self._maxY - self._topPos - self._startH;
		}
		w = self._startWidth + dw;
		h = self._startHeight + dh;
		if (w < self._minWidth) {
			w = self._minWidth;
			dw = w - self._startW;
		}
		if (h < self._minHeight) {
			h = self._minHeight;
		}
		style.width = `${w}px`;
		style.height = `${h}px`;
		style.left = `${(self._leftPos - dw)}px`;
	}

	resize_nw(evt) {
		const self = this,
			style = self.style;
		let dw, dh, w, h;
		dw = self._startX - evt.pageX;
		dh = self._startY - evt.pageY;
		if (self._leftPos - dw < 0) {
			dw = self._leftPos;
		}
		if (self._topPos - dh < 0) {
			dh = self._topPos;
		}
		w = self._startWidth + dw;
		h = self._startHeight + dh;
		if (w < self._minWidth) {
			w = self._minWidth;
			dw = w - self._startW;
		}
		if (h < self._minHeight) {
			h = self._minHeight;
			dh = h - self._startH;
		}
		style.width = `${w}px`;
		style.height = `${h}px`;
		style.left = `${(self._leftPos - dw)}px`;
		style.top = `${(self._topPos - dh)}px`;
	}

	resize_s(evt) {
		const self = this,
			style = self.style;
		let dh, h;
		dh = evt.pageY - self._startY;
		if (self._topPos + self._startHeight + dh > self._maxY)
			dh = self._maxY - self._topPos - self._startH;
		h = self._startHeight + dh;
		if (h < self._minHeight) {
			h = self._minHeight;
		}
		style.height = `${h}px`;
	}

	resize_n(evt) {
		const self = this,
			style = self.style;
		let dh, h;
		dh = self._startY - evt.pageY;
		if (self._topPos - dh < 0)
			dh = self._topPos;
		h = self._startHeight + dh;
		if (h < self._minHeight) {
			h = self._minHeight;
			dh = h - self._startH;
		}
		style.height = `${h}px`;
		style.top = `${(self._topPos - dh)}px`;
	}

	resize_e(evt) {
		const self = this,
			style = self.style;
		let dw, w;
		dw = evt.pageX - self._startX;
		if (self._leftPos + self._startWidth + dw > self._maxX) { dw = self._maxX - self._leftPos - self._startW; }
		w = self._startWidth + dw;
		if (w < self._minWidth) {
			w = self._minWidth;
		}
		style.width = `${w}px`;
	}

	resize_w(evt) {
		const self = this,
			style = self.style;
		let dw, w;
		dw = self._startX - evt.pageX;
		if (self._leftPos - dw < 0)
			dw = self._leftPos;
		w = self._startWidth + dw;
		if (w < self._minWidth) {
			w = self._minWidth;
			dw = w - self._startW;
		}
		style.width = `${w}px`;
		style.left = `${(self._leftPos - dw)}px`;
	}

	isDragging(evt, borderSize) {
		const self = this, scrollSize = 32, sizeBuffer = 20,
			style = self.style;
		let dx = self._startX - evt.pageX ,
			dy = self._startY - evt.pageY,
			left = self._leftPos - dx,
			top = self._topPos - dy,
			scrollL = Math.max(document.body.scrollLeft, document.documentElement.scrollLeft),
			scrollT = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
		if (dx < 0 && left + self._startWidth + borderSize * 2 > self._maxX + self._minX  ) { left = self._maxX - (self._startWidth + borderSize * 4 + 2) + self._minX ; }
		else if (dx > 0 && left < self._minX) { left = self._minX; }

		if (dy < 0 && top + self._startHeight + borderSize * 2 > self._maxY + self._minY) { top = self._maxY - (self._startHeight  + borderSize * 4 + 2); + self._minY }
		else if (dy > 0 && top < self._minY) { top = self._minY; }


		if (left 	+ self._startWidth 	+ borderSize * 2 > self._maxX + self._minX 	) { left 	= self._maxX - (self._startWidth 	+ borderSize * 4 + 1); }
		if (top 	+ self._startHeight + borderSize * 2 > self._maxY + self._minY	) { top 	= self._maxY - (self._startHeight 	+ borderSize * 4 + 1); }
		style.left = `${left}px`;
		style.top = `${top}px`;
		// if (evt.clientY > window.innerHeight - scrollSize) { scrollT += scrollSize; }
		// else if (evt.clientY < scrollSize) { scrollT -= scrollSize; }
		// if (evt.clientX > window.innerWidth - scrollSize) { scrollL += scrollSize; }
		// else if (evt.clientX < scrollSize) { scrollL -= scrollSize; }
		// if (top + self._startHeight == self._maxY) { scrollT = self._maxY - window.innerHeight + sizeBuffer; }
		// else if (top == 0) { scrollT = 0; }
		// if (left + self._startWidth == self._maxX) { scrollL = self._maxX - window.innerWidth + sizeBuffer; }
		// else if (left == 0) { scrollL = 0; }
		// if (self._startHeight > window.innerHeight) {
		// 	if (evt.clientY < window.innerHeight / 2) { scrollT = 0; }
		// 	else { scrollT = self._maxY - window.innerHeight + sizeBuffer; }
		// }
		// if (self._startWidth > window.innerWidth) {
		// 	if (evt.clientX < window.innerWidth / 2) { scrollL = 0; }
		// 	else { scrollL = self._maxX - window.innerWidth + sizeBuffer; }
		// }
		// window.scrollTo(scrollL, scrollT);
	}

	_onMouseUp(evt) {
		const self = this;
		// if (self._zIndexFlag) {
		// 	self.style.zIndex = self._zIndex + 1;
		// 	self._zIndexFlag = false;
		// } else {
		// 	self.style.zIndex = self._zIndex;
		// }
		if (!(self.isDraggableHeader(evt.target) || evt.target === self._buttons[0] || self._dialogButtonPane === evt.target) && !self._isDrag && self._resizeMode == '')
			return;
		document.removeEventListener('mousemove', self._onMouseMove.bind(self));
		document.removeEventListener('mouseup', self._onMouseUp.bind(self));
		if (self._isDrag) {
			self._setCursor('');
			self._isDrag = false;
		}
		else if (self._isResize) {
			self._setCursor('');
			self._isResize = false;
			self._resizeMode = '';
		}
		else if (self._isButton) {
			self._whichButton.classList.remove('active');
			self._isButton = false;
		}
		evt.preventDefault();
		evt.stopPropagation();
	}
	_getOffset(elm) {
		var rect = elm.getBoundingClientRect(),
			offsetX = window.scrollX || document.documentElement.scrollLeft,
			offsetY = window.scrollY || document.documentElement.scrollTop;
		return {
			left: rect.left + offsetX,
			top: rect.top + offsetY,
			right: rect.right + offsetX,
			bottom: rect.bottom + offsetY
		}
	}

	_setCursor(cur) {
		const self = this;
		self.style.cursor = cur;
		self._dialogTitle.style.cursor = cur;
		self._buttons[0].style.cursor = cur;
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
		const width = self.clientWidth
			- parseInt(_dialogContentStyle.left)
			- (parseFloat(_dialogContentStyle.getPropertyValue("--default-control-padding")) * parseFloat(_dialogContentStyle.getPropertyValue("--default-size")))
			- self._dialogContent.offsetWidth - self._dialogContent.clientWidth,
			height = self.clientHeight - (
				parseInt(_dialogContentStyle.top)
				+ (parseFloat(_dialogContentStyle.getPropertyValue("--default-control-padding")) * parseFloat(_dialogContentStyle.getPropertyValue("--default-size")))
				+ self._dialogContent.offsetHeight - self._dialogContent.clientHeight
				+ (self._buttons.length > 1 ?
					+ parseInt(_dialogButtonPaneStyleBefore.borderBottom)
					- parseInt(_dialogButtonPaneStyleBefore.top)
					+ parseInt(_dialogButtonPaneStyle.height)
					+ parseInt(_dialogButtonPaneStyle.bottom)
					: 0)
			);
		self._dialogContent.style.width = `${width}px`;
		self._dialogContent.style.height = `${height}px`;

		if (self._dialogButtonPane) { self._dialogButtonPane.style.width = `${width}px`; }
	}
	showDialog() {
		const self = this;
		self.style.display = 'block';
	}
	createTaskBar() {
		const self = this;
		if (self.taskbar !== undefined || !self.taskbarContainer) {
			return;
		}
		let taskbar = self.taskbarContainer.querySelector(".mrbr-ui-dialogs-taskbar");
		if (taskbar !== null) {
			this.taskbar = taskbar;
			self.createTaskbarButton();
			const desktop =  document.getElementsByTagName("mrbr-ui-containers-desktop");
			if(desktop && desktop[0]){
				desktop[0].addEventListener("mrbr-ui-desktop-navlocation-change", event=> self.taskbar.setAttribute("navlocation",event.detail ) )
				
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
			style = self.style;

		style.visibility = 'hidden';
		style.display = 'block';
		self._dialogTitle = self.querySelector('.mrbr-ui-dialogs-titlebar');
		self._dialogContent = self.querySelector('.mrbr-ui-dialogs-content');
		self._dialogButtonPane = self.querySelector('.mrbr-ui-dialogs-buttonbar');
		self._buttons = self.querySelectorAll('button');
		let buttonsetStyle = window.getComputedStyle(self._dialogButtonPane.querySelector('.mrbr-ui-dialogs-buttonset')),
			buttonSetStyleWidth = parseFloat(buttonsetStyle.width);
		let _dialogStyle = window.getComputedStyle(self),
			_dialogTitleStyle = window.getComputedStyle(self._dialogTitle),
			_dialogContentStyle = window.getComputedStyle(self._dialogContent),
			_dialogButtonPaneStyle,
			_dialogButtonPaneStyleBefore,
			_dialogButtonStyle;
		if (self._buttons.length > 1) {
			_dialogButtonPaneStyle = window.getComputedStyle(self._dialogButtonPane);
			_dialogButtonPaneStyleBefore = window.getComputedStyle(self._dialogButtonPane, ":before");
			_dialogButtonStyle = window.getComputedStyle(self._buttons[1]);
		}
		self._minWidth = Math.max(self.clientWidth, self._minWidth, buttonSetStyleWidth);
		style.width = `${self._minWidth}px`;

		self._minHeight = Math.max(self.clientHeight, self._minHeight,
			+ parseInt(_dialogContentStyle.top)
			+ (2 * parseInt(_dialogStyle.border))
			+ parseFloat(_dialogButtonPaneStyleBefore.getPropertyValue("--default-control-height")) * 4
			+ (self._dialogButtonPane.querySelector('.mrbr-ui-dialogs-buttonset').querySelectorAll("*").length > 1 ?
				+ parseInt(_dialogButtonPaneStyleBefore.borderBottom)
				- parseInt(_dialogButtonPaneStyleBefore.top)
				+ parseInt(_dialogButtonPaneStyle.height)
				+ parseInt(_dialogButtonPaneStyle.bottom)
				: 0)
		);
		style.height = self._minHeight + 'px';

		self._setDialogContent();
		style.left = ((window.innerWidth - self.clientWidth) / 2) + 'px';
		style.top = ((window.innerHeight - self.clientHeight) / 2) + 'px';

		style.display = 'none';
		style.visibility = 'visible';

		self._dialogContent.childNodes[0].tabIndex = '0';

		self.addEventListener('mousedown', self._onMouseDown.bind(self));
		self._dialogButtonPane.addEventListener('mousemove', self._onMouseMove.bind(self));

		self.addEventListener('mousemove', self._onMouseMove.bind(self));

		const controlboxRight = self.querySelector(".mrbr-ui-dialogs-titlebar .mrbr-ui-dialogs-controlbox-right");
		self.setSVGColour(".dialog .mrbr-ui-dialogs-titlebar .mrbr-ui-dialogs-controlbox-left .mrbr-ui-dialogs-icon");
		//self._zIndex = self.style.zIndex;
		self._resizePixel = 2 * ((parseFloat(_dialogContentStyle.getPropertyValue("--default-control-padding")) * parseFloat(_dialogContentStyle.getPropertyValue("--default-size"))) + parseFloat(_dialogContentStyle.getPropertyValue("--default-control-border-width")));
		self.wireEvents();
		self.classList.add("mrbr-ui-dialog-visible");
		self.createTaskBar();
	}
	wireEvents() {

		const self = this,
			controlboxRight = self.querySelector(".mrbr-ui-dialogs-titlebar .mrbr-ui-dialogs-controlbox-right");
		if (controlboxRight !== undefined) {
			[
				controlboxRight.querySelector("button[name='mrbr-ui-dialogs-controlbox-min']"),
				controlboxRight.querySelector("button[name='mrbr-ui-dialogs-controlbox-max']"),
				controlboxRight.querySelector("button[name='mrbr-ui-dialogs-controlbox-close']")
			].forEach(btn => {
				if (btn === undefined) { return; }
				self.controlboxButtons.push(btn);
				btn.addEventListener("click", self.controlboxButton_click.bind(self))
			})
			self.addEventListener("controlbox_click", self.controlboxClick.bind(self))
		}
		self.addEventListener(Mrbr.UI.Dialogs.Dialog.EVENTS.minimised, self.minimised.bind(self));
		self.addEventListener(Mrbr.UI.Dialogs.Dialog.EVENTS.maximised, self.maximised.bind(self));
		self.addEventListener(Mrbr.UI.Dialogs.Dialog.EVENTS.closing, self.closing.bind(self));
		self.addEventListener("mousedown", event => {
			self.dispatchEvent(new CustomEvent("mrbr-control-layer-focused", { bubbles: true, composed: true, detail: { source: self } }));
		})
		self.dispatchEvent(new CustomEvent("mrbr-control-layer-register", { bubbles: true, composed: true, detail: { source: self } }));
		self.dispatchEvent(new CustomEvent("mrbr-control-layer-focused", { bubbles: true, composed: true, detail: { source: self } }));

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
		console.log("minimise")
		const self = this;
		const window_getComputedStyle = window.getComputedStyle;
		// let h1 = document.getElementsByTagName("h1")[0];
		// let source = document.querySelector(".dialog .titlebar .mrbr-ui-dialogs-controlbox-left .icon");
		// h1.style.cssText = window_getComputedStyle(source).cssText;

		//let source = document.querySelector(".dialog .titlebar .mrbr-ui-dialogs-controlbox-left .icon");
		//h1.style = window_getComputedStyle(source);

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
						self.taskbarButton.removeEventListener("click", showDialog)
						self.windowState = "normal";
					}
					self.taskbarButton.addEventListener("click", showDialog)
				})();
			})
		})
	}
	createTaskbarButton() {
		const self = this;
		self.taskbarButton = document.createElement("div");
		self.taskbarButton.classList.add("taskbarbutton");

		self.taskbarButton.innerHTML = `<div>
			<div class="mrbr-ui-dialogs-icon"></div>
		<div class="title">Hello</div>
			<button name="mrbr-ui-dialogs-controlbox-close"></button>
		</div>`
		self.taskbarButton.classList.add("mrbr-ui-dialog-visible");

		// let h1 = self.taskbarButton.querySelector(".icon");
		// let source = document.querySelector(".dialog .titlebar .mrbr-ui-dialogs-controlbox-left .icon");
		// h1.style.backgroundImage = window_getComputedStyle(source).backgroundImage;

		// let  h2= self.taskbarButton.querySelector("div > button[name='mrbr-ui-dialogs-controlbox-close']");
		// let source2 = document.querySelector(".dialog .titlebar button[name='mrbr-ui-dialogs-controlbox-close']");
		// h2.style.backgroundImage = window_getComputedStyle(source2).backgroundImage;
		self.taskbar.appendChild(self.taskbarButton);
		self.taskbarButton.addEventListener("click", event => {
			if (self.windowState === "normal") {
				self.dispatchEvent(new CustomEvent(Mrbr.UI.Dialogs.Dialog.EVENTS.minimised, {}))
			}
		});
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
			window.addEventListener("resize", self.window_resizing.bind(self))
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
		console.log("maxing");
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
		console.log("closed")
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
					//self.dispatchEvent(new CustomEvent(DialogBox.EVENTS.closed, { details: { source: self } }))
				})();
			})
		})
	}
	setSVGColour(selector) {
		window.requestAnimationFrame(() => {

			const self = this;
			let selected = self.querySelector(selector),
				computedStyle = window.getComputedStyle(selected);
			let cssUrl = computedStyle.backgroundImage;
			if (cssUrl === undefined) { return; }
			const urlRegex = /url\(('|\")data:image\/svg\+xml;utf8,(?<dataUrl>.+?)('|\")\)|url\(\"(?<url>.+?)\"\)/i;
			let m,
				backgroundImageUrl,
				isDataUrl = false;
			if ((m = urlRegex.exec(cssUrl)) !== null) {
				if (m.groups.dataUrl && m.groups.dataUrl.length > 0) {
					backgroundImageUrl = m.groups.dataUrl.trim();
					isDataUrl = true;
				}
				else if (m.groups.url && m.groups.url.length > 0) {
					backgroundImageUrl = m.groups.url.trim();
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
							const dataUrl = `url('data:image/svg+xml;utf8,${new XMLSerializer().serializeToString(svg).replace(/(\<!--.*?\-->)/g, "").replace(/\n|\r\n|\n\r/g, "")}')`
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