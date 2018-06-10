import expensesReducer from './../../reducers/expenses';
import expenses from './../fixtures/expenses';

test('should set default state array to empty', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([])
})

test('should add expense to state', () => {
  const action = {
    type: 'ADD_EXPENSE',
    expense: {
      description: '1',
      note: '',
      amount: 0,
      createdAt: 0
    }
  };
  const result = action.expense;
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([
    ...expenses,
    result
  ]);
});

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expenses if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should edit expense', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[1].id,
    updates: {
      description: 'Car'
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state[1].description).toBe('Car');
});

test('should not edit expense if expense not found', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates: {
      description: 'Car'
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});