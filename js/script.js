function calculateExpenseBalance(income, food, rent, cloths){
  let totalExpenses =parseInt(food)+parseInt(rent)+parseInt(cloths);
  let balance =  income - totalExpenses ;
  
  console.log('function is triggereed');
  console.log(totalExpenses);
  return [totalExpenses, balance];
}

function calculateSavings(percentSave, balance){
  console.log(parseFloat(percentSave));
  console.log(parseFloat(balance));
  let savingsAmount = parseFloat(percentSave) *  parseFloat(balance) / 100;
  let remainingBalance = balance - savingsAmount;
  console.log('Savings'. savingsAmount);
  console.log('<br>remainngBalance'. remainingBalance);
  return [savingsAmount, remainingBalance];
}


function getValue(id, type){
  if (type == 'text')
  {
    console.log (document.getElementById(id).innerText);
    return parseInt(document.getElementById(id).innerText); 
  } else {
    console.log (document.getElementById(id).value);
    return document.getElementById(id).value; 
  }

}

function setValue(id, value){
  document.getElementById(id).innerHTML = value;
}

document.getElementById('calculate').addEventListener('click', function () {
  const income = getValue('income');
  const food = getValue('food');
  const rent = getValue('rent');
  const cloths = getValue('cloths');
  let [totalExpenses, balance] = calculateExpenseBalance(income, food, rent, cloths);
  setValue('total-expense', totalExpenses);
  setValue('balance', balance);
});

document.getElementById('save').addEventListener('click', function () {
const percentSave = getValue('percent-save');
const balance = getValue('balance', 'text');
[savingsAmount, remainingBalance] = calculateSavings(percentSave, balance);
setValue('saving-amount', savingsAmount);
setValue('remaining-balance', remainingBalance);
});