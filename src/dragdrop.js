import { DragdropEvents } from './dragdrop-events';

/**
 * Dragdrop.js
 * @author Guilherme Modugno - https://modugno.github.io 
 * @description DragDrop Elements
 */
export class Dragdrop extends DragdropEvents {

    constructor(...params) {
        super();
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
     * On Init
     */
    onInit() {
        this.dispatchEventsTarget();
        this.dispatchEventsElements();
        this.getOrders();
    }
}