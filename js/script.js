function clearExpensesBalanceSavings(){
  document.getElementById('total-expense').innerHTML = '';
  document.getElementById('balance').innerHTML = '';
  document.getElementById('saving-amount').innerHTML = '';
  document.getElementById('remaining-balance').innerHTML = '';
}

function clearFields(){
  document.getElementById('income').value = '';
  document.getElementById('food').value = '';
  document.getElementById('rent').value = '';
  document.getElementById('cloths').value = '';
}

function clearWarnings(){
  document.getElementById('over-expense').classList.add('d-none');
  document.getElementById('negative-input').classList.add('d-none');
  document.getElementById('error-save').classList.add('d-none');
}

function calculateExpenseBalance(income, food, rent, cloths){
  let totalExpenses =parseInt(food)+parseInt(rent)+parseInt(cloths);
  let balance =  income - totalExpenses ;
  return [totalExpenses, balance];
}

function calculateSavings(percentSave, balance){
  let savingsAmount = parseFloat(percentSave) *  parseFloat(balance) / 100;
  let remainingBalance = balance - savingsAmount;
  return [savingsAmount, remainingBalance];
}


function getValue(id, type){
  if (type == 'text')
  {
    return parseInt(document.getElementById(id).innerText); 
  } else {
    return document.getElementById(id).value; 
  }

}

function setValue(id, value){
  document.getElementById(id).innerHTML = value;
}

document.getElementById('calculate').addEventListener('click', function () {

  clearWarnings();

  const income = getValue('income');
  const food = getValue('food');
  const rent = getValue('rent');
  const cloths = getValue('cloths');

  if(income<0 || food < 0 || rent < 0 || cloths <0)
  {
    document.getElementById('negative-input').classList.remove('d-none');
    clearExpensesBalanceSavings();
  } 
  else 
  {
    let [totalExpenses, balance] = calculateExpenseBalance(income, food, rent, cloths);
    if(totalExpenses >= 0 && balance >= 0 )
    {
      setValue('total-expense', totalExpenses);
      setValue('balance', balance);
    }
    else
    {
      document.getElementById('over-expense').classList.remove('d-none');
      clearExpensesBalanceSavings();      
      // clearFields();
    }
  }
});

document.getElementById('save').addEventListener('click', function () {
  document.getElementById('error-save').classList.add('d-none');
const percentSave = getValue('percent-save');
const balance = getValue('balance', 'text');
[savingsAmount, remainingBalance] = calculateSavings(percentSave, balance);

if(savingsAmount >=0 && remainingBalance >= 0)
{
  setValue('saving-amount', savingsAmount);
  setValue('remaining-balance', remainingBalance);
}
else {
  document.getElementById('error-save').classList.remove('d-none');
  document.getElementById('saving-amount').innerHTML = '';
  document.getElementById('remaining-balance').innerHTML = '';
}

});