import React, { Component } from 'react';

// components
import {
	Button,
	Form,
	Icon,
	Menu,
	Segment,
	Accordion,
	Label
} from 'semantic-ui-react';
class EditQuestionMultipleChoice extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: this.props.question.title,
			choices: []
		};
	}

	addChoice() {
		var newState = this.state;

		newState.choices.push({
			name: ''
		});

		this.setState(newState);
	}

	handleChoiceChange(index, e) {
		var newState = this.state;
		console.log(e.target.value);
		console.log(index);

		newState.choices[index].name = e.target.value;

		this.setState(newState);
	}

	handleClick = (e, titleProps) => {
		const { index } = titleProps;
		const { activeIndex } = this.state;
		const newIndex = activeIndex === index ? -1 : index;

		this.setState({ activeIndex: newIndex });
	};

	handleTitleChange(e) {
		this.setState({ title: e.target.value }, () => {
			this.props.handleChange(this.state, this.props.index);
		});
	}

	render() {
		const { activeIndex } = this.state;
		return (
			<Accordion as={Menu} vertical fluid data-id={this.props.key}>
				<Accordion.Title
					active={activeIndex === 0}
					content={
						<div style={{ display: 'inline' }}>
							{this.props.question.title}
							<Label
								color="teal"
								style={{ float: 'right', marginRight: '1em' }}
							>
								{this.props.question.type}
							</Label>
						</div>
					}
					index={0}
					onClick={this.handleClick}
				/>
				<Accordion.Content
					active={activeIndex === 0}
					content={
						<Segment data-index={this.props.index}>
							<Menu secondary>
								<Menu.Menu position="left">
									Text Question
								</Menu.Menu>

								<Menu.Menu position="right">
									<Menu.Item>
										<Button basic>
											<Icon name="trash" />
											Delete
										</Button>
									</Menu.Item>
								</Menu.Menu>
							</Menu>
							<Form>
								<Form.Field>
									<label>Question Title</label>
									<input
										name="name"
										placeholder="Question Title"
										value={this.props.question.title}
										onChange={this.handleTitleChange.bind(
											this
										)}
									/>
								</Form.Field>
							</Form>
							<Button onClick={this.addChoice.bind(this)}>
								Add Choice
							</Button>

							{this.state.choices.map((choice, index) => {
								return (
									<Form>
										<Form.Field>
											<label>Choice</label>
											<input
												name="name"
												placeholder="Question Title"
												value={
													this.state.choices[index]
														.name
												}
												onChange={this.handleChoiceChange.bind(
													this,
													index
												)}
											/>
										</Form.Field>
									</Form>
								);
							})}
						</Segment>
					}
				/>
			</Accordion>
		);
	}
}

export default EditQuestionMultipleChoice;
