import { GetStaticProps } from 'next';
import { Grid } from '@nextui-org/react';
import type { NextPage } from 'next';
import { Layout } from '../components/layouts';
import { pokeApi } from '../api';
import { PokemonListResponse, SmallPokemon } from '../interfaces';
import PokemonCard from '../components/pokemon/PokemonCard';

interface Props {
	pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
	return (
		<>
			<Layout title='Listado de Pokemons'>
				<Grid.Container gap={2} justify='flex-start'>
					{pokemons.map(pokemon => (
						<PokemonCard key={pokemon.id} pokemon={pokemon} />
					))}
				</Grid.Container>
			</Layout>
		</>
	);
};

//! STATIC GENERATION: Mejor Rendimiento. Se genera todo antes de que el cliente haga el request. Se crean todas las paginas en el servidor. Y cuando el cliente haga el request el servidor ya manda la pagina generada. -> https://nextjs.org/docs/basic-features/data-fetching/get-static-props
//! Esta funcion ->  SOLO se ejecuta del LADO DEL SERVIDOR y SOLO se ejecuta En tiempo de BUILD.  Osea se puede leer bases de datos, leer filesystems, leer tokens, etc
//! Nada de lo que yo ejecute en este metodo llega al cliente.
//! Esta funcion solamente se puede usar en las PAGINAS que sean estaticas. osea no puedo usarlas en components
//! Se usa esta funcion siempre y cuando yo pueda saber de antemano cuales son los parametros que esta pagina necesita.
//! shortcut: nextGetStaticProps
// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ctx => {
	console.log('getStaticProps');

	const resp = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
	const { data } = resp;

	const pokemons: SmallPokemon[] = data.results.map((pokemon, indice) => ({
		...pokemon,
		id: indice + 1,
		img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${indice + 1}.svg`,
	}));

	return {
		props: {
			pokemons,
		},
	};
};

export default HomePage;
