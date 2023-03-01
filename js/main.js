class Carousel {

        /**
     * This callback is displayed as a global member.
     * @callback moveCallback
     * @param {number} index
     */

    /**
     * 
     * @param {HTMLElement} element 
     * @param {Object} options 
     * @param {Object} [options.slidesToScroll == 1] Nombre d'éléments à faire défiler
     * @param {Object} [options.slidesVisible == 1] Nombre d'éléments visibles lors d'un slides
     * @param {boolean} [options.loop == false] doit-on boucler en fin de slide
     */
    constructor (element, options = {}) {

        this.element = element
        this.options = Object.assign({},
            {
                slidesToScroll : 1,
                slidesVisible : 1,
                loop : false

            }, options)

        let children = [].slice.call(element.children)
        this.currentItem = 0
        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel-container')
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        this.moveCallbacks = []
        

        this.items = children.map((child) => {

            let item = this.createDivWithClass('carousel-item')
            item.appendChild(child)
            
            this.container.appendChild(item)

            return item

        })

        this.setStyle()
        this.createNavigation()

    

    }

    /**
     * Applique les bonnes dimensions aux éléments du carousel
     */
    setStyle () {

        let ratio = this.items.length / this.options.slidesVisible
        this.container.style.width = (ratio * 100) + "%"
        this.items.forEach(item => item.style.width = ((100 / this.options.slidesVisible)/ ratio ) + "%")

    } 

    createNavigation () {

        let nextButton = this.createDivWithClass('carousel-next')
        let prevButton = this.createDivWithClass('carousel-prev')
        this.root.appendChild(nextButton)
        this.root.appendChild(prevButton)

        nextButton.addEventListener('click',this.next.bind(this))
        prevButton.addEventListener('click',this.prev.bind(this))
        if (this.options.loop == false) {
            return
        }
        this.onMove(index => {
            if (index == 0){

                prevButton.classList.add('carousel-prev-hidden')

            } else {

                prevButton.classList.remove('carousel-prev-hidden')
            }

            if (this.items[this.currentItem + this.options.slidesVisible] == undefined){

                nextButton.classList.add('carousel-next-hidden')

            } else {

                nextButton.classList.remove('carousel-next-hidden')

            }
        })

    }

    next () {

        this.goToItem(this.currentItem + this.options.slidesToScroll)

    }

    prev () {

        this.goToItem(this.currentItem - this.options.slidesToScroll)

    }

    /**
     * Déplace le Carousel vers les valeurs ciblées
     * @param {number} index 
     */
    goToItem (index) {

        if (index < 0){

            index = this.items.length - this.options.slidesVisible

        } else if (index >= this.items.length || this.items[this.currentItem + this.options.slidesVisible] == undefined && index > this.currentItem){

            index = 0

        }


        let translateX = index * -100/ this.items.length
        this.container.style.transform = 'translate3d('+ translateX +'%,0,0)' 
        this.currentItem = index
        this.moveCallbacks.forEach(cb => cb(index))

    }

    /**
     * 
     * @param {carousel~moveCallback} cb 
     */
    onMove (cb) {

        this.moveCallbacks.push(cb)

    }

    

    /**
     * 
     * @param {string} className 
     * @returns {HTMLElement}
     */
    createDivWithClass(className) {

        let div = document.createElement('div')
        div.setAttribute('class',className)
        return div

    }

   
}


document.addEventListener('DOMContentLoaded',function () {
  
    new Carousel(document.querySelector('#carousel1'),{
        slidesToScroll: 2,
        slidesVisible: 3,
        loop : true
    })

    new Carousel(document.querySelector('#carousel2'),{

        slidesToScroll : 2,
        slidesVisible : 2,
        loop : false
        
    })

    new Carousel(document.querySelector('#carousel3'),{
        
    })
    

})

