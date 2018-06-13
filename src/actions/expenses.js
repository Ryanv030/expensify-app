import database from './../firebase/firebase';

export const addExpense = (expense)  => ({
    type: 'ADD_EXPENSE',
    expense
  });
  
export const removeExpense = ({id = ''} = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
})

export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;
    const expense = { description, note, amount, createdAt };
    return database.ref('expenses').push(expense).then((ref) => {
      console.log(ref)
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }))
    })
  };
};

// SET_EXPENSES

export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

export const startSetExpenses = () => {
  return (dispatch) => {
    return database.ref('expenses').once('value').then((snapshot) => {
      const expenses = [];
      
      snapshot.forEach((childSnapshot) => {
        expenses.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      dispatch(setExpenses(expenses));
    });
  }
}


  
  //===================================================================================================================================
  
  
  //OPTION 1
  //component calls action generator
  // action generator returns object
  // component dispatches object
  // redux store changes 
  
  //OPTION 2
  //component calls action generator
  // action generator returns function
  // component dispatches function (?)
  // redux store changes (has the ability to dispatch other actions and do whatever it wants)
