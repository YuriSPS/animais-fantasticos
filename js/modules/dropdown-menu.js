import outsideClick from './outsideclick.js';

export default class DropdownMenu {
  constructor(dropdownMenus, events) {
    this.dropdownMenus = document.querySelectorAll(dropdownMenus);
    
    // Define touchstart e click como padrão de events 
    // caso o usuário não definir nada no parametro qnd instaciar a classe
    if(events === undefined ) {
      this.events = ['touchstart', 'click'];
    } else {
      this.events = events;
    }
    this.activeClass = 'active';
    this.activeDropdownMenu = this.activeDropdownMenu.bind(this);
  }
  
  // Ativa o dropdownMenu e adiciona a função que observa o click fora dele
  activeDropdownMenu(event) {
    event.preventDefault();
    const element = event.currentTarget;
    element.classList.add(this.activeClass);
    outsideClick(element, this.events, () => {
      element.classList.remove('active');
    });
  }

  // Adiciona os eventos ao dropdownMenu
  addDropdownMenusEvent() {
    this.dropdownMenus.forEach((menu) => {
    this.events.forEach((userEvent) => {
      menu.addEventListener(userEvent, this.activeDropdownMenu);
      });
    });
  }

  // Executa a função addDropdownMenusEvent caso existis(true) o dropdownMenu
  init() {
    if(this.dropdownMenus.length) {
      this.addDropdownMenusEvent();
    }
    return this;
  }
  
}
