import React from 'react';
import "./MyStyles.css"

const ImageCards = (props) => {

	const deleteImageByID = (image_id) => {
		const arr = props.images.filter(elem => elem.id != image_id)
		props.setImages(arr)
	}

	return(
		<div>
			{props.images.map(image => 
				<div className="card">
					<img className="cardImage" src={image.preview}/>
					<button className="cardButton" onClick={() => deleteImageByID(image.id)}>Delete</button>
				</div>
			)}
		</div>
	)

}

export default ImageCards