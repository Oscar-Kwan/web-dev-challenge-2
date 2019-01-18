import React, { Component } from 'react'
import _ from 'lodash'
import db from '../swm_waste_wizard_APR.json'
import Table from '../segments/table'
import './App.css'

class App extends Component {
	
	constructor(props) {
		super(props)

		this.state = {
			json: db,
			searched: [],
			favorites: [],
			term: ''}
	}

	onChange = (event) => {
		this.setState({term: event.target.value})
	}

	_handleSearch = (event) => {
		event.preventDefault()
		let currentList = []
		let newList = []

		if (this.state.term !== "") {
			currentList = this.state.json
			newList = _.filter(currentList, (v) => {
				return _.includes(_.lowerCase(v.title), _.lowerCase(this.state.term))
			})
		}

		this.setState({
			searched: newList
		})
	}

	_handleFavorite = (value) => {
		if (this.state.favorites === []){
			this.setState({ favorites: value})
		}

		this.setState({
			favorites: _.uniq([...this.state.favorites, value])
		})
	}

	_handleRemove = (index) => {
		let newList = _.remove(this.state.favorites, (v, i) => {
            return i !== index
        })

		this.setState({
			favorites: newList
		})
	}


	render() {
		let { searched, favorites, term } = this.state 
		return (
			<div className="app">
				<header className="app-header">
					<h1>Toronto Waste Lookup</h1>
				</header>
				<div className="app-main">
					<div className="app-searchbar">
						<form className="form" id="search" onSubmit={this._handleSearch}>
							<input type="text" className="input" value={term} placeholder="Search ..." onChange={this.onChange} />
							<button type="submit" className="search-button">
								<i className="material-icons search-icon">search</i>
							</button>
						</form>
					</div>
					<div className="app-results">
						<Table isResult={true} details={searched} favorites={favorites} add={this._handleFavorite}/>
					</div>
					<div className="app-favorites">
						<h1 className="app-fav-title">Favourites</h1>
						<Table isResult={false} details={searched} favorites={favorites} remove={this._handleRemove}/>
					</div>
				</div>
			</div>
		)
	}
}

export default App
