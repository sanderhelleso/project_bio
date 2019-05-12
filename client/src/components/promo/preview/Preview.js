import React from 'react';
import { PreviewCard } from '../../styles/Card';
import PreviewInfo from './PreviewInfo';
import { Button } from '../../styles/Button';
import PreviewImages from './PreviewImages';

import { withRouter } from 'react-router-dom';

const Preview = ({ promoID, title, description, avatar, handle, previews, history }) => {
	return (
		<PreviewCard>
			<PreviewInfo title={title} description={description} avatar={avatar} handle={handle} />
			<PreviewImages images={previews.map((p) => p.image)} />
			<Button
				size="small"
				onClick={() => {
					history.push(`/${handle}/promos/`);
					history.go(1);
					setTimeout(() => {
						history.replace(`/${handle}/promos/${promoID}`);
					}, 0);
				}}
			>
				See Promo
			</Button>
		</PreviewCard>
	);
};

export default withRouter(Preview);
