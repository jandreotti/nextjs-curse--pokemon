import { Button, Card, Container, Grid, Text } from '@nextui-org/react';
import confetti from 'canvas-confetti';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/layouts';
import { Pokemon, PokemonListResponse } from '../../interfaces';
import { getPokemonInfo, localFavorites } from '../../utils';
import { GetStaticProps, NextPage, GetStaticPaths } from 'next';
import { pokeApi } from '../../api';

interface Props {
	pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
	//! Uso del ROUTER -> Obtengo el id del pokemon que viene en la ruta
	// const router = useRouter();
	// console.log(router.query.id);
	// https://pokeapi.co/api/v2/pokemon/1

	// console.log(pokemon);

	const [isInFavorites, setIsInFavorites] = useState(false);

	useEffect(() => {
		setIsInFavorites(localFavorites.existInFavorites(pokemon.id));
	}, []);

	const onToggleFavorite = () => {
		localFavorites.toggleFavorite(pokemon.id);
		// setIsInFavorites(localFavorites.existInFavorites(pokemon.id));
		setIsInFavorites(!isInFavorites);

		if (isInFavorites) return;

		confetti({
			zIndex: 999,
			particleCount: 100,
			spread: 160,
			angle: -100,
			origin: { x: 0, y: 0 }, //va de 0 a 1 a lo largo de toda la patalla. vertical y horizontal
		});

		//! CONFETTI
	};

	//! CLIENTE Y SERVIDOR
	//! Esto de aca se ejecuta en el SERVIDOR y del lado del CLIENTE.
	//! Osea que si aqui pongo algo que sea invalido en el lado del servidor voy a tener error: por ej:  console.log('DOS', localStorage.getItem('favorites'));      (EN EL SERVIDOR NO TENGO localStorage)
	//! Otro ejemplo: Si pongo console.log(window)   -> En el navegador me va a decir que es un object. y en la consola del server me va a decir que es un undefined.
	// console.log('UNO'); //SERVIDOR y CLIENTE

	//! SOLO CLIENTE -> useEffect
	//! Esto de aqui se ejecuta del lado del FRON END o del CLIENTE.
	// useEffect(() => {
	// 	// console.log('DOS', localStorage.getItem('favorites')); //CLIENTE

	// }, []);

	return (
		<Layout title={pokemon.name}>
			<Grid.Container css={{ marginTop: '5px' }} gap={2}>
				<Grid xs={12} sm={4}>
					<Card isHoverable css={{ padding: '30px' }}>
						<Card.Body>
							<Card.Image
								src={pokemon.sprites.other?.dream_world.front_default || 'no-image.png'}
								alt={pokemon.name}
								width='100%'
								height='200px'
							/>
						</Card.Body>
					</Card>
				</Grid>

				<Grid xs={12} sm={8}>
					<Card>
						<Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
							<Text h1 transform='capitalize'>
								{pokemon.name}
							</Text>
							<Button color='gradient' ghost={!isInFavorites} onPress={onToggleFavorite}>
								{isInFavorites ? 'En Favoritos' : 'Guardar en Favoritos'}
							</Button>
						</Card.Header>
						<Card.Body>
							<Text size={30}>Sprites:</Text>
							<Container direction='row' display='flex'>
								<Image src={pokemon.sprites.front_default} width={100} height={100} />
								<Image src={pokemon.sprites.back_default} width={100} height={100} />
								<Image src={pokemon.sprites.front_shiny} width={100} height={100} />
								<Image src={pokemon.sprites.back_shiny} width={100} height={100} />
							</Container>
						</Card.Body>
					</Card>
				</Grid>
			</Grid.Container>
		</Layout>
	);
};

//! getStaticPaths
//! FUENTE: https://nextjs.org/docs/basic-features/data-fetching/get-static-paths
// getStaticPaths   -> Obtiene las rutas estaticas de la pagina
//! shortcut: nextGetStaticPath
//! Se ejecuta solamente cuando se realiza el build de la aplicacion.
//! cuando estamos en desarrollo tambien se ejecuta cada vez que recargamos la pagina
// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async ctx => {
	const resp = await pokeApi.get<PokemonListResponse>(`/pokemon?limit=151`);
	const { data } = resp;
	const { results } = data;
	const paths = results.map(({ name }) => ({ params: { name } }));

	// const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`);
	// const paths = pokemons151.map(id => ({ params: { id } }));

	return {
		//! Son los path que voy a permitir o generar en el build-time.
		//! voy a poder recibir X argumentos aqui
		//! la cantidad de path es la cantidad de paginas que voy a PRE GENERAR en el build-time
		// paths: [
		// 	{
		// 		params: {
		// 			name: 'bulbasaur', // Tiene que ser string porque es lo que puedo recibir en el path
		// 		},
		// 	},
		// 	{
		// 		params: {
		// 			name: 'ivysaur',
		// 		},
		// 	},
		// 	{
		// 		params: {
		// 			name: 'venusaur',
		// 		},
		// 	},
		// ],
		paths,
		// fallback: 'blocking', //! Si no encuentra el path, va a pasar igual (podria hacer un fetch y buscarlo o algo asi)
		fallback: false, //! si no encunetro el path va a 404
	};
};

//! getStaticProps
//! Sirve para obtener props que estan generadas del lado de servidor en el build-time
//! En este punto, nosotros recibimos los argumentos de la funcion de arriba.
//! osea primero se ejecuta getStaticPaths, se generan los Paths y luego se ejecuta getStaticProps
//! Puedo hacer  aqui, EN TIEMPO DE EJECUCION, la generacion de toda o parte de la pagina
// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
export const getStaticProps: GetStaticProps = async ctx => {
	// // ctx.params.name; //! name del pokemon que viene en la ruta. Este es el que genero arriba en getStaticPaths
	// const { name } = ctx.params as { name: string };

	// const resp = await pokeApi.get<Pokemon>(`/pokemon/${name}`);
	// const { data } = resp;

	// // Esto lo hago para no tener que poner TOOOOOOOOOOOODA la informacion del pokemon en la pagina estatica. Sino solamente lo que nosotros necesitamos
	// const pokemon = {
	// 	id: data.id,
	// 	name: data.name,
	// 	sprites: data.sprites,
	// };

	// return {
	// 	props: {
	// 		// pokemon: data,
	// 		pokemon,
	// 	},
	// };

	//!---------------------------------------------------------------------------------------------------------------------

	const { name } = ctx.params as { name: string };

	return {
		props: {
			pokemon: await getPokemonInfo(name),
		},
	};
};

export default PokemonByNamePage;
