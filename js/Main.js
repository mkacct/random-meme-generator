'use strict';

class Main extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: true,
			memes: [],
			imgUrl: ""
		};
		this.gen = this.gen.bind(this);
	}
	
	componentDidMount() {
		fetch("https://api.imgflip.com/get_memes")
			.then((res) => {
				if (!res.ok) {throw new Error();}
				return res.json();
			})
			.then((res) => {
				const {memes} = res.data;
				this.setState({memes: memes});
				this.gen();
			})
			.catch((err) => {
				alert("There was an error but I'm too lazy to be more specific");
				this.setState({loading: false});
			});
	}
	
	gen() {
		this.setState({loading: true});
		const meme = this.state.memes[randomInt(this.state.memes.length - 1)];
		const data = {
			template_id: meme.id,
			username: "mkRandomMeme",
			password: "mkRandomMeme"
		};
		for (let i = 0; i < meme.box_count; i++) {
			const numWords = randomInt(1, 6);
			const pickedWords = [];
			for (let j = 0; j < numWords; j++) {
				pickedWords.push(words[randomInt(words.length - 1)]);
			}
			let stringWords = pickedWords.join(" ");
			stringWords = stringWords[0].toUpperCase() + stringWords.substring(1);
			data["boxes[" + i + "][text]"] = stringWords;
		}
		fetch("https://api.imgflip.com/caption_image", {
			method: "post",
			body: new URLSearchParams(data)
		})
			.then((res) => {
				if (!res.ok) {throw new Error();}
				return res.json();
			})
			.then((res) => {
				if (!res.success) {console.log(res); throw new Error();}
				this.setState({
					imgUrl: res.data.url,
					loading: false
				});
			})
			.catch((err) => {
				alert("There was an error but I'm too lazy to be more specific");
				this.setState({loading: false});
			});
	}
	
	render() {
		return (
			<main>
				{this.state.loading ? (
					<p>Loading...</p>
				) : (
					<div>
						<button onClick={this.gen} className="another">Another</button><br/>
						<img src={this.state.imgUrl} className="meme" alt="Meme" />
					</div>
				)}
			</main>
		);
	}
}