import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import FeatherIcon from 'feather-icons-react';
import blobToSrc from '../../../lib/blobToSrc';

class UploadPromoImage extends Component {
	state = {
		preview: this.props.source || null
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.reset) {
			this.setState({ preview: null });
		}

		if (nextProps.source) {
			this.setState({
				preview: nextProps.source
			});
		}
	}

	renderUploadState(isDragActive, isDragReject) {
		let message = 'Drop or drag an image of product';

		if (isDragActive && !isDragReject) {
			message = "Drop it like it's hot!";
		} else if (isDragReject) {
			message = 'File type not allowed';
		}

		return (
			<div>
				<FeatherIcon icon="upload" />
				<p>{message}</p>
			</div>
		);
	}

	handleFile = (file) => {
		const data = new FormData();

		// set preview
		data.append('promo', file[0], file.name);
		this.setPreview(file);

		// pass blob to parent
		this.props.handleFile(data);
	};

	setPreview(file) {
		window.URL.revokeObjectURL(this.state.preview);

		// set new preview
		this.setState({ preview: blobToSrc(file[0]) });
	}

	render() {
		return (
			<Dropzone
				accept="image/png, image/jpeg"
				maxFiles={1}
				minSize={0}
				maxSize={1 << 20}
				onDrop={(file) => this.handleFile(file)}
			>
				{({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
					<StyledUpload {...getRootProps()}>
						<input {...getInputProps()} />
						{this.state.preview ? (
							<img src={this.state.preview} />
						) : (
							this.renderUploadState(isDragActive, isDragReject)
						)}
					</StyledUpload>
				)}
			</Dropzone>
		);
	}
}

export default UploadPromoImage;

const StyledUpload = styled.div`
	border-radius: 4px;
	min-height: 24rem;
	min-width: 20rem;
	max-height: 24rem;
	max-width: 20rem;
	background-color: #eeeeee;
	margin: 2rem auto;
	border: 2px solid #e0e0e0;
	outline: none;
	position: relative;
	cursor: pointer;
	text-align: center;
	grid-area: upload;

	img {
		border-radius: 4px;
		min-width: 20rem;
		min-height: 25rem;
		max-width: 20rem;
		max-height: 25rem;
		transform: scale(1.025);
		transition: 0.3s ease-in-out;
	}

	div {
		position: absolute;
		top: 37.5%;
		left: 50%;
		transform: translate(-50%);
		text-align: center;

		p {
			text-transform: uppercase;
			letter-spacing: 1px;
			font-size: 0.8rem;
			margin-top: 1.5rem;
			opacity: 0.5;
		}
	}

	svg {
		height: 3rem;
		width: 3rem;
		stroke: #9e9e9e;
		opacity: 0.5;
	}

	@media screen and (max-width: 400px) {
		max-width: 100%;
		min-width: 100%;

		img {
			min-width: 100%;
			max-width: 100%;
		}
	}
`;
