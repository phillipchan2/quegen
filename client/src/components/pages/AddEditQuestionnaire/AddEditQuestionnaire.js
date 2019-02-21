import React, { Component } from 'react'
import axios from 'axios'
import { inject, observer } from 'mobx-react'
import { Link, Redirect } from 'react-router-dom'

// components
import {
	Button,
	Divider,
	Form,
	Header,
	Icon,
	Menu,
	Message,
	Dropdown,
} from 'semantic-ui-react'
import Sortable from 'react-sortablejs'
import EditQuestionWeighted from '../../molecules/EditQuestionWeighted/EditQuestionWeighted'
import EditQuestionText from '../../molecules/EditQuestionText/EditQuestionText'
import EditQuestionMultipleChoice from '../../molecules/EditQuestionMultipleChoice/EditQuestionMultipleChoice'

@inject('AppMessagingStore')
@observer
class AddEditQuestionnaire extends Component {
	constructor(props) {
		super(props)

		this.state = {
			currentQuestionnaire: {},
			errorMessage: '',
			updateSuccess: false,
			categorySets: [],
			currentCategorySet: {},
		}
	}

	componentDidMount() {
		const jwtoken = localStorage.getItem('jwtoken')

		if (this.props.match.params.id) {
			axios
				.get(`/api/questionnaire/${this.props.match.params.id}`, {
					headers: {
						token: jwtoken,
					},
				})
				.then(res => {
					if (res.data.success) {
						this.setState(
							{
								currentQuestionnaire: res.data.data,
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
												token: jwtoken,
											},
										}
									)
									.then(res => {
										let newState = this.state
										let categorySet = res.data.data

										newState[
											'currentCategorySet'
										] = categorySet
										this.setState(newState)
									})
							}
						)
					} else {
						var newState = this.state

						this.props.AppMessagingStore.showAppMessage(
							res.data.message
						)

						newState.currentQuestionnaire = {
							name: '',
							questions: [],
						}

						this.setState(newState)
					}
				})
		}

		// get all category sets
		axios
			.get('/api/categorySet/', {
				headers: {
					token: jwtoken,
				},
			})
			.then(res => {
				let categorySets = res.data.data

				this.setState({
					categorySets: categorySets,
				})
			})
	}

	handleAddQuestionClick(e) {
		const questionType = e.target.dataset.type

		var newQuestions = this.state.currentQuestionnaire.questions

		var newQuestion = {
			title: '',
			type: questionType,
		}

		newQuestions.push(newQuestion)

		this.setState({
			questions: newQuestions,
		})
	}

	handleCategorySetChange(e, { value }) {
		const jwtoken = localStorage.getItem('jwtoken')
		var newState = this.state

		axios
			.get(`/api/categorySet/${value}`, {
				headers: {
					token: jwtoken,
				},
			})
			.then(res => {
				let categorySet = res.data.data

				newState['currentQuestionnaire']['categorySetId'] = value
				newState['currentCategorySet'] = categorySet
				this.setState(newState)
			})
	}

	handleChange(e) {
		var key = e.target.name
		var value = e.target.value
		var obj = this.state.currentQuestionnaire

		obj[key] = value

		this.setState({
			currentQuestionnaire: obj,
		})
	}

	handleDelete(index) {
		var newState = this.state

		newState.currentQuestionnaire.questions.splice(index, 1)

		this.setState(newState)
	}

	handleDeleteQuestion(e) {
		var index =
			e.target.parentNode.parentNode.parentNode.parentNode.dataset.index

		var newState = this.state

		newState.currentQuestionnaire.questions.splice(index, 1)

		this.setState(newState)
	}

	handleQuestionMove(direction, index) {
		var newState = this.state
		var currentQuestion = newState.currentQuestionnaire.questions[index]

		if (direction === 'up') {
			newState.currentQuestionnaire.questions.splice(index, 1)
			newState.currentQuestionnaire.questions.splice(
				index - 1,
				0,
				currentQuestion
			)

			this.setState(newState)
		} else if (direction === 'down') {
			newState.currentQuestionnaire.questions.splice(index, 1)
			newState.currentQuestionnaire.questions.splice(
				index + 1,
				0,
				currentQuestion
			)

			this.setState(newState)
		}
		this.setState(newState)
	}

	handleQuestionChange(questionData, index) {
		var newState = this.state
		var currentQuestion = newState.currentQuestionnaire.questions[index]
		var newQuestion = Object.assign(currentQuestion, questionData)

		if (newQuestion.appliesToCategories) {
			newQuestion.appliesToCategories = Array.from(
				newQuestion.appliesToCategories
			)
		}

		newState.currentQuestionnaire.questions[index] = newQuestion

		this.setState(newState)
	}

	handleSubmit() {
		const jwtoken = localStorage.getItem('jwtoken')

		axios
			.post(`/api/questionnaire/`, this.state.currentQuestionnaire, {
				headers: {
					token: jwtoken,
				},
			})
			.then(res => {
				if (res.data.success) {
					this.setState({
						updateSuccess: true,
						errorMessage: '',
					})

					this.props.AppMessagingStore.showAppMessage(
						'Successfully Updated!'
					)

					setTimeout(() => {
						this.setState({
							updateSuccess: false,
						})
					}, 3000)
				} else {
					this.setState({
						updateSuccess: false,
						errorMessage:
							'Error submitting. Make sure all fields are filled',
					})
				}
			})
	}

	render() {
		let sortable = null
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
					<Redirect to={'/admin/questionnaires'} />
				) : (
					<div>
						<Menu secondary style={{ marginLeft: 0 }}>
							<Header as="h2">Questionnaire</Header>

							<Menu.Menu position="right">
								<Menu.Item>
									{this.state.currentQuestionnaire._id ? (
										<Link
											to={`/questionnaires/${
												this.state.currentQuestionnaire
													._id
											}`}
										>{`/questionnaires/${
											this.state.currentQuestionnaire._id
										}`}</Link>
									) : (
										''
									)}
								</Menu.Item>
								<Menu.Item
									name="logout"
									onClick={this.handleItemClick}
								>
									<Button
										primary
										onClick={this.handleSubmit.bind(this)}
									>
										Save
									</Button>
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
									value={
										this.state.currentQuestionnaire
											.description
									}
									onChange={this.handleChange.bind(this)}
								/>
							</Form.Field>
							<Form.Field>
								<label>
									Password (password that users have to enter
									to access)
								</label>
								<input
									name="password"
									placeholder="password"
									value={
										this.state.currentQuestionnaire.password
									}
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
												value: categorySet._id,
											}
										}
									)}
									defaultValue={
										this.state.currentCategorySet._id
									}
									onChange={this.handleCategorySetChange.bind(
										this
									)}
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
											<Dropdown.Item
												data-type="text"
												onClick={this.handleAddQuestionClick.bind(
													this
												)}
											>
												Text
											</Dropdown.Item>
											<Dropdown.Item
												data-type="multipleChoice"
												onClick={this.handleAddQuestionClick.bind(
													this
												)}
											>
												Multiple Choice
											</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								</Menu>
								{this.state.currentQuestionnaire.questions
									.length > 0 ? (
									<Sortable
										options={{}}
										tag="div"
										ref={c => {
											if (c) {
												sortable = c.sortable
											}
										}}
										onChange={(order, sortable, evt) => {
											console.group(order, sortable)
										}}
									>
										{this.state.currentQuestionnaire.questions.map(
											(question, index) => {
												switch (question.type) {
													case 'weighted':
														return (
															<EditQuestionWeighted
																index={index}
																key={
																	question._id
																}
																handleQuestionMove={this.handleQuestionMove.bind(
																	this
																)}
																question={
																	question
																}
																categorySet={
																	this.state
																		.currentCategorySet
																}
																handleChange={this.handleQuestionChange.bind(
																	this
																)}
																handleDelete={this.handleDelete.bind(
																	this
																)}
															/>
														)
													case 'text':
														return (
															<EditQuestionText
																index={index}
																key={
																	question._id
																}
																handleQuestionMove={this.handleQuestionMove.bind(
																	this
																)}
																handleDelete={this.handleDelete.bind(
																	this
																)}
																question={
																	question
																}
																categorySet={
																	this.state
																		.currentCategorySet
																}
																handleChange={this.handleQuestionChange.bind(
																	this
																)}
															/>
														)
													case 'multipleChoice':
														return (
															<EditQuestionMultipleChoice
																index={index}
																key={
																	question._id
																}
																handleChange={this.handleQuestionChange.bind(
																	this
																)}
																handleQuestionMove={this.handleQuestionMove.bind(
																	this
																)}
																handleDelete={this.handleDelete.bind(
																	this
																)}
																question={
																	question
																}
															/>
														)

													default:
														return 'Question'
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
					</div>
				)}
			</div>
		)
	}
}

export default AddEditQuestionnaire
