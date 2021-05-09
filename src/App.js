import React, { useState } from 'react';
import Axios from 'axios';

const App = () => {
	const [name, setName] = useState("");
	const [multerImage, setmulterImage] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		let imageFormObj = new FormData();
		imageFormObj.append("imageName", "multer-image-" + Date.now());
		imageFormObj.append("imageData", multerImage);
		imageFormObj.append("name", name);

		Axios.post(`/image/uploadmulter`, imageFormObj)
			.then((data) => {
				if (data.data.success) {
					// alert("Image has been successfully uploaded using multer");
					setmulterImage(data.data.document.imageData);
					setName("");
				}
			})
			.catch((err) => {
				alert("Error while uploading image using multer");
			});
	}

	const handleChange = (event) => {
		setName(event.target.value);
	}

	const uploadImage = (event) => {
		setmulterImage(event.target.files[0]);
	}

	return (
		<>
			<div className="container my-5">
				<div className="row">
					<form onSubmit={handleSubmit}>
						<h3 className="my-3">Single File Upload Example</h3>
						
						<div className="form-group my-3">
							<label htmlFor="name">Enter your name: </label>
							<input
								id="name"
								type="text"
								value={name}
								onChange={handleChange}
							/>
						</div>

						<div className="form-group my-3">
							<input type="file" onChange={uploadImage} />
						</div>

						<div className="form-group my-3">
							<img src={multerImage} alt="upload-image" height="200px" width="200px" />
						</div>
						
						<div className="form-group my-3">
							<button className="btn btn-primary" type="submit">Submit</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default App;