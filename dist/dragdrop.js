'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Dragdrop.js
 * @author Guilherme Modugno - https://modugno.github.io 
 * @description DragDrop Elements
 */
var Dragdrop = function () {
    function Dragdrop() {
        _classCallCheck(this, Dragdrop);

        this.elements = this.getElements();

        for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
            params[_key] = arguments[_key];
        }

        this.treatParams(params);
        this.targets = document.querySelectorAll(this.elements.targets);
        this.elements = document.querySelectorAll(this.elements.element);
        this.orders = [];
        this.onInit();
    }

    /**
     * Get Elements Mock
     */


    _createClass(Dragdrop, [{
        key: 'getElements',
        value: function getElements() {
            return {
                element: '.dragdrop',
                targets: '.dragdrop-target'
            };
        }

        /**
         * Build and Get the order of elements 
         */

    }, {
        key: 'getOrders',
        value: function getOrders() {
            var _this = this;

            this.orders = [];
            [].forEach.call(this.targets, function (target) {
                if (target.childNodes.length) {
                    target.childNodes.forEach(function (child) {
                        if (child.tagName) {
                            var elementId = child.getAttribute('data-id') || 0;
                            var order = parseInt(target.getAttribute('dragdrop-order'));
                            _this.orders.push({ elementId: elementId, order: order });
                        }
                    });
                }
            });
        }

        /**
         * Merge elements
         * @param {Object} elements 
         */

    }, {
        key: 'mergeElements',
        value: function mergeElements(elements) {
            Object.assign(this.elements, elements);
        }

        /**
         * Treat the params of constructor
         * @param {Array} params 
         */

    }, {
        key: 'treatParams',
        value: function treatParams(params) {
            if (params.length == 1) {
                if (_typeof(params[0]) === 'object') {
                    this.mergeElements(params[0]);
                } else if (typeof params[0] === 'function') {
                    params[0](document, this);
                }
            } else if (params.length > 1 && _typeof(params[0]) == 'object') {
                this.mergeElements(params[0]);
                params[1](document, this);
            }
        }

        /**
         * Change position of elements
         * @param {Event} event 
         * @param {NodeList|HTMLElement} childs 
         */

    }, {
        key: 'changePosition',
        value: function changePosition(event, childs) {
            if (childs.length) {
                var parentId = event.dataTransfer.getData('parent');
                var $parent = document.getElementById(parentId);

                childs.forEach(function (child) {
                    if (child.tagName) {
                        $parent.appendChild(child);
                    }
                });
            }
        }

        /**
         * Remove Opacity in all elements
         */

    }, {
        key: 'opacityOn',
        value: function opacityOn(element) {
            [].forEach.call(this.elements, function (el) {
                if (el != element && !el.classList.contains('out')) {
                    el.classList.add('out');
                }
            });
        }

        /**
         * Add Opacity in all elements
         */

    }, {
        key: 'opacityOff',
        value: function opacityOff() {
            [].forEach.call(this.elements, function (el) {
                if (el.classList.contains('out')) {
                    el.classList.remove('out');
                }
            });
        }

        /**
         * Re Order elements on grid
         * @param {NodeList|HTMLElement} target 
         */

    }, {
        key: 'reOrder',
        value: function reOrder(target) {
            var parentId = event.dataTransfer.getData('parent');
            var targetPosition = this.getTargetPosition(target.id);
            var parentPosition = this.getTargetPosition(parentId);

            if (targetPosition > parentPosition) {
                for (var i = parentPosition; i < targetPosition; i++) {
                    console.log(this.targets[i]);
                }
            } else {
                for (var _i = parentPosition; _i > targetPosition; _i--) {
                    console.log(this.targets[_i - 1]);
                }
            }
        }

        /**
         * Get Target Position
         * @param {String} targetId 
         */

    }, {
        key: 'getTargetPosition',
        value: function getTargetPosition(targetId) {
            return targetId.split('-')[2];
        }

        /**
         * Dispatch events of targets
         */

    }, {
        key: 'dispatchEventsTarget',
        value: function dispatchEventsTarget() {
            var _this2 = this;

            var index = 1;
            [].forEach.call(this.targets, function (target) {
                target.setAttribute('dragdrop', 'target');
                target.setAttribute('dragdrop-order', index);
                target.id = 'dragdrop-target-' + index;

                _this2.drop(target);
                _this2.dragover(target);
                _this2.dragleave(target);
                _this2.dragend(target);

                index++;
            });
        }

        /**
         * Dispatch events of elements
         */

    }, {
        key: 'dispatchEventsElements',
        value: function dispatchEventsElements() {
            var _this3 = this;

            var index = 1;
            [].forEach.call(this.elements, function (element) {
                element.setAttribute('dragdrop', 'element');
                element.setAttribute('draggable', 'true');
                element.id = 'dragdrop-' + index;

                _this3.dragstart(element);

                index++;
            });
        }

        /**
         * When event Dragstart is called
         * @param {NodeList|HTMLElement} element 
         */

    }, {
        key: 'dragstart',
        value: function dragstart(element) {
            var self = this;
            element.addEventListener('dragstart', function (event) {
                var parent = this.parentNode;
                self.opacityOn(this);
                event.dataTransfer.setData('parent', parent.id);
                event.dataTransfer.setData('text/plain', this.id);
            });
        }

        /**
         * When event Drop is called
         * @param {NodeList|HTMLElement} target 
         */

    }, {
        key: 'drop',
        value: function drop(target) {
            var self = this;
            target.addEventListener('drop', function (event) {
                var id = event.dataTransfer.getData('text');
                var el = document.getElementById(id);

                self.reOrder(this);
                self.opacityOff();

                self.changePosition(event, this.childNodes);
                this.appendChild(el);

                if (!this.classList.contains('over')) {
                    this.classList.add('over');
                }

                self.getOrders();
            });
        }

        /**
         * When event Dragover is called
         * @param {NodeList|HTMLElement} target 
         */

    }, {
        key: 'dragover',
        value: function dragover(target) {
            target.addEventListener('dragover', function (event) {
                event.preventDefault();
                if (!this.classList.contains('over')) {
                    this.classList.add('over');
                }
            });
        }

        /**
         * When event Dragleave is called
         * @param {NodeList|HTMLElement} target 
         */

    }, {
        key: 'dragleave',
        value: function dragleave(target) {
            target.addEventListener('dragleave', function (event) {
                if (this.classList.contains('over')) {
                    this.classList.remove('over');
                }
            });
        }

        /**
         * When event Dragend is called
         * @param {NodeList|HTMLElement} target 
         */

    }, {
        key: 'dragend',
        value: function dragend(target) {
            target.addEventListener('dragend', function (event) {
                if (this.classList.contains('over')) {
                    this.classList.remove('over');
                }
            });
        }

        /**
         * On Init
         */

    }, {
        key: 'onInit',
        value: function onInit() {
            this.dispatchEventsTarget();
            this.dispatchEventsElements();
            this.getOrders();
        }
    }]);

    return Dragdrop;
}();
//# sourceMappingURL=dragdrop.js.map