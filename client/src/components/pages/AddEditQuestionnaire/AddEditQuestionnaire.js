import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// components
import {
	Button,
	Divider,
	Form,
	Header,
	Icon,
	Accordion,
	Menu,
	Label,
	Message,
	Segment,
	Dropdown
} from 'semantic-ui-react';
import Sortable from 'react-sortablejs';
import EditQuestionWeighted from '../../molecules/EditQuestionWeighted/EditQuestionWeighted';

class AddEditQuestionnaire extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentQuestionnaire: {},
			errorMessage: '',
			updateSuccess: false,
			categorySets: [],
			currentCategorySet: {}
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
					if (res.data.success) {
						this.setState(
							{
								currentQuestionnaire: res.data.data
							},
							() => {
								axios
									.get(
										`/api/categorySet/${
											this.state.currentQuestionnaire
												.categorySetId
										}`,
										{
											headers: {
												token: jwtoken
											}
										}
									)
									.then(res => {
										let newState = this.state;
										let categorySet = res.data.data;

										console.log('categorySet', categorySet);

										newState[
											'currentCategorySet'
										] = categorySet;
										this.setState(newState);
									});
							}
						);
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

		// get all category sets
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

	handleAddQuestionClick(e) {
		const questionType = e.target.dataset.type;

		var newQuestions = this.state.currentQuestionnaire.questions;

		var newQuestion = {
			title: '',
			type: questionType
		};

		newQuestions.push(newQuestion);

		this.setState({
			questions: newQuestions
		});
	}

	handleCategorySetChange(e, { value }) {
		const jwtoken = localStorage.getItem('jwtoken');
		var newState = this.state;

		axios
			.get(`/api/categorySet/${value}`, {
				headers: {
					token: jwtoken
				}
			})
			.then(res => {
				let categorySet = res.data.data;

				newState['currentQuestionnaire']['categorySetId'] = value;
				newState['currentCategorySet'] = categorySet;
				this.setState(newState);
			});
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

	handleQuestionChange(questionData, index) {
		var newState = this.state;
		var currentQuestion = newState.currentQuestionnaire.questions[index];
		var newQuestion = Object.assign(currentQuestion, questionData);
		newQuestion.appliesToCategories = Array.from(
			newQuestion.appliesToCategories
		);
		console.log(newQuestion);

		newState.currentQuestionnaire.questions[index] = newQuestion;

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

					setTimeout(() => {
						this.setState({
							updateSuccess: false
						});
					}, 3000);
				} else {
					this.setState({
						errorMessage:
							'Error submitting. Make sure all fields are filled'
					});
				}
			});
	}

	componentDidUpdate(prevProps, prevState) {
		console.log('prevProps', prevProps);
		console.log('prevState', prevState);
	}

	render() {
		let sortable = null;
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
				<Menu secondary style={{ marginLeft: 0 }}>
					<Header as="h2">Questionnaire</Header>

					<Menu.Menu position="right">
						<Menu.Item>
							<Link
								target="_blank"
								to={`/questionnaires/${
									this.state.currentQuestionnaire._id
								}`}
							>{`/questionnaires/${
								this.state.currentQuestionnaire._id
							}`}</Link>
						</Menu.Item>
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
						<Dropdown
							fluid
							selection
							label="Associated Category Set"
							options={this.state.categorySets.map(
								categorySet => {
									return {
										key: categorySet._id,
										text: categorySet.name,
										value: categorySet._id
									};
								}
							)}
							defaultValue={this.state.currentCategorySet._id}
							onChange={this.handleCategorySetChange.bind(this)}
							placeholder="Associated Category Set"
						/>
					</Form.Field>
				</Form>
				<Divider />
				<Header as="h3">Questions</Header>
				{this.state.currentCategorySet._id ? (
					<div>
						<Menu secondary vertical>
							<Dropdown item text="Add Question">
								<Dropdown.Menu>
									<Dropdown.Header>
										Question Type
									</Dropdown.Header>
									<Dropdown.Item
										data-type="weighted"
										onClick={this.handleAddQuestionClick.bind(
											this
										)}
									>
										Weighted
									</Dropdown.Item>
									<Dropdown.Item>Text</Dropdown.Item>
									<Dropdown.Item>
										Multiple Choice
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</Menu>
						{this.state.currentQuestionnaire.questions.length >
						0 ? (
							<Sortable
								options={{}}
								tag="div"
								ref={c => {
									if (c) {
										sortable = c.sortable;
									}
								}}
								onChange={(order, sortable, evt) => {
									console.log(order);
								}}
							>
								{this.state.currentQuestionnaire.questions.map(
									(question, index) => {
										switch (question.type) {
											case 'weighted':
												return (
													<EditQuestionWeighted
														index={index}
														key={question._id}
														question={question}
														categorySet={
															this.state
																.currentCategorySet
														}
														handleChange={this.handleQuestionChange.bind(
															this
														)}
													/>
												);
											default:
												return 'Question';
										}
									}
								)}
							</Sortable>
						) : (
							'No Questions Yet'
						)}
					</div>
				) : (
					'Please select an associated category set first'
				)}

				<Button onClick={this.handleSubmit.bind(this)}>Save</Button>
			</div>
		);
	}
}

export default AddEditQuestionnaire;
