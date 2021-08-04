import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { v4 as uuidv4 } from 'uuid'
import './MyStyles.css'

const MyDropzone = (props) => {
	const onDrop = useCallback(acceptedFiles => {
		acceptedFiles.forEach((file) => {
			file["id"] = uuidv4()
			file["preview"] = URL.createObjectURL(file)
		})
		props.setImages(acceptedFiles)
	}, [])
	  
	const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop}) 

	return (
		<div className="dropzone" {...getRootProps()}>
		  	<input {...getInputProps()}/>
		  	{
				isDragActive?  
					<p>Drop the files here...</p>  
				:
					<p>Drag and drop some files here, or click to select files</p>
		  	}
		</div>
	)
}

export default MyDropzone