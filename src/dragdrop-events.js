import { Helpers } from './helpers';

/**
 * Dragdrop-events.js
 * @author Guilherme Modugno - https://modugno.github.io 
 * @description Events to DragDrop Elements
 */
export class DragdropEvents extends Helpers {

    constructor() {
        super();
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
}