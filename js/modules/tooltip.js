export default class Tooltip {
  constructor(tooltip) {
    this.tooltips = document.querySelectorAll(tooltip);

    // bindo do objeto das classes aos callbacks
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
  }

  // Move o tooltip com base em seus estilos de acordo a posição do mouse no eixe X e Y
  onMouseMove(event) {
      this.tooltipBox.style.top = `${event.pageY + 20}px`;
      // Verificando se o elemento da tooltip através do mouse(event.pageX) já ultrapassou da largura máxima(innerWidth) da página
      if (event.pageX + 150 > window.innerWidth) {
        this.tooltipBox.style.left = `${event.pageX - 190}px`;
      } else {
        this.tooltipBox.style.left = `${event.pageX + 20}px`;
      }
      
  }

  // Verifica se após o mouse não estiver por cima do elemento(no caso, o mapa) e o remove
  onMouseLeave({ currentTarget }) {
    this.tooltipBox.remove();
    currentTarget.removeEventListener('mouseleave', this.onMouseLeave);
    currentTarget.removeEventListener('mousemove', this.onMouseMove);
  }
  
  // Cria a tooltip box e coloca no body
  criarTooltipBox(element) {
    const tooltipBox = document.createElement('div');
    const text = element.getAttribute('aria-label');
    tooltipBox.classList.add('tooltip');
    tooltipBox.innerText = text;
    document.body.appendChild(tooltipBox);
    this.tooltipBox = tooltipBox;
  }

  // Cria e adiciona os eventos de mouseMove e mouseLeave ao target(mapa)
  onMouseOver({ currentTarget }) {
    // Cria a tooltipBox e coloca em uma propriedade
    this.criarTooltipBox(currentTarget);
    currentTarget.addEventListener('mousemove', this.onMouseMove);
    currentTarget.addEventListener('mouseleave', this.onMouseLeave);
  }

  // Adiciona os eventos de mouseOver a cada tooltip
  addTooltipsEvent() {
    this.tooltips.forEach((item) => {
      item.addEventListener('mouseover', this.onMouseOver);
    });
  }

  init() {
    if(this.tooltips.length) {
      this.addTooltipsEvent();
    }
    return this;
  }
}


