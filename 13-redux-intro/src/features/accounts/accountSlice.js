const initialStateAccount = {
	balance: 0,
	loan: 0,
	loanPurpose: '',
};

// Reducer

export default function accountReducer(state = initialStateAccount, action) {
	switch (action.type) {
		case 'account/deposit':
			return { ...state, balance: state.balance + action.payload };

		case 'account/withdraw':
			return { ...state, balance: state.balance - action.payload };

		case 'acount/requestLoan':
			if (state.loan > 0) return state;
			//LATER
			return {
				...state,
				loan: action.payload.ammount,
				loanPurpose: action.payload.purpose,
				balance: state.balance + action.payload.ammount,
			};

		case 'account/payLoan':
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

//ACTION Creater

export function desposit(ammount) {
	return { type: 'account/deposit', payload: ammount };
}
export function withdraw(ammount) {
	return { type: 'account/withdraw', payload: ammount };
}
export function requestLoan(ammount, purpose) {
	return {
		type: 'acount/requestLoan',
		payload: {
			ammount: ammount,
			purpose: purpose,
		},
	};
}
export function payLoan() {
	return { type: 'account/payLoan' };
}