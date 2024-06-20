import { actualizarTextoIndicePokemones, mostrarListadoPokemones } from '../listado.js';

test('actualiza el texto de indice de pokemones', () => {
  document.body.innerHTML = '<div id="indice"></div>';
  actualizarTextoIndicePokemones('test');
  expect(document.querySelector(('#indice')).textContent)
    .toBe('test');
});

describe('muestra el listado de pokemones', () => {
  document.body.innerHTML = '<div id="indice"></div>';
  const listadoNombres = ['Psyduck', 'Snorlax', 'Mewtwo'];
  const mockCallback = jest.fn();

  mostrarListadoPokemones(listadoNombres, mockCallback);

  const $links = document.querySelectorAll('#indice a');
  expect($links.length).toBe(listadoNombres.length);
  $links.forEach(($link, index) => {
    expect($link.textContent).toBe(listadoNombres[index]);
    $link.click();
    expect(mockCallback).toHaveBeenCalledWith(listadoNombres[index]);
  });

  const $indice = document.querySelector('#indice');

  expect($indice.textContent).toContain(listadoNombres.join(''));
  

  test('clickea en el primer pokemon de la lista', () => {
    $links[0].click();
    expect(mockCallback).toHaveBeenCalledWith('Psyduck');
  });
});
