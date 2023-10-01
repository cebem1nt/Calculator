let input = document.querySelector('input'),
    output = document.querySelector('.output');
const buttons = document.querySelector('.buttons');

input.addEventListener('keydown', (event) => {
    const numericKeyCodes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 8,];
 
  if (!numericKeyCodes.includes(event.keyCode)) {
   event.preventDefault();
 } else {
  output.innerHTML = 0;
 }
});

let power = '';

buttons.addEventListener('click', (event) => {
  let par = event.target.innerText;

  if (par == 'AC'){
    input.value = '';
    output.innerHTML = '0';
    power = '';
  }

    if (par === '-') {
      input.value += '-'
    } else  if (par === '+') {
      input.value += '+'
    } else  if (par === '÷') {
      input.value += '/'
    } else  if (par === '×') {
      input.value += '*'
    }

  if (par == '^'){
    power = input.value;
     input.value += '^';
  } 

});


function ln() {
   let res = Math.log(eval(input.value));
     if(isNaN(res)) {
        output.innerHTML = 'Error';
       } else {
        output.innerHTML = res;
         input.value = '';
       }
}

function root() {
   let res = Math.sqrt(eval(input.value));
    if (isNaN(res)) {
     output.innerHTML = 'Error';
    } else {
       output.innerHTML = res;
         input.value = '';
      }
}

function equal(){

    let exp = input.value;
       if(exp.includes('^')) {

         let td = exp.split('^');
          let num = eval(power);
           let pow = +td[1];
            output.innerHTML = Math.pow(num, pow);
             power = '';
              input.value = '';

      } else if (exp) {
        output.innerHTML = eval(exp);
         input.value = '';
       }
}
     

