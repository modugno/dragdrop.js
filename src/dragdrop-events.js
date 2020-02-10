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
           
            // Prevent drag if user has focus in input inside the container
            var inputsInContainer = parent.getElementsByTagName('input');
            for (let i = 0; i < inputsInContainer.length; i++) {
                if (inputsInContainer[i] === document.activeElement) {
                    event.preventDefault();
                    return;
                }
            }
            
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
            event.preventDefault();
            let id = event.dataTransfer.getData('text');
            let el = document.getElementById(id);
            self.opacityOff();
            self.changePosition(event, this.childNodes);

            this.appendChild(el);
            if (!this.classList.contains('over')) {
                this.classList.add('over');
            }
            
            self.getOrders();
            return false;
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
            return false;
        });
    }

    /**
     * When event Dragleave is called
     * @param {NodeList|HTMLElement} target 
     */
    dragleave(target) {
        target.addEventListener('dragleave', function(event) {
            event.preventDefault();
            if (this.classList.contains('over')) {
                this.classList.remove('over');
            }
            return false;
        });
    }

    /**
     * When event Dragend is called
     * @param {NodeList|HTMLElement} target 
     */
    dragend(target) {
        target.addEventListener('dragend', function(event) {
            event.preventDefault();
            if (this.classList.contains('over')) {
                this.classList.remove('over');
            }
            return false;
        });
    }
}
