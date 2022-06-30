import { pokeApi } from '../api';
import { Pokemon } from '../interfaces';

export const getPokemonInfo = async (nameOrId: string) => {
	const resp = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);
	const { data } = resp;

	// Esto lo hago para no tener que poner TOOOOOOOOOOOODA la informacion del pokemon en la pagina estatica. Sino solamente lo que nosotros necesitamos
	const pokemon = {
		id: data.id,
		name: data.name,
		sprites: data.sprites,
	};

	return pokemon;


    
};
