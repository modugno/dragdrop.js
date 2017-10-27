/**
 * Helpers.js
 * @author Guilherme Modugno - https://modugno.github.io 
 * @description Helpers to DragDrop Elements
 */
export class Helpers {
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
}