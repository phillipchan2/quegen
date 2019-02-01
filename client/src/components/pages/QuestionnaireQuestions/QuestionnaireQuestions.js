import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Message } from 'semantic-ui-react'
import Slider from 'react-slick'

// components
import ViewQuestionWeighted from '../../molecules/ViewQuestionWeighted/ViewQuestionWeighted'
import ViewQuestionText from '../../molecules/ViewQuestionText/ViewQuestionText'
import ViewQuestionMultipleChoice from '../../molecules/ViewQuestionMultipleChoice/ViewQuestionMultipleChoice'

class QuestionnaireQuestions extends Component {
	constructor(props) {
		super(props)

		this.state = {
			responses: [],
			showPrevButton: false,
			showSubmitButton: false,
		}

		this.questionAnswered = this.questionAnswered.bind(this)
		this.prev = this.prev.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	UNSAFE_componentWillMount() {
		var responses = this.props.questions.map(question => {
			return {
				_id: question._id,
				answered: false,
				value: undefined,
				type: question.type,
			}
		})

		this.setState({ responses: responses })
	}

	areQuestionsAnswered() {
		let unansweredQuestions = []

		this.state.responses.forEach((answer, index) => {
			if (answer.answered !== true) {
				unansweredQuestions.push(index)
			}
		})

		if (unansweredQuestions.length > 0) {
			return unansweredQuestions
		} else {
			return true
		}
	}

	questionAnswered(responseFromQuestion) {
		var responses = this.state.responses

		responses.find((answer, index) => {
			if (answer._id === responseFromQuestion._id) {
				responses[index].answered = true
				responses[index].value = responseFromQuestion.value

				this.slider.slickNext()
				this.setState({
					showPrevButton: true,
				})

				// see if answers are all answered
				if (this.areQuestionsAnswered() === true) {
					this.props.handleSubmitData({
						responses: this.state.responses,
					})
				} else {
					this.setState({
						showSubmitButton: false,
					})
				}
			}
		})

		this.setState({ responses: responses })
	}

	handleSubmit() {
		var resultsOfCheckingresponses = this.areQuestionsAnswered()

		if (resultsOfCheckingresponses === true) {
			this.props.handleSubmitData({ responses: this.state.responses })
		} else {
			let errorMessage = `You have questions ${resultsOfCheckingresponses.map(
				questionNumber => {
					return `${questionNumber + 1} `
				}
			)} unanswered`

			this.props.handlePageError(errorMessage)
		}
	}

	prev() {
		this.slider.slickPrev()
		this.setState({
			showPrevButton: false,
		})
	}

	render() {
		var settings = {
			arrows: false,
			dots: false,
			infinite: false,
			speed: 250,
			slidesToShow: 1,
			slidesToScroll: 1,
			swipe: false,
		}
		return (
			<div className="questionnaire-questions" style={{ padding: '1em' }}>
				<Slider ref={c => (this.slider = c)} {...settings}>
					{this.props.questions.map((question, index) => {
						switch (question.type) {
							case 'weighted':
								return (
									<section className="question">
										<ViewQuestionWeighted
											questionAnswered={this.questionAnswered.bind(
												this
											)}
											question={question}
										/>
									</section>
								)
							case 'text':
								return (
									<section className="question">
										<ViewQuestionText
											questionAnswered={this.questionAnswered.bind(
												this
											)}
											question={question}
										/>
									</section>
								)
							case 'multipleChoice':
								return (
									<section className="question">
										<ViewQuestionMultipleChoice
											questionAnswered={this.questionAnswered.bind(
												this
											)}
											question={question}
										/>
									</section>
								)
							default:
								return 'Error - Wrong question type'
						}
					})}
				</Slider>

				{this.state.showPrevButton && (
					<div
						style={{ color: '#FFF' }}
						className="prev-button"
						onClick={this.prev}
					>
						<svg
							style={{ transform: 'rotate(180deg)' }}
							height="30"
							fill="#FFF"
							id="Layer_1"
							version="1.1"
							viewBox="0 0 512 512"
							width="30"
						>
							<polygon points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256 " />
						</svg>
					</div>
				)}
			</div>
		)
	}
}

QuestionnaireQuestions.propTypes = {
	handleSuccessfulPage: PropTypes.func,
	handleSubmitData: PropTypes.func,
	handlePageError: PropTypes.func,
	questionnaireId: PropTypes.string,
}

export default QuestionnaireQuestions
