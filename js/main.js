class Carousel {

    /**
     * 
     * @param {HTMLElement} element 
     * @param {Object} options 
     * @param {Object} options.slidesToScroll Nombre d'éléments à faire défiler
     * @param {Object} options.slidesVisible Nombre d'éléments visibles lors d'un scroll
     */
    constructor (element, options = {}) {

        this.element = element
        this.options = Object.assign({},
            {
                slidesToScroll : 1,
                slidesVisible : 1

            }, options)

        let children = [].slice.call(element.children)
        this.currentItem = 0
        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel-container')
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        

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

        } else if (index >= this.items.length){

            index = 0

        }


        let translateX = index * -100/ this.items.length
        this.container.style.transform = 'translate3d('+ translateX +'%,0,0)' 
        this.currentItem = index

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
    })

    new Carousel(document.querySelector('#carousel2'),{
        
    })

})

