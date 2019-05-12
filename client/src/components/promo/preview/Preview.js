import React from 'react';
import styled from 'styled-components';
import { PreviewCard } from '../../styles/Card';
import PreviewInfo from './PreviewInfo';
import { Button, FlatButton } from '../../styles/Button';
import PreviewImage from './PreviewImage';
import PreviewImages from './PreviewImages';

const Preview = ({ promoID, title, description, avatar, handle, previews }) => {
	const data = {
		title: 'Taco Sale',
		images: [
			'images/products/1/orWPOWs94bx4KB-8yMPwrR-GjMiu_oXFjVXMahnayZU=.jpg',
			'images/products/1/orWPOWs94bx4KB-8yMPwrR-GjMiu_oXFjVXMahnayZU=.jpg',
			'images/products/1/orWPOWs94bx4KB-8yMPwrR-GjMiu_oXFjVXMahnayZU=.jpg'
		],
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget mauris risus. Cras fermentum eget purus eu dignissim. Quisque a augue sed lorem vulputate consequat. Maecenas eget iaculis libero, eget gravida sem. Proin blandit, tellus at pellentesque fermentum, velit lorem interdum nunc, sed varius magna mi et ante. Nam vehicula magna vel lorem viverra, a pretium est tempus. Ut malesuada rhoncus odio sagittis ultrices. Nulla quis rutrum sem. Suspendisse sit amet urna lectus.'
	};

	return (
		<PreviewCard>
			<PreviewInfo title={title} description={description} />
			<PreviewImages images={previews.map((p) => p.image)} />
			<Button size="small">See Promo</Button>
		</PreviewCard>
	);
};

export default Preview;
