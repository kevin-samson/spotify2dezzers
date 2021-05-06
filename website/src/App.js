import React from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./components/Dashboard";
import Converter from "./components/Converter";

function App() {
	return (
		<>
			<Switch>
				<Route path="/" exact component={Dashboard}></Route>
				<Route path="/converted/:id" component={Converter}></Route>
			</Switch>
		</>
	);
}

export default App;
