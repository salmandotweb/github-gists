import { useEffect, useState } from "react";
import axios from "axios";
import Gist from "./components/Gist";

function App() {
	const [data, setData] = useState([]);
	const [gist, setGist] = useState([]);
	const [user, setUser] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { data } = await axios.get(
			`https://api.github.com/users/${user}/gists`
		);
		setData(data);
		data.map((gist) => {
			getGist(gist);
		});
	};

	const getGist = async (gist) => {
		const response = await axios.get(
			`https://gist.githubusercontent.com/${gist.owner.login}/${gist.id}/raw`
		);

		setGist((gist) => [...gist, response.data]);
	};
	return (
		<div className="container">
			<h2>Search Gists by Username</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="search"
					placeholder="Search gists by username"
					value={user}
					onChange={(e) => setUser(e.target.value)}
				/>
			</form>

			<div className="gists-container">
				{data.map((gistUser) => {
					return <Gist key={gistUser.id} gistUser={gistUser} />;
				})}
			</div>
		</div>
	);
}

export default App;
