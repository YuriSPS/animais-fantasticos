export default class ScrollAnima {
  constructor(sections) {
    this.sections = document.querySelectorAll(sections);
    this.windowMetade = window.innerHeight * 0.6;
    // Método bind para fazer referência ao proprio objeto/classe(ScrollAnima)
    this.checkDistance = this.checkDistance.bind(this);
  }

  // Retorna um objeto com uma distância diferente de cada section em relação ao topo do site
  getDistance() {
    this.distance = [...this.sections].map((section) => {
      const offset = section.offsetTop;
      return {
        element: section,
        offset: Math.floor(offset - this.windowMetade),
      };
    });
  }

  // Verifica as distâncias de cada section da pagina
  // e realiza uma verificação, caso for true, uma animação ocorrerá
  checkDistance() {
    this.distance.forEach((item) => {
      if(window.pageYOffset > item.offset) {
        item.element.classList.add('ativo');
      } else if (item.element.classList.contains('ativo')) {
        item.element.classList.remove('ativo');
      }
    });
  }

  init() {
    if(this.sections.length){
      this.getDistance();
      this.checkDistance();
      window.addEventListener('scroll', this.checkDistance);
    }
    return this;
  }

  // Remove o evento de scroll e pausa as animações
  stop() {
    window.removeEventListener('scroll', this.checkDistance);
  }
}
