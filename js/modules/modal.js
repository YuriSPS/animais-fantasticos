export default class Modal {
  constructor(botaoAbrir, botaoFechar, containerModal) {
    this.botaoAbrir = document.querySelector(botaoAbrir);
    this.botaoFechar = document.querySelector(botaoFechar);
    this.containerModal = document.querySelector(containerModal);

    // usando método bind ao callback para
    // fazer referência ao objeto da classe
    this.eventToggleModal = this.eventToggleModal.bind(this);
    this.cliqueForaModal = this.cliqueForaModal.bind(this);
  }
  
  // Abre e fechar o modal
  toggleModal() {
    this.containerModal.classList.toggle('ativo');
  }

  // Adiciona o evento de toggle ao modal
  eventToggleModal(event) {
    event.preventDefault();
    this.toggleModal();
  }

  // fecha o modal ao clicar ao lado de fora
  cliqueForaModal(event) {
    if (event.target === this.containerModal) {
      this.toggleModal(event);
    }
  }

  // Adiciona os eventos aos elementos do modal
  addModalEvents() {
    this.botaoAbrir.addEventListener('click', this.eventToggleModal);
    this.botaoFechar.addEventListener('click', this.eventToggleModal);
    this.containerModal.addEventListener('click', this.cliqueForaModal);
  }

  init() {
    if(this.botaoAbrir && this.botaoFechar && this.containerModal) {
      this.addModalEvents();
    }
    return this;
  }

}
