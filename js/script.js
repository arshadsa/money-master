// Clear all expenses balance and savings.
function clearExpensesBalanceSavings(){
  document.getElementById('total-expense').innerHTML = '';
  document.getElementById('balance').innerHTML = '';
  document.getElementById('saving-amount').innerHTML = '';
  document.getElementById('remaining-balance').innerHTML = '';
}

// Clear Expense input fileds

function clearFields(){
  document.getElementById('income').value = '';
  document.getElementById('food').value = '';
  document.getElementById('rent').value = '';
  document.getElementById('cloths').value = '';
}

// Clear warnings before executing any code.
function clearWarnings(){
  document.getElementById('over-expense').classList.add('d-none');
  document.getElementById('negative-input').classList.add('d-none');
  document.getElementById('error-save').classList.add('d-none');
}

// Expense and Balance calculation.
function calculateExpenseBalance(income, food, rent, cloths){
  let totalExpenses =parseFloat(food)+parseFloat(rent)+parseFloat(cloths);
  let balance =  income - totalExpenses ;
  return [totalExpenses, balance];
}

// Savings calculation.
function calculateSavings(percentSave, income, balance){
  let savingsAmount = parseFloat(percentSave) *  parseFloat(income) / 100;
  let remainingBalance = balance - savingsAmount;
  return [savingsAmount, remainingBalance];
}

// Get value from an element either input field or text DOM.
function getValue(id, type){
  if (type == 'text')
  {
    return parseFloat(document.getElementById(id).innerText); 
  } else {
    return parseFloat(document.getElementById(id).value); 
  }

}

// Set value in any DOM.
function setValue(id, value){
  document.getElementById(id).innerHTML = value;
}

// Event listener for calculate button.
document.getElementById('calculate').addEventListener('click', function () {

  // Clear all warnings first.
  clearWarnings();

  // Get income and expense values.
  const income = getValue('income');
  const food = getValue('food');
  const rent = getValue('rent');
  const cloths = getValue('cloths');

  // Check if values are are okay to be used
  if(    
    typeof(income)=="number" && income>=0
    &&
    typeof(food)== "number" && food>=0
    &&
    typeof(rent)== "number" && rent>=0
    &&
    typeof(cloths)== "number" && cloths>=0  
    )
  {
    let [totalExpenses, balance] = calculateExpenseBalance(income, food, rent, cloths);
    // Check if total expenses is positive and specially balance is positive. That means expenses is not over income and income is also not negative.

    if(totalExpenses >= 0 && balance >= 0 )
    {
      setValue('total-expense', totalExpenses);
      setValue('balance', balance);
    }
    else
    {
      // If test fails then it's over expense than income.
      document.getElementById('over-expense').classList.remove('d-none');
      // Clear all expense, balance and savings fields.
      clearExpensesBalanceSavings();      
    }
  } 
  else
  {
    // Some of the items have negative input. Check failed at the if statement.
    document.getElementById('negative-input').classList.remove('d-none');
    clearExpensesBalanceSavings();
  }  
});

// Event listenner for save button.
document.getElementById('save').addEventListener('click', function () {
  // Clear savings error first.
  document.getElementById('error-save').classList.add('d-none');
const percentSave = getValue('percent-save');
const balance = getValue('balance', 'text');
const income = getValue('income');
[savingsAmount, remainingBalance] = calculateSavings(percentSave,income, balance);

// Now check if the savings amount and remaining balance is zero or positive.

if(savingsAmount >=0 && remainingBalance >= 0)
{
  setValue('saving-amount', savingsAmount);
  setValue('remaining-balance', remainingBalance);
}
else {
  // There is some error in the fileds. It can be negative savings input.
  document.getElementById('error-save').classList.remove('d-none');
  document.getElementById('saving-amount').innerHTML = '';
  document.getElementById('remaining-balance').innerHTML = '';
}
});