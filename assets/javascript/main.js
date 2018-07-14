class Portfolio {

  constructor(element) {
    this.element = element
    let children = [].slice.call(element.children)
    this.items = children.map((child) => {
      let item = document.createElement('div')
      item.classList.add('item')
      item.appendChild(child)
      let alt = document.createElement('div')
      alt.classList.add('alt')
      let p = document.createElement('p')
      p.innerHTML = child.getAttribute('alt')
      alt.appendChild(p)
      item.appendChild(alt)
      this.element.appendChild(item)
    })
  }

}

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
    let num = 0
    this.items = children.map((child) => {
      let item = this.createDivWithClass('carousel-item')
      item.setAttribute('number', num + '')
      num++
      item.appendChild(child)
      this.container.appendChild(item)
      return item
    })

    this.items.forEach(item => item.addEventListener('click', function () {
      document.querySelector('.carousel-hover.hidden').classList.remove('hidden')
      let number = parseInt(item.getAttribute('number'))
      carouselHover.goToItem(number)
    }))

    this.setStyle()
    this.createNavigation()

    let carouselHover = new CarouselHover(document.querySelector('body'), {
      slidesToScroll : 1,
      slidesVisible  : 1
    })

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

class CarouselHover {

  constructor(element, options = {}) {

    this.element = element
    this.options = options
    this.carouselHover = this.createDivWithClass('carousel-hover')
    this.carouselHover.classList.add('hidden')
    this.currentItem = 0
    element.appendChild(this.carouselHover)
    this.carouselHoverContainer = this.createDivWithClass('carousel-hover-container')
    let carouselContainer = document.querySelector('.carousel-container').cloneNode(true)
    let children = [].slice.call(carouselContainer.children)
    this.items = children.map((child) => {
      child.classList.remove('carousel-item')
      child.classList.add('carousel-hover-item')
      child.innerHTML += '<p>' + child.children[0].alt + '</p>'
      this.carouselHoverContainer.appendChild(child)
      return child
    })
    this.carouselHover.appendChild(this.carouselHoverContainer)

    this.createNavigation()
    this.setStyle()

  }

  createDivWithClass (className) {

    let div = document.createElement('div')
    div.classList.add(className)
    return div

  }

  createNavigation () {

    let previousButton = this.createDivWithClass('carousel-hover-button')
    previousButton.classList.add('carousel-hover-button-previous')
    let nextButton = this.createDivWithClass('carousel-hover-button')
    nextButton.classList.add('carousel-hover-button-next')
    let returnButton = this.createDivWithClass('carousel-hover-return')
    this.carouselHover.appendChild(previousButton)
    this.carouselHover.appendChild(nextButton)
    this.carouselHover.appendChild(returnButton)
    previousButton.addEventListener('click', this.previous.bind(this))
    nextButton.addEventListener('click', this.next.bind(this))
    returnButton.addEventListener('click', () => {
      this.carouselHover.classList.add('hidden')
    })

  }

  setStyle () {

      let ratio = this.items.length / this.options.slidesVisible
      this.carouselHoverContainer.style.width = (ratio * 100) + '%'
      this.items.forEach(item => item.style.width = ((100 / this.options.slidesVisible) / ratio) + '%')

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
    this.carouselHoverContainer.style.transform = 'translate3d(' + translate + '%, 0, 0)'
    this.currentItem = index

  }

}

document.addEventListener('DOMContentLoaded', function () {

  function activitiesCreation(element) {
    let children = [].slice.call(element.children)
    if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      for (var i = 0; i < children.length; i++) {
        element.appendChild(children[i])
      }
    } else {
      let table = document.createElement('table')
      let tr = document.createElement('tr')
      table.appendChild(tr)
      element.appendChild(table)
      if (document.querySelector('body').offsetWidth >= 1280) {
        let index = 0
        for (var i = 0; i < children.length; i++) {
          if (index != 4) {
            let existingTr = document.querySelector('.activities-list .container-fluid table').lastChild
            let td = document.createElement('td')
            td.appendChild(children[i])
            existingTr.appendChild(td)
            index++
          } else {
            let tr = document.createElement('tr')
            let td = document.createElement('td')
            td.appendChild(children[i])
            tr.appendChild(td)
            table.appendChild(tr)
            index = 0
          }
        }
      } else if (document.querySelector('body').offsetWidth >= 800 && document.querySelector('body').offsetWidth < 1280) {
        let index = 0
        for (var i = 0; i < children.length; i++) {
          if (index != 3) {
            let existingTr = document.querySelector('.activities-list .container-fluid table').lastChild
            let td = document.createElement('td')
            td.appendChild(children[i])
            existingTr.appendChild(td)
            index++
          } else {
            let tr = document.createElement('tr')
            let td = document.createElement('td')
            td.appendChild(children[i])
            tr.appendChild(td)
            table.appendChild(tr)
            index = 0
          }
        }
      } else if (document.querySelector('body').offsetWidth < 800 && document.querySelector('body').offsetWidth >= 400) {
        let index = 0
        for (var i = 0; i < children.length; i++) {
          if (index != 2) {
            let existingTr = document.querySelector('.activities-list .container-fluid table').lastChild
            let td = document.createElement('td')
            td.appendChild(children[i])
            existingTr.appendChild(td)
            index++
          } else {
            let tr = document.createElement('tr')
            let td = document.createElement('td')
            td.appendChild(children[i])
            tr.appendChild(td)
            table.appendChild(tr)
            index = 0
          }
        }
      } else if (document.querySelector('body').offsetWidth < 400) {
        let index = 0
        for (var i = 0; i < children.length; i++) {
          if (index != 1) {
            let existingTr = document.querySelector('.activities-list .container-fluid table').lastChild
            let td = document.createElement('td')
            td.appendChild(children[i])
            existingTr.appendChild(td)
            index++
          } else {
            let tr = document.createElement('tr')
            let td = document.createElement('td')
            td.appendChild(children[i])
            tr.appendChild(td)
            table.appenChild(tr)
            index = 0
          }
        }
      }
    }
  }

  function presentationForMobile(element) {
    let children = [].slice.call(element.children)
    element.innerHTML = ''
    let container = document.createElement('div')
    container.classList.add('container-presentation')
    for (var i = 0; i < children.length; i++) {
      container.appendChild(children[i])
    }
    element.appendChild(container)
  }

  activitiesCreation(document.querySelector('.activities-list .container-fluid'))

  if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.body.classList.add('mobile')
    presentationForMobile(document.querySelector('#presentation'))
    new Portfolio(document.querySelector('#portfolio'))
  } else {
    new Carousel(document.querySelector('#portfolio'), {
      slidesToScroll : 3,
      slidesVisible  : 3
    })
  }

  let voirPlus = document.querySelector('#voir-plus')
  let decouvrir = document.querySelector('#decouvrir')
  let returnPresentation = document.querySelector('#return-presentation')
  let returnActivities = document.querySelector('#return-activities')
  let navbar = document.querySelector('#mainMenu')

  voirPlus.addEventListener('click', function () {
    document.querySelector('#under-presentation').classList.add('clicked')
    voirPlus.style.display = "none"
  })

  decouvrir.addEventListener('click', function() {
    document.querySelector('.activities').classList.add('clicked')
    decouvrir.style.display = "none"
  })

  returnPresentation.addEventListener('click', function () {
    document.querySelector('#under-presentation').classList.remove('clicked')
    voirPlus.style.display = "inline"
  })

  returnActivities.addEventListener('click', function () {
    document.querySelector('.activities').classList.remove('clicked')
    decouvrir.style.display = 'inline'
  })

  window.addEventListener('scroll', function () {
    if (window.scrollY >= 200) {
      navbar.classList.add('scrolled')
    } else {
      navbar.classList.remove('scrolled')
    }
  })

})
