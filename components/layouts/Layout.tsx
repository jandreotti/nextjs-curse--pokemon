import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { FC, PropsWithChildren } from 'react';
import { Navbar } from '../ui';

interface Props {
	children: React.ReactElement;
	title?: string;
}

//Para poder obtener el dominio estatico para ponerlo en la imagen uso window.location. pero esto lo tengo que ejecutar en el CLIENTE. NO EN EL SREVIDOR. por eso hago esto.
const origin = typeof window === 'undefined' ? '' : window.location.origin;

export const Layout: FC<PropsWithChildren<Props>> = ({ children, title }) => {
	return (
		<>
			<Head>
				<title>{title || 'Pokemon App'}</title>
				<meta name='author' content='Joaquin Andreotti' />
				<meta name='descripcion' content={`Informacion del Pokemon ${title}`} />
				<meta name='keywords' content={`${title}, pokemon, pokedex`} />

				{/* //! https://ahrefs.com/blog/open-graph-meta-tags/ */}
				<meta property='og:title' content={`Informacion del Pokemon ${title}`} />
				<meta property='og:description' content={`Esta es la pagina sobre ${title}`} />
				<meta property='og:image' content={`${origin}/img/banner.png`} />
			</Head>

			<Navbar />

			<main
				style={{
					padding: '0px 20px',
				}}
			>
				{children}
			</main>
		</>
	);
};
