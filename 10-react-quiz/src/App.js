import { useEffect, useReducer } from 'react';
import Header from './components/Header.js';
import Main from './components/Main.js';
import Loader from './components/Loader.js';
import Error from './components/Error.js';

import StartScreen from './components/StartScreen.js';
import Question from './components/Question.js';
import NextButton from './components/NextButton.js';
import Progress from './components/Progress.js';

const initialState = {
	questions: [],
	// loading , error, ready, active,finished
	status: 'loading',
	index: 0,
	answer: null,
	points: 0,
};
function reducer(state, action) {
	switch (action.type) {
		case 'dataReceived':
			return {
				...state,
				questions: action.payload,
				status: 'ready',
			};
		case 'dataFailed':
			return {
				...state,
				status: 'error',
			};
		case 'start':
			return {
				...state,
				status: 'active',
			};
		case 'newAnswer':
			const question = state.questions.at(state.index);
			return {
				...state,
				answer: action.payload,
				points:
					action.payload === question.correctOption
						? state.points + question.points
						: state.points,
			};
		case 'nextQuestion':
			return {
				...state,
				index: state.index + 1,
				answer: null,
			};

		default:
			throw new Error('Action unknown');
	}
}
export default function App() {
	const [{ questions, status, index, answer, points }, dispatch] = useReducer(
		reducer,
		initialState
	);

	// console.log(questions);

	const numQuestions = questions.length;
	const maxPossiblePoints = questions.reduce(
		(prev, curr) => prev + curr.points,
		0
	);

	useEffect(function () {
		fetch('http://localhost:8000/questions')
			.then((res) => res.json())
			.then((data) => {
				// console.log('DATA: ', data[index]);
				dispatch({ type: 'dataReceived', payload: data });
			})
			.catch((err) => dispatch({ type: 'dataFailed' }));
	}, []);
	return (
		<div className='app'>
			<Header />

			<Main>
				{status === 'loading' && <Loader />}
				{status === 'error' && <Error />}
				{status === 'ready' && (
					<StartScreen numQuestions={numQuestions} dispatch={dispatch} />
				)}

				{status === 'active' && (
					<>
						<Progress
							index={index}
							numQuestions={numQuestions}
							points={points}
							maxPossiblePoints={maxPossiblePoints}
							answer={answer}
						/>

						<Question
							question={questions[index]}
							// index={index}
							dispatch={dispatch}
							answer={answer}
						/>
						<NextButton dispatch={dispatch} answer={answer} />
					</>
				)}
			</Main>
		</div>
	);
}
