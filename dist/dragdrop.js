/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * Dragdrop.js
 * @author Guilherme Modugno - https://modugno.github.io 
 * @description DragDrop Elements
 */
class Dragdrop {

    constructor(...params) {
        this.elements = this.getElements();
        this.traitParams(params);
        this.targets  = document.querySelectorAll(this.elements.targets);
        this.elements = document.querySelectorAll(this.elements.element);
        this.orders = [];
        this.onInit();
    }

    traitParams(params) {
        if (params.length == 1) {
            if (typeof params[0] === 'object') {
                this.mergeElements(params[0]);
            } else if (typeof params[0] === 'function') {
                params[0](document, this);
            }
        } 
        else if ((params.length > 1) && (typeof params[0] == 'object')) {
            this.mergeElements(params[0]);
            params[1](document, this);
        }
    }

    mergeElements(elements) {
        Object.assign(this.elements, elements);
    }

    getElements() {
        return {
            element: '.dragdrop',
            targets: '.dragdrop-target'
        }        
    }

    dragstart(element) {
        element.addEventListener('dragstart', function(event) {
            let parent = this.parentNode;
            event.dataTransfer.setData('parent', parent.id);
            event.dataTransfer.setData('text/plain', this.id);
        });
    }

    drop(target) {
        let self = this;
        target.addEventListener('drop', function(event) {
            let id = event.dataTransfer.getData('text');
            let el = document.getElementById(id);
            
            self.changePosition(event, this.childNodes);
            this.appendChild(el);
    
            if (!this.classList.contains('over')) {
                this.classList.add('over');
            }
            
            self.getOrders();
        });

    }

    getOrders() {
        this.orders = [];
        [].forEach.call(this.targets, (target) => {
            if (target.childNodes.length) {  
                target.childNodes.forEach(child => {
                    if (child.tagName) {
                        let elementId = child.getAttribute('data-id') || 0
                        let order     = parseInt( target.getAttribute('dragdrop-order') );
                        this.orders.push({ element: elementId, order: order })
                    }
                })
            }
        })
    }

    dragover(target) {
        target.addEventListener('dragover', function(event) {
            event.preventDefault();
            if (!this.classList.contains('over')) {
                this.classList.add('over');
            }
        });
    }

    dragleave(target) {
        target.addEventListener('dragleave', function(event) {
            if (this.classList.contains('over')) {
                this.classList.remove('over');
            }
        });
    }

    dragend(target) {
        target.addEventListener('dragend', function(event) {
            if (this.classList.contains('over')) {
                this.classList.remove('over');
            }
        });
    }

    dispatchEventsTarget() {
        let index = 1;
        [].forEach.call(this.targets, (target) => {
            target.setAttribute('dragdrop', 'target');
            target.setAttribute('dragdrop-order', index);
            target.id = `dragdrop-target-${index}`;
            
            this.drop(target);
            this.dragover(target);
            this.dragleave(target);
            this.dragend(target);

            index++;
        });
    }

    dispatchEventsElements() {
        let index = 1;
        [].forEach.call(this.elements, (element) => {
            element.setAttribute('dragdrop', 'element');
            element.setAttribute('draggable', 'true');
            element.id = `dragdrop-${index}`;

            this.dragstart(element);

            index++;
        });
    }

    changePosition(event, childs) {
        if (childs.length) {
            let parentId = event.dataTransfer.getData('parent');
            let $parent = document.getElementById(parentId);
            
            childs.forEach(child => {
                if (child.tagName) {
                    $parent.appendChild(child);
                }
            })
        }
    }
    
    onInit() {
        this.dispatchEventsTarget();
        this.dispatchEventsElements();
        this.getOrders();
    }
    
}


/***/ })
/******/ ]);
//# sourceMappingURL=dragdrop.js.map