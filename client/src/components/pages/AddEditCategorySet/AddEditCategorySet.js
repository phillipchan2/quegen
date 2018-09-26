import React, { Component } from 'react';
import axios from 'axios';

// components
import { Button, Form } from 'semantic-ui-react';

class AddEditCategorySet extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentCategorySet: {},
			errorMessage: '',
			updateSuccess: false
		};
	}

	componentDidMount() {
		if (this.props.match.params.id) {
			const jwtoken = localStorage.getItem('jwtoken');

			axios
				.get(`/api/categorySet/${this.props.match.params.id}`, {
					headers: {
						token: jwtoken
					}
				})
				.then(res => {
					console.log(res.data.data);

					this.setState({
						currentCategorySet: res.data.data
					});
				});
		}
	}

	handleChange(e) {
		var key = e.target.name;
		var value = e.target.value;
		var obj = this.state.currentCategorySet;

		obj[key] = value;

		console.log(obj);

		this.setState({
			currentCategorySet: obj
		});
	}

	handleSubmit() {
		const jwtoken = localStorage.getItem('jwtoken');

		axios
			.post(`/api/categorySet/`, this.state.currentCategorySet, {
				headers: {
					token: jwtoken
				}
			})
			.then(res => {
				console.log(res.data.data);
			});
	}

	render() {
		return (
			<div>
				<Form>
					<Form.Field>
						<label>Name</label>
						<input
							name="name"
							placeholder="Name"
							value={this.state.currentCategorySet.name}
							onChange={this.handleChange.bind(this)}
						/>
					</Form.Field>
					<Button onClick={this.handleSubmit.bind(this)}>Save</Button>
				</Form>
			</div>
		);
	}
}

export default AddEditCategorySet;
