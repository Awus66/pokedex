import { manejarCambioPagina} from '../paginador.js';
import mostrarPaginador from '../paginador.js'; // default function ---> sin llaves

test('cambia de página clickeando su correspondiente botón', () => {
    const mockCallback = jest.fn();
    const target = document.createElement('a');
    target.setAttribute('href', '#');
    target.dataset.pagina = '4';
    const evento = simularEvento(target);
  
    manejarCambioPagina(evento, mockCallback);
    expect(mockCallback).toHaveBeenCalledWith(4);
});


test('cambia de página clickeando su correspondiente botón con valor deafult de callback', () => {
    const target = document.createElement('a');
    target.setAttribute('href', '#');
    target.dataset.pagina = '4';
    const evento = simularEvento(target);
  
    manejarCambioPagina(evento);
});


test('muestra las páginas', () => {
    document.body.innerHTML = '<div id="paginador"></div>';
    const mockCallback = jest.fn();
    mostrarPaginador(964, 1, 'url-siguiente', 'url-anterior', mockCallback);
    const $paginador = document.querySelector('#paginador');
    const $paginas = $paginador.querySelectorAll('.page-item');
    
    // verifica que la cantidad de páginas sea correcta'
    expect($paginas).toHaveLength(Math.ceil(964/20) + 2); //Math.ceil(totalPokemones / pokemones por pagina) + botones de "Anterior" y "Siguiente"
  
    // verifica que el primer elemento sea "Anterior" y el último sea "Siguiente"
    expect($paginas[0].textContent).toBe('Anterior');
    expect($paginas[$paginas.length - 1].textContent).toBe('Siguiente');

    // verifica que no contengan la clase 'disabled'
    expect($paginas[0].classList.contains('disabled')).toBe(false);
    expect($paginas[$paginas.length - 1].classList.contains('disabled')).toBe(false);


    // verifica que la página actual esté activa
    expect(paginador.querySelector('.active').textContent).toBe('1');


    // clickea el botón "Siguiente"
    $paginas[$paginas.length - 1].querySelector('a').click();
    expect(mockCallback).toHaveBeenCalled();
});


test('muestra las páginas con valores default de urlAnterior, urlSiguiente y callbackPaginaSeleccionada', () => {
    document.body.innerHTML = '<div id="paginador"></div>';
    const mockCallback = jest.fn();
    mostrarPaginador(964, 1);
    const $paginador = document.querySelector('#paginador');
    const $paginas = $paginador.querySelectorAll('.page-item');
    
    // verifica que la cantidad de páginas sea correcta'
    expect($paginas).toHaveLength(Math.ceil(964/20) + 2); //Math.ceil(totalPokemones / pokemones por pagina) + botones de "Anterior" y "Siguiente"
  
    // verifica que el primer elemento sea "Anterior" y el último sea "Siguiente"
    expect($paginas[0].textContent).toBe('Anterior');
    expect($paginas[$paginas.length - 1].textContent).toBe('Siguiente');

        // verifica que contengan la clase 'disabled'
    expect($paginas[0].classList.contains('disabled')).toBe(true);
    expect($paginas[$paginas.length - 1].classList.contains('disabled')).toBe(true);


    // verifica que la página actual esté activa
    expect(paginador.querySelector('.active').textContent).toBe('1');


    // clickea el botón "Siguiente"
    $paginas[$paginas.length - 1].querySelector('a').click();
});


function simularEvento(target) {
    return {
        preventDefault: jest.fn(), target
    };
}
