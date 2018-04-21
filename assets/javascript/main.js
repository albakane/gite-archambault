class Carousel {

  constructor (element, options = {}) {

    this.element = element
    let children = [].slice.call(element.children)
    this.options = Object.assign({}, {
      slidesToScroll: 1,
      slidesVisible : 1
    }, options)
    this.currentItem = 0
    this.carousel = this.createDivWithClass('carousel')
    this.container = this.createDivWithClass('carousel-container')
    this.carousel.appendChild(this.container)
    this.element.appendChild(this.carousel)
    this.items = children.map((child) => {
      let item = this.createDivWithClass('carousel-item')
      item.appendChild(child)
      this.container.appendChild(item)
      return item
    })

    this.setStyle()
    this.createNavigation()

  }

  setStyle () {

      let ratio = this.items.length / this.options.slidesVisible
      this.container.style.width = (ratio * 100) + '%'
      this.items.forEach(item => item.style.width = ((100 / this.options.slidesVisible) / ratio) + '%')

  }

  createNavigation () {
    let previousButton = this.createDivWithClass('carousel-button')
    previousButton.classList.add('carousel-button-previous')
    let nextButton = this.createDivWithClass('carousel-button')
    nextButton.classList.add('carousel-button-next')
    this.carousel.appendChild(previousButton)
    this.carousel.appendChild(nextButton)
    let title = document.createElement('h1')
    title.classList.add('carousel-title')
    this.carousel.appendChild(title)
    previousButton.addEventListener('click', this.previous.bind(this))
    nextButton.addEventListener('click', this.next.bind(this))
  }

  next () {
    this.goToItem(this.currentItem + this.options.slidesToScroll)
  }

  previous () {
    this.goToItem(this.currentItem - this.options.slidesToScroll)
  }

  goToItem (index) {

    if (index < 0) {
      index = this.items.length - this.options.slidesVisible
    } else if (index >= this.items.length) {
      index = 0
    }
    let translate = index * (-100 / this.items.length)
    this.container.style.transform = 'translate3d(' + translate + '%, 0, 0)'
    this.currentItem = index

  }

  createDivWithClass (className) {

    let div = document.createElement('div')
    div.classList.add(className)
    return div

  }

}

document.addEventListener('DOMContentLoaded', function () {

  new Carousel(document.querySelector('#portfolio'), {
    slidesToScroll: 3,
    slidesVisible : 3
  })

})
