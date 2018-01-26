'use babel';

export default class CdeAppTemplateView {

  constructor(serializedState) {
    this.element = document.createElement('div')
    this.element.classList.add('cde-visual-outline')
    const message = document.createElement('div')

    message.classList.add('message')
    this.element.appendChild(message)
    let content = document.getElementsByClassName('outline-view-trees-scroller')[0].children[0]

  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove()
  }

  getElement() {
    return this.element
  }

}
