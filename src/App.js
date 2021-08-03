import { v4 as uuidv4 } from 'uuid';
import { storage } from './firebase';
import React, { useState } from 'react';


function App() {
	const [images, setImages] = useState([])
	const [urls, setUrls] = useState([])

    const handleUpload = () => {
		const promises = []

		images.forEach((image) => {
			const uploadTask = storage.ref(`images/${image.id}`).put(image)
			
			promises.push(uploadTask)

			uploadTask.on(
				"state_changed",
				snapshot => {},
				error => {
					console.log("ERROR:" + error)
				},
				async () => {
					await storage
						.ref("images")
						.child(image.id)
						.getDownloadURL()
						.then(url => setUrls((prev) => [...prev, url]))
				}
			)
		})
	}

    return(
        <div>
            <input 
				type="file" 
				multiple 
				onChange={
					(e) => {
						if(e.target.files) {
							const arr = Object.values(e.target.files)
							arr.forEach((elem) => elem["id"] = uuidv4())
							setImages(arr)
						}
    				}
				}
			/>

            <button onClick={handleUpload}>Upload</button>
			<div>
				{urls && urls.sort().map((elem) => <div>{elem}</div>)}
			</div>
        </div>
    )
}

export default App;
