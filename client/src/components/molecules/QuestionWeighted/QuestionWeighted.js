import React, { Component } from 'react';

// components
import { Button, Form, Icon, Menu, Segment } from 'semantic-ui-react';

class QuestionWeighted extends Component {
	constructor(props) {
		super(props);

		this.state = {
			appliesToCategories: new Set(),
			title: this.props.title
		};
	}

	handleCategorySelect(e) {
		var newAppliesToCategories = new Set(this.state.appliesToCategories);

		if (e.target.checked) {
			newAppliesToCategories.add(e.target.value);
		} else {
			console.log('deleting');
			newAppliesToCategories.delete(e.target.value);
		}

		this.setState(
			{
				appliesToCategories: newAppliesToCategories
			},
			() => {
				this.props.handleChange(this.state);
			}
		);
	}

	handleTitleChange(e) {
		this.setState({ title: e.target.value }, () => {
			this.props.handleChange(this.state);
		});
	}

	render() {
		return (
			<Segment data-index={this.props.index}>
				<Menu secondary>
					<Menu.Menu position="left">Weighted Question</Menu.Menu>

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
						<label>Question Title (yes/no question)</label>
						<input
							name="name"
							placeholder="Question Title"
							value={this.props.question.title}
							onChange={this.handleTitleChange.bind(this)}
						/>
					</Form.Field>
					<Form.Group grouped>
						<label>Applies to these Categories:</label>
						{this.props.categorySet.categories.map(category => {
							return (
								<Form.Field
									label={category.name}
									control="input"
									type="checkbox"
									value={category._id}
									onChange={this.handleCategorySelect.bind(
										this
									)}
									key={category._id}
								/>
							);
						})}
					</Form.Group>
				</Form>
			</Segment>
		);
	}
}

export default QuestionWeighted;
