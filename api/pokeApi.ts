// https://pokeapi.co/api/v2/pokemon?limit=151

import axios from 'axios';

const pokeApi = axios.create({
	baseURL: 'https://pokeapi.co/api/v2',
});

//Lo puedo usar asi:
// pokeApi.get("/pokemon?limit=151")

export default pokeApi;
