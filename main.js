const more = document.querySelector('.more'),
      equations = document.querySelector('.equations');
let showed = false;

function show(){
  if(showed){
    more.innerHTML = '>';
    equations.style.display = "none"; 
    showed = false;
  } else {
    more.innerHTML = '<';
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

class Calculator {
    constructor (input, output, process) {
      this.inp = input
      this.out = output
      this.process = process
      this.prevNum = null // n1 + n2; tracks n1
      this.methodCall = null // traks operation: * , / , + , - , etc
      this.ans = 0
    }

    addToCall(method){
      if (this.inp.value.length == 0){
        return
      } 
      
      if (this.methodCall == null && this.methods[method].length == 2){
        this.prevNum = Number(this.inp.value)
        this.methodCall = method
        this.clearInput()
        return
      }

      else if (this.methodCall != null && this.methods[method].length == 2){
        this.calculateAndKeep()
        this.methodCall = method
        return
      }

      else if (this.methodCall == null && this.methods[method].length == 1){
        this.calculateOneNum(method)
        return
      }

      else if (this.methodCall != null && this.methods[method].length == 1){
        this.calculateInInput(method)
        return
      }
    }

    calculateOneNum(method) { 
      // calculates any operation with only one number outside
      // of long operations for example !4 ; sin(21); etc.
      const y = this.methods[method](Number(this.inp.value))
      this.setResult(y)
      this.clearInput()
      return
    }

    calculateAndKeep() {
      // calculates any operation with two numbers and
      // sets the result as a previous number. used in case of:
      // triple operations : 1 + 2 - n ; will calculaate 1 + 2 firstly
      // and then will calculate 3 - n
      const res = this.methods[this.methodCall](this.prevNum, Number(this.inp.value))
      this.setResult(res)
      this.prevNum = res
      this.clearInput()
      this.clearOutput()
      this.setProcess()
      return
    }

    calculateInInput(method) {
      // calculates any operation with one number inside of 
      // long operations and sets result in input :
      // 3 + !4 ; will calculate !4 firstly
      const y = this.methods[method](Number(this.inp.value))
      this.setInput(y)
      return
    }

    calculate() {
      // calculates any operation with two numbers
      // previous number and current input number
      if (this.methodCall === null || this.prevNum == null){
        this.setResult(this.inp.value)
        this.clearAll()
        return
      }

      const res = this.methods[this.methodCall](this.prevNum, Number(this.inp.value))
      this.setResult(res)
      this.ans = typeof res === 'number' ? res : 0
      this.clearAll()
      return
    }

    setProcess() {
      if (typeof this.prevNum == 'number'){

        if (this.methodCall && this.methods[this.methodCall].length == 2) {
          this.process.innerHTML = `${this.prevNum} ${this.methodsSymb[this.methodCall]} ${this.inp.value}`
        } 

      } else {
        this.process.innerHTML = this.inp.value
      }
    }

    setResult(x) {
      this.out.innerHTML = x 
      this.ans = typeof x === 'number' ? x : 0
    }

    setInput(x) {
      this.inp.value = Number(x)
    }

    methods = {
      add : (a, b) => {return a + b},
      sub : (a, b) => {return a - b},
      div : (a, b) => {return a / b},
      mul : (a, b) => {return a * b},
      pow : (a, b) => {return a ** b},
      mod : (a,b) => {return a % b},
      sin : (a) => { return Math.sin(a) },
      cos : (a) => { return Math.cos(a) },
      ln : (a) => { return Math.log(a) },
      lg : (a) => { return Math.log10(a) },
      sqrt: (a) => {return Math.sqrt(a) },
      fact : (a) => { if (a> 170) { return 'Keep it real' }
            a = Math.floor(a)
            if (a === 0) {
                return 1;
              } return a * this.methods['fact'](a - 1)
      },
    }

    methodsSymb = {
      add : '+',
      sub : '-',
      div : '/',
      mul : '*',
      pow : '^',
      mod : '%'
    }

    addPI(){ this.inp.value =  String( Math.PI.toFixed(5))}

    addE(){ this.inp.value =  String( Math.E.toFixed(5))}

    negPos(){ this.inp.value = -this.inp.value}

    getAns(){ this.inp.value = this.ans; this.clearOutput()}

    addDot(){ this.inp.value += '.0'}

    ac(){
      this.clearAll()
      this.out.innerText = '0'
    }

    clearAll(){
      this.inp.value = ''
      this.methodCall = null
      this.prevNum = null
      this.process.innerHTML = ''
    }

    clearInput(){
      this.inp.value = ''
    }

    clearProcess(){
      this.process.innerHTML = ''
    }

    clearOutput(){
      this.out.innerHTML = ''
    }
}

const calculator = new Calculator (document.querySelector('#input'), document.querySelector('#output'), document.querySelector('#process'))

const buttons = document.querySelector('.buttons')
buttons.addEventListener('click', ()=>{
  calculator.setProcess()
})
