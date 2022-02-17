import Card from './shared/Card'
import { useState } from 'react'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import { v4 as uuidv4 } from 'uuid'

function FeedbackForm({ handleAdd }) {
	const [text, setText] = useState('')
	//const [id, setId] = useState(() => uuidv4())
	const [rating, setRating] = useState(10)
	const [btnDisabled, setbtnDisabled] = useState(true)
	const [message, setMessage] = useState('')

	const handleTextChange = ({ target: { value } }) => {
		if (value === '') {
			setbtnDisabled(true)
			setMessage(null)
		} else if (value.trim().length < 10) {
			setMessage('Text must be atleast 10 characters')
			setbtnDisabled(true)
		} else {
			setMessage(null)
			setbtnDisabled(false)
		}
		setText(value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (text.trim().length >= 10) {
			const newFeedback = {
				text,
				rating,
			}
			handleAdd(newFeedback)
			setText('')
			setbtnDisabled(true)
		}
	}

	return (
		<Card>
			<form onSubmit={handleSubmit}>
				<h2>How would you rate your service with us?</h2>
				<RatingSelect select={(rating) => setRating(rating)} />
				<div className="input-group">
					<input
						onChange={handleTextChange}
						type="text"
						placeholder="Write a review"
						value={text}
					/>
					<Button type="submit" isDisabled={btnDisabled}>
						Send
					</Button>
				</div>

				{message && <div className="message">{message}</div>}
			</form>
		</Card>
	)
}

export default FeedbackForm
