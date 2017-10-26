/**
 * Dragdrop.js
 * @author Guilherme Modugno - https://modugno.github.io 
 * @description DragDrop Elements
 */
export class Dragdrop {

    constructor(...params) {
        this.elements = this.getElements();
        this.treatParams(params);
        this.targets  = document.querySelectorAll(this.elements.targets);
        this.elements = document.querySelectorAll(this.elements.element);
        this.orders = [];
        this.onInit();
    }

    /**
     * Get Elements Mock
     */
    getElements() {
        return {
            element: '.dragdrop',
            targets: '.dragdrop-target'
        }        
    }

    /**
     * Build and Get the order of elements 
     */
    getOrders() {
        this.orders = [];
        [].forEach.call(this.targets, (target) => {
            if (target.childNodes.length) {  
                target.childNodes.forEach(child => {
                    if (child.tagName) {
                        let elementId = child.getAttribute('data-id') || 0
                        let order     = parseInt( target.getAttribute('dragdrop-order') );
                        this.orders.push({ elementId: elementId, order: order })
                    }
                })
            }
        })
    }

    /**
     * Merge elements
     * @param {Object} elements 
     */
    mergeElements(elements) {
        Object.assign(this.elements, elements);
    }

    /**
     * Treat the params of constructor
     * @param {Array} params 
     */
    treatParams(params) {
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

    /**
     * Change position of elements
     * @param {Event} event 
     * @param {NodeList|HTMLElement} childs 
     */
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

    /**
     * Remove Opacity in all elements
     */
    opacityOn(element) {
        [].forEach.call(this.elements, (el) => {
            if ((el != element) && (!el.classList.contains('out'))) {
                el.classList.add('out');
            }
        });
    }

    /**
     * Add Opacity in all elements
     */
    opacityOff() {
        [].forEach.call(this.elements, (el) => {
            if (el.classList.contains('out')) {
                el.classList.remove('out');
            }
        });
    }

    /**
     * Re Order elements on grid
     * @param {NodeList|HTMLElement} target 
     */
    reOrder(target) {
        let parentId       = event.dataTransfer.getData('parent');
        let targetPosition = this.getTargetPosition(target.id);
        let parentPosition = this.getTargetPosition(parentId);

        if (targetPosition > parentPosition) {
            for (let i = parentPosition; i < targetPosition; i++) {
                console.log( this.targets[i] );
            }
        } else {
            for (let i = parentPosition; i > targetPosition; i--) {
                console.log( this.targets[i-1] );
            }
        }
    }

    /**
     * Get Target Position
     * @param {String} targetId 
     */
    getTargetPosition(targetId) {
        return targetId.split('-')[2];
    }
    
    /**
     * Dispatch events of targets
     */
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

    /**
     * Dispatch events of elements
     */
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

    /**
     * When event Dragstart is called
     * @param {NodeList|HTMLElement} element 
     */
    dragstart(element) {
        let self = this;
        element.addEventListener('dragstart', function(event) {
            let parent = this.parentNode;
            self.opacityOn(this);
            event.dataTransfer.setData('parent', parent.id);
            event.dataTransfer.setData('text/plain', this.id);
        });
    }

    /**
     * When event Drop is called
     * @param {NodeList|HTMLElement} target 
     */
    drop(target) {
        let self = this;
        target.addEventListener('drop', function(event) {
            let id = event.dataTransfer.getData('text');
            let el = document.getElementById(id);
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
    dragover(target) {
        target.addEventListener('dragover', function(event) {
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
    dragleave(target) {
        target.addEventListener('dragleave', function(event) {
            if (this.classList.contains('over')) {
                this.classList.remove('over');
            }
        });
    }

    /**
     * When event Dragend is called
     * @param {NodeList|HTMLElement} target 
     */
    dragend(target) {
        target.addEventListener('dragend', function(event) {
            if (this.classList.contains('over')) {
                this.classList.remove('over');
            }
        });
    }
    
    /**
     * On Init
     */
    onInit() {
        this.dispatchEventsTarget();
        this.dispatchEventsElements();
        this.getOrders();
    }
}