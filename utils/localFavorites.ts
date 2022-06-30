const toggleFavorite = (id: number) => {
	//obtengo los favorites del localStorage
	let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');

	if (favorites.includes(id)) {
		//si se encuentra dentro lo elimino
		favorites = favorites.filter(pokeId => pokeId !== id);
	} else {
		//si no esta dentro lo agrego
		favorites.push(id);
	}

	//guardo el arreglo de favoritos final en el LS
	localStorage.setItem('favorites', JSON.stringify(favorites));
};

const existInFavorites = (id: number): boolean => {
	//Coloco esta linea para evitar que se llame del lado del servidor (del lado del servidor la variable window no existe)
	//al final lo hice en un efecto asi que esta comprobacion no es necesaria
	// if (typeof window === 'undefined') {
	// 	return false;
	// }

	//obtengo los favorites del localStorage
	let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');

	return favorites.includes(id);
};

const pokemons = (): number[] => {
	return JSON.parse(localStorage.getItem('favorites') || '[]');
};

//Realizo la exportacion por defecto de un objeto que tiene determindas funciones (toggleFavorite)
export default {
	toggleFavorite,
	existInFavorites,
	pokemons,
};
