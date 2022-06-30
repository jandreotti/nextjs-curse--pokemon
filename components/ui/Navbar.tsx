import { Link, Spacer, Text, useTheme } from '@nextui-org/react';
import Image from 'next/image';
import NextLink from 'next/link'; //! Link es un componente de Next.js Le pongo NextLink porque es la  exportacion por defecto. entonces lo renombro a NextLink porque ya tengo un Link mas arriba

export const Navbar = () => {
	const { theme } = useTheme();
	return (
		<div
			style={{
				display: 'flex',
				width: '100%',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'start',
				padding: '0px 20px',
				backgroundColor: theme?.colors.gray50.value,
			}}
		>
			<Image
				src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'}
				alt='icono de la app'
				width={70}
				height={70}
			/>

			<NextLink href='/' passHref>
				<Link>
					<Text color='white' h2>
						P
					</Text>
					<Text color='white' h3>
						okemon
					</Text>
				</Link>
			</NextLink>

			{/*//! la propiedad css vendria a ser el style de un componente normal => si es un componente de nextUI uso css={}    si es un componente normal html uso style={} */}
			<Spacer
				css={{
					flex: 1,
				}}
			/>
			<NextLink href='/favorites' passHref>
				<Link>
					<Text color='white'>Favoritos</Text>
				</Link>
			</NextLink>
		</div>
	);
};
