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
    } else if (par === '('){
      input.value += '('
    } else if (par === ')'){
      input.value += ')'
    } else if (par === '.'){
      input.value += '.'
    } else if (par === '%'){
      input.value += '%'
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

function factorial(n) {
  return (n != 1) ? n * factorial(n - 1) : 1;
}

function fact() {
  output.innerHTML = factorial(+eval(input.value));
}

function numPi(){
  input.value += Math.PI.toFixed(8)
} 
function numE(){
  input.value += Math.E.toFixed(8)
}

function lg() {
  let res = Math.log10(eval(input.value));
    if(isNaN(res)) {
       output.innerHTML = 'Error';
      } else {
       output.innerHTML = res;
        input.value = '';
      }
}

function sin() {
  let res = Math.sin(eval(input.value));
    if(isNaN(res)) {
       output.innerHTML = 'Error';
      } else {
       output.innerHTML = res;
        input.value = '';
      }
}

function cos() {
  let res = Math.cos(eval(input.value));
    if(isNaN(res)) {
       output.innerHTML = 'Error';
      } else {
       output.innerHTML = res;
        input.value = '';
      }
}

function tan() {
  let res = Math.tan(eval(input.value));
    if(isNaN(res)) {
       output.innerHTML = 'Error';
      } else {
       output.innerHTML = res;
        input.value = '';
      }
}

// 

const more = document.querySelector('.more'),
      equations = document.querySelector('.equations');
let showed = false;

function show(){
  if(showed){
    equations.style.display = "none";
    showed = false;
  } else {
    equations.style.display = "flex";
    showed = true;
  }
}

const dInput = document.querySelector('#d'),
      dEqual = document.querySelector('.d-equal'),
      dOutput = document.querySelector('.d-output');

const pInput = document.querySelector('#p'),
      pEqual = document.querySelector('.p-equal'),
      pOutput = document.querySelector('.p-output');

dInput.addEventListener('mouseover', function(){
  dInput.placeholder = 'use space to separate'
})

dInput.addEventListener('mouseout', function(){
  dInput.placeholder = 'a = ?  b = ?  c = ?'
})

pInput.addEventListener('mouseover', function(){
  pInput.placeholder = 'use space to separate'
})

pInput.addEventListener('mouseout', function(){
  pInput.placeholder = 'a = ?  b = ?  c = ?'
})

dEqual.addEventListener('click', function(){
  let abc = dInput.value.split(" ");
   let a = abc[0], b = abc[1], c = abc[2];
   dInput.value = "";
    let D = (Math.pow(b, 2)) - 4*a*c;
     console.log(`D = ${D}`);
      if (D === 0){
        let x = -b + (Math.sqrt(D)) / 2*a;
         dOutput.innerHTML = x;
      } else if (D > 0){
        let x1 = -b + (Math.sqrt(D)) / 2*a;
         let x2 = -b - (Math.sqrt(D)) / 2*a;
        console.log(x1,x2);
        dOutput.innerText = `X1 = ${x1} X2 = ${x2}`;
      } else {
        dOutput.innerHTML = "No roots";
      }
});

pEqual.addEventListener('click', function(){
  let abc = pInput.value.split(" ");
   let a = abc[0], b = abc[1], c = abc[2];
    pInput.value = "";
   let Xv = -b / 2*a;
   console.log(Xv)
    let Yv = a*(Math.pow(Xv, 2)) + b*Xv + c;
     console.log(Yv)
    pOutput.innerHTML = `V = (${Xv} ; ${Yv})`;
})