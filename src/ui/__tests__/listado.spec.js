import { actualizarTextoIndicePokemones, mostrarListadoPokemones } from '../listado.js';

test('actualiza el texto de indice de pokemones', () => {
  document.body.innerHTML = '<div id="indice"></div>';
  actualizarTextoIndicePokemones('test');
  expect(document.querySelector(('#indice')).textContent)
    .toBe('test');
});


test('muestra el listado de pokemones', () => {
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
  

  describe('clickea en el primer pokemon de la lista', () => {
    $links[0].click();
    expect(mockCallback).toHaveBeenCalledWith('Psyduck');
  });
});


test('muestra el listado de pokemones con valor default de pokemonSeleccionadoCallback', () => {
  document.body.innerHTML = '<div id="indice"></div>';
  const listadoNombres = ['Psyduck', 'Snorlax', 'Mewtwo'];

  mostrarListadoPokemones(listadoNombres);

  const $links = document.querySelectorAll('#indice a');
  expect($links.length).toBe(listadoNombres.length);

  $links.forEach(($link, index) => expect($link.textContent).toBe(listadoNombres[index]));

  const $indice = document.querySelector('#indice');
  expect($indice.textContent).toContain(listadoNombres.join(''));

  // agrega validacion de 'no error' para forzar el llamado con el valor por default de callback
  $links.forEach(($link) => {
    expect(() => $link.click()).not.toThrow();
  });
});
