import './App.css';
import { storage } from './firebase'
import React, { useState } from 'react';
import MyDropzone from './components/MyDropzone';
import { toast } from 'react-toastify'
import { Table, Icon, Button } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import ImageCards from './components/ImageCards';


toast.configure()

function App() {
	const [images, setImages] = useState([])
	const [urls, setUrls] = useState([])

	const handleUpload = () => {
		const promises  = []

		images.forEach((image) => {
			const uploadTask = storage.ref("images/" + image.id).put(image)

			promises.push(uploadTask)

			uploadTask.on(
				"state_changed",
				snapshot => {},
				error => {
					alert("ERROR:" + error)
				},
				async () => {
					await storage.ref("images").child(image.id).getDownloadURL().then(  url => setUrls(  (prev) => [...prev, url]  )  )
				}
			)
		})

		Promise.all(promises)
			.then(() => {
				createToast("Files uploaded")
				setImages([])
			})
			.catch((err) => {
				toast.error(err)
			})
	}

	const createToast = (message) => {
		toast.info(message)
	}

	return (
		<div className="App">
			<MyDropzone setImages={setImages}/>
			
			<Button inverted color="blue" onClick={handleUpload}>Upload</Button>

			<ImageCards images={images} setImages={setImages}/>

			{urls && urls.sort().map((elem) => <div>{elem}</div>)}

		</div>
	);

	
}

export default App;
