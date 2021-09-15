export default class AnimaNumeros {
  constructor(numeros, observerTarget, observerClass) {
    this.numeros = document.querySelectorAll(numeros);
    this.observerTarget = document.querySelector(observerTarget);
    this.observerClass = observerClass;

    // bind ao this do objeto ao callback da mutação onde está sendo inserida
    this.handleMutation = this.handleMutation.bind(this);
  }

  // Recebe um elemento do DOM com número em formarto de string
  // Incrementa a partir de 0 até o número final(total)
  static incrementarNumero(numero) {
    const total = +numero.innerText;
    const incremento = Math.floor(total / 100);
    let start = 0;
    const timer = setInterval(() => {
      start += incremento;
      numero.innerText = start;
      if (start > total) {
        numero.innerText = total;
        clearInterval(timer);
      }
    }, 25 * Math.random());
  }

  // Ativa incrementarNumero para cada numero selecionado do DOM pelo querySelectorAll
  animaNumeros() {
    this.numeros.forEach((numero) => {
      this.constructor.incrementarNumero(numero);
    });
  }

  // Função que verifica se o elemento observado possui a classe(mutação)desejada
  // para que possa ocorrer o evento, e depois irá desconectar para que seja executada uma só vez após a mutação
  handleMutation(mutation) {
    if (mutation[0].target.classList.contains(this.observerClass)) {
      this.observer.disconnect();
      this.animaNumeros();
    }
  }

  // Adiciona o MutationObserver para verificar quando
  // a classe ativo é adicionada ao element target
  addMutationObserver() {
    this.observer = new MutationObserver(this.handleMutation);
    this.observer.observe(this.observerTarget, { attributes: true });
  }

  init() {
    if(this.numeros.length && this.observerTarget) {
      this.addMutationObserver();
    }
    return this;
  }
}
  
