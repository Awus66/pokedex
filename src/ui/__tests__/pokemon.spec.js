import mostrarPokemon from '../pokemon.js';
import fixture from '../../__tests__/pokedex.fixture';


const versiones_test = ['sword-shield', 'emerald', 'yellow'];

const pokemon_test = {
    id: 129,
    nombre: 'magikarp',
    foto: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/129.png',
    tipos: ['water'],
    habilidades: ['swift-swim', 'rattled'],
    movimientos: [
        {
            movimiento: 'tackle',
            versiones: versiones_test
        },
        {
            movimiento: 'hydro-pump',
            versiones: versiones_test
        }, 
        {
            movimiento: 'splash',
            versiones: versiones_test
        }, 
        {
            movimiento: 'flail',
            versiones: versiones_test
        },
        {
            movimiento: 'bounce',
            versiones: versiones_test
        },
    ]
}

test('muestra la informacion del pokemon', () => {
    document.body.innerHTML = fixture;
    mostrarPokemon(pokemon_test);

    // verifica datos de pokemon
    expect(document.querySelector('#pokemon-nombre').textContent).toBe('magikarp');
    expect(document.querySelector('#pokemon-id').textContent).toBe('129');
    expect(document.querySelector('#pokemon-imagen').src).toContain('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/129.png');
    
    expect(document.querySelectorAll('#tipos .badge')).toHaveLength(1);
    expect(document.querySelector('#tipos').textContent).toBe('water');

    expect(document.querySelectorAll('#habilidades .badge')).toHaveLength(2);
    expect(document.querySelector('#habilidades').textContent).toBe('swift-swimrattled');

    expect(document.querySelectorAll('#movimientos tr')).toHaveLength(5);
    expect(document.querySelector('#movimientos').textContent).toContain(`tackle${versiones_test.join('')}hydro-pump${versiones_test.join('')}splash${versiones_test.join('')}flail${versiones_test.join('')}bounce${versiones_test.join('')}`);
});