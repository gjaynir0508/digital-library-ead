import React from "react";
import Banner from "./Banner";
import TopSellers from "./TopSellers";
import Recommened from "./Recommened";
import News from "./News";
import FreeBooks from "./FreeBooks";

const Home = () => {
	return (
		<>
			<Banner />
			<TopSellers />
			<FreeBooks />
			<Recommened />
			<News />
		</>
	);
};

export default Home;
