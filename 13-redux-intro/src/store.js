import { createStore } from "redux";

const initialState = {
	balance: 0,
	loan: 0,
	loanPurpose: '',
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case 'acount/deposit':
			return { ...state, balance: state.balance + action.payload };

		case 'acount/withdraw':
			return { ...state, balance: state.balance - action.payload };

		case 'acount/requestLoan':
			if (state.loan > 0) return state;
			return { ...state, loan: action.payload.loanPurpose };

		case 'acount/payLoan':
			return {
				...state,
				loan: 0,
				loanPurpose: '',
				balance: state.balance - state.loan,
			};

		default:
			return state;
	}
}
