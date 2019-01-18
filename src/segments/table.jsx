import React, { Component } from 'react'
import _ from 'lodash'

import './table.css'


class Table extends Component {
	stringDecode(input) {
		let e = document.createElement('textarea')
		e.innerHTML = input
		return e.value
	}
	render() {
		let { details, isResult, favorites, add, remove } = this.props
		return (
			<div className="app-table">
				<table>
					<tbody>
						{ _.map(isResult ? details : favorites, (v,i) => {
							let body = this.stringDecode(_.get(v,'body'))
							let isFav = _.includes(favorites, v) 

							return (
								<tr key={i}>
									<td className="table-star" onClick={isResult ? _.partial(add, v) : _.partial(remove, i) }>
										<i className="material-icons" style={{ color: isFav ? 'seagreen': 'grey', cursor: 'pointer'}}>
                                            star
										</i>
									</td>
									<td className="table-title">{_.get(v, 'title')}</td>
									<td className="table-body"dangerouslySetInnerHTML={{ __html: `${body}`}} />
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		)
	}
}

export default Table
