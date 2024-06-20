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


    // verifica que la página actual esté activa
    expect(paginador.querySelector('.active').textContent).toBe('1');


    // clickea el botón "Siguiente"
    $paginas[$paginas.length - 1].querySelector('a').click();
    expect(mockCallback).toHaveBeenCalled();
  });


function simularEvento(target) {
    return {
        preventDefault: jest.fn(), target
    };
}
