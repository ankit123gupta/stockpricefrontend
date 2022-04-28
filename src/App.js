import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import CategorizedData from './components/CategorizedData';
import DeleteData from './components/DeleteData';
import FilterData from './components/FilterData';
import Home from './components/Home';
import Nav from './components/Nav';
import SearchData from './components/SearchData';
import ShowData from './components/ShowData';
import User from './components/User';

function App() {


	return (
		<BrowserRouter>
			<CookiesProvider>
				<Nav />
				<Routes>
					<Route path="/">
						<Route index element={<Home />} />
						<Route path="login" element={<User />} />
						<Route path="search" element={<SearchData />} />
						<Route path="showdata" element={<ShowData />} />
						<Route path="categorizeddata" element={<CategorizedData />} />
						<Route path="filter" element={<FilterData />} />
						<Route path="delete" element={<DeleteData />} />
					</Route>
				</Routes>
			</CookiesProvider>
	  </BrowserRouter>
	);
}

export default App;
