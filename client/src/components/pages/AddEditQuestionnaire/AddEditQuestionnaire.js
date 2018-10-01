import React, { Component } from 'react';
import axios from 'axios';

// components
import {
	Button,
	Divider,
	Dropdown,
	Form,
	Header,
	Icon,
	Menu,
	Message,
	Segment
} from 'semantic-ui-react';

class AddEditQuestionnaire extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentQuestionnaire: {},
			errorMessage: '',
			updateSuccess: false,
			categorySets: []
		};
	}

	componentDidMount() {
		const jwtoken = localStorage.getItem('jwtoken');

		if (this.props.match.params.id) {
			axios
				.get(`/api/questionnaire/${this.props.match.params.id}`, {
					headers: {
						token: jwtoken
					}
				})
				.then(res => {
					console.log(res);
					if (res.data.success) {
						this.setState({
							currentQuestionnaire: res.data.data
						});
					} else {
						var newState = this.state;

						newState.currentQuestionnaire = {
							name: '',
							questions: []
						};

						this.setState(newState);
					}
				});
		}

		axios
			.get('/api/categorySet/', {
				headers: {
					token: jwtoken
				}
			})
			.then(res => {
				let categorySets = res.data.data;

				this.setState({
					categorySets: categorySets
				});
			});
	}

	handleAddQuestionClick() {
		var newQuestions = this.state.currentQuestionnaire.questions;

		var newQuestion = {
			name: '',
			resultDescription: ''
		};

		newQuestions.push(newQuestion);

		this.setState({
			questions: newQuestions
		});
	}

	handleCategorySetChange(e, { value }) {
		var newState = this.state;

		newState['currentQuestionnaire']['categorySetId'] = value;

		this.setState(newState);
	}

	handleCategoryChange(e) {
		var index = e.target.parentNode.parentNode.parentNode.dataset.index;
		var key = e.target.name;
		var value = e.target.value;
		var newState = this.state;

		console.log(index);

		newState['currentQuestionnaire']['questions'][index][key] = value;

		this.setState(newState);
	}

	handleChange(e) {
		var key = e.target.name;
		var value = e.target.value;
		var obj = this.state.currentQuestionnaire;

		obj[key] = value;

		this.setState({
			currentQuestionnaire: obj
		});
	}

	handleDeleteQuestion(e) {
		var index =
			e.target.parentNode.parentNode.parentNode.parentNode.dataset.index;

		var newState = this.state;

		newState.currentQuestionnaire.questions.splice(index, 1);

		this.setState(newState);
	}

	handleSubmit() {
		const jwtoken = localStorage.getItem('jwtoken');

		axios
			.post(`/api/questionnaire/`, this.state.currentQuestionnaire, {
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
				{this.state.updateSuccess ? (
					<Message>Successfully Updated!</Message>
				) : (
					''
				)}
				{this.state.errorMessage ? (
					<Message negative>
						<Message.Header>Error</Message.Header>
						<p>{this.state.errorMessage}</p>
					</Message>
				) : (
					''
				)}

				<Menu secondary>
					<Menu.Menu position="left">
						<Header as="h3">Questionnaire</Header>
					</Menu.Menu>
					<Menu.Menu position="right">
						<Menu.Item>www.link.com</Menu.Item>
						<Menu.Item name="logout" onClick={this.handleItemClick}>
							{this.state.currentQuestionnaire.published ? (
								<Button disabled>
									<Icon disabled name="checkmark" />
									Published
								</Button>
							) : (
								<Button primary>Publish</Button>
							)}
						</Menu.Item>
					</Menu.Menu>
				</Menu>
				<Form>
					<Form.Field>
						<label>Name</label>
						<input
							name="name"
							placeholder="Name"
							value={this.state.currentQuestionnaire.name}
							onChange={this.handleChange.bind(this)}
						/>
					</Form.Field>
					<Form.Field>
						<label>Description</label>
						<textarea
							name="description"
							placeholder="description"
							value={this.state.currentQuestionnaire.description}
							onChange={this.handleChange.bind(this)}
						/>
					</Form.Field>
					<Form.Field>
						<Form.Select
							fluid
							label="Associated Category Set"
							options={this.state.categorySets.map(
								categorySet => {
									return {
										key: 'categorySetId',
										text: categorySet.name,
										value: categorySet._id
									};
								}
							)}
							onChange={this.handleCategorySetChange.bind(this)}
							placeholder="Associated Category Set"
						/>
					</Form.Field>
				</Form>
				<Divider />
				<Header as="h3">Questions</Header>
				<Menu secondary vertical>
					<Dropdown item text="Add Question">
						<Dropdown.Menu>
							<Dropdown.Header>Question Type</Dropdown.Header>
							<Dropdown.Item
								onClick={this.handleAddQuestionClick.bind(this)}
							>
								Weighted
							</Dropdown.Item>
							<Dropdown.Item>Text</Dropdown.Item>
							<Dropdown.Item>Multiple Choice</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Menu>
				{this.state.currentQuestionnaire.questions
					? this.state.currentQuestionnaire.questions.map(
							(category, index) => {
								return (
									<Segment data-index={index}>
										<Menu secondary>
											<Menu.Menu position="right">
												<Menu.Item>
													<Button
														basic
														onClick={this.handleDeleteQuestion.bind(
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
												<label>Category Name</label>
												<input
													name="name"
													placeholder="Category"
													value={category.name}
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
					: 'No questions Yet'}
				<Button onClick={this.handleSubmit.bind(this)}>Save</Button>
			</div>
		);
	}
}

export default AddEditQuestionnaire;
