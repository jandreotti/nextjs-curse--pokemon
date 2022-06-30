import { Card, Grid, Row, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { SmallPokemon } from '../../interfaces';

interface Props {
	pokemon: SmallPokemon;
}

const PokemonCard: FC<Props> = ({ pokemon }) => {
	const { id, name, img } = pokemon;

	//! Funcion de clickeo
	const router = useRouter();
	const onClick = () => {
		// router.push(`/pokemon/${id}`);
		router.push(`/name/${name}`);
	};

	return (
		// la cantidad de columnas son 12 (no se porque pero es asi)
		// En pantallas muy pequeñas xs , cada tarjeta ocupa 6 (Osea solamente se muestran 2)
		// En pantallas  pequeñas sm , cada tarjeta ocupa 3 (Osea solamente se muestran 4)
		// En pantallas  medianas md , cada tarjeta ocupa 2 (Osea solamente se muestran 6)
		// En pantallas  grandes xl , cada tarjeta ocupa 1 (Osea  se muestran las 12)

		<Grid xs={6} sm={3} md={2} xl={1} key={id}>
			<Card isHoverable isPressable onClick={onClick}>
				<Card.Body css={{ p: 1 }}>
					<Card.Image src={img} width='100%' height={140} />
				</Card.Body>

				<Card.Footer>
					<Row justify='space-between'>
						<Text transform='capitalize'>{name}</Text>
						<Text>#{id}</Text>
					</Row>
				</Card.Footer>
			</Card>
		</Grid>
	);
};

export default PokemonCard;
