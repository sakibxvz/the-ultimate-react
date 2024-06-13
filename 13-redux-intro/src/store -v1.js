import { combineReducers, createStore } from 'redux';

const initialStateAccount = {
	balance: 0,
	loan: 0,
	loanPurpose: '',
};

const initialStateCustomer = {
	fullName: '',
	nationalID: '',
	createdAt: '',
};

function accountReducer(state = initialStateAccount, action) {
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

function customerReducer(state = initialStateCustomer, action) {
	switch (action.type) {
		case 'customer/createCustomer':
			return {
				...state,
				fullName: action.payload.fullName,
				nationalID: action.payload.nationalID,
				createdAt: action.payload.createdAt,
			};

		case 'account/updateName':
			return {
				...state,
				fullName: action.payload.fullName,
			};
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	account: accountReducer,
	customer: customerReducer,
});
const store = createStore(rootReducer);

function desposit(ammount) {
	return { type: 'account/deposit', payload: ammount };
}
function withdraw(ammount) {
	return { type: 'account/withdraw', payload: ammount };
}
function requestLoan(ammount, purpose) {
	return {
		type: 'acount/requestLoan',
		payload: {
			ammount: ammount,
			purpose: purpose,
		},
	};
}
function payLoan() {
	return { type: 'account/payLoan' };
}

store.dispatch(desposit(500));
console.log(store.getState());
store.dispatch(withdraw(200));
console.log(store.getState());
store.dispatch(requestLoan(1000, 'Buy a new Car'));
console.log(store.getState());
store.dispatch(payLoan());
console.log(store.getState());

function createCustomer(fullName, nationalID) {
	return {
		type: 'customer/createCustomer',
		payload: {
			fullName,
			nationalID,
			createdAt: new Date().toISOString(),
		},
	};
}

function updateName(fullName) {
	return {
		type: 'account/updateName',
		payload: {
			fullName,
		},
	};
}

store.dispatch(createCustomer('AN Nazmus Sakib','#245879541'))
console.log(store.getState());
store.dispatch(updateName('An Nazmus Sakib'));
store.dispatch(desposit(1500))
console.log(store.getState());