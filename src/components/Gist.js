const Gist = ({ gistUser }) => {
	return (
		<div className="gist">
			<h3 className="badge">
				{gistUser.files[Object.keys(gistUser.files)[0]].language}
			</h3>
		</div>
	);
};

export default Gist;
