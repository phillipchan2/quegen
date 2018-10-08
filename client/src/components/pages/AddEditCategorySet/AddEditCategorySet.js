import React, { Component } from 'react';
import axios from 'axios';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

// components
import {
	Button,
	Divider,
	Form,
	Header,
	Icon,
	Menu,
	Message,
	Segment
} from 'semantic-ui-react';

@inject('AppMessagingStore')
@observer
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
					console.log(res);
					if (res.data.success) {
						this.setState({
							currentCategorySet: res.data.data
						});
					} else {
						var newState = this.state;

						newState.currentCategorySet = {
							name: '',
							categories: []
						};

						this.setState(newState);
					}
				});
		}
	}

	handleAddCategoryClick() {
		var newCategories = this.state.currentCategorySet.categories;

		var newCategory = {
			name: '',
			resultDescription: ''
		};

		newCategories.push(newCategory);

		this.setState({
			categories: newCategories
		});
	}

	handleCategoryChange(e) {
		var index = e.target.parentNode.parentNode.parentNode.dataset.index;
		var key = e.target.name;
		var value = e.target.value;
		var newState = this.state;

		console.log(index);

		newState['currentCategorySet']['categories'][index][key] = value;

		this.setState(newState);
	}

	handleChange(e) {
		var key = e.target.name;
		var value = e.target.value;
		var obj = this.state.currentCategorySet;

		obj[key] = value;

		this.setState({
			currentCategorySet: obj
		});
	}

	handleDeleteCategory(e) {
		var index =
			e.target.parentNode.parentNode.parentNode.parentNode.dataset.index;

		var newState = this.state;

		newState.currentCategorySet.categories.splice(index, 1);

		this.setState(newState);
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
				if (res.data.success) {
					this.setState({
						updateSuccess: true,
						errorMessage: ''
					});

					this.props.AppMessagingStore.showAppMessage(
						'Successfully Updated!'
					);
				} else {
					this.setState({
						errorMessage:
							'Error submitting. Make sure all fields are filled'
					});
				}
			});
	}

	render() {
		return (
			<div>
				{this.state.errorMessage ? (
					<Message negative>
						<Message.Header>Error</Message.Header>
						<p>{this.state.errorMessage}</p>
					</Message>
				) : (
					''
				)}
				{this.state.updateSuccess ? (
					<Redirect to={'/admin/categorySets'} />
				) : (
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
						</Form>
						<Divider />
						<Header as="h3">Categories</Header>
						<Button
							onClick={this.handleAddCategoryClick.bind(this)}
						>
							Add Category
						</Button>
						{this.state.currentCategorySet.categories
							? this.state.currentCategorySet.categories.map(
									(category, index) => {
										return (
											<Segment data-index={index}>
												<Menu secondary>
													<Menu.Menu position="right">
														<Menu.Item>
															<Button
																basic
																onClick={this.handleDeleteCategory.bind(
																	this
																)}
															>
																<Icon name="trash" />
																Delete
															</Button>
														</Menu.Item>
													</Menu.Menu>
												</Menu>
												<Form>
													<Form.Field>
														<label>
															Category Name
														</label>
														<input
															name="name"
															placeholder="Category"
															value={
																category.name
															}
															onChange={this.handleCategoryChange.bind(
																this
															)}
														/>
													</Form.Field>
													<Form.Field>
														<label>
															Result Description
														</label>
														<textarea
															name="resultDescription"
															placeholder="Category"
															value={
																category.resultDescription
															}
															onChange={this.handleCategoryChange.bind(
																this
															)}
														/>
													</Form.Field>
												</Form>
											</Segment>
										);
									}
							  )
							: 'No Categories Yet'}
						<Button onClick={this.handleSubmit.bind(this)}>
							Save
						</Button>
					</div>
				)}
			</div>
		);
	}
}

export default AddEditCategorySet;
