let equation = document.querySelector("#equation");
const input_box = document.querySelectorAll("input");
const exop_equation = document.querySelector("#exop-equation");
const button = document.querySelector("button");
const x_expo_input = document.querySelector(".x-expo");
const x_input = document.querySelector(".x-input");
const y_expo_input = document.querySelector(".y-expo");
const y_input = document.querySelector(".y-input");
const n_input = document.querySelector(".n-input");
let numArray = ["0", "1", "2", "3", "4", "5", "7", "8", "9"]; // first operation
for (let i = 0; i < input_box.length; i++) {
  //use this loop because if user put number, show alert message and  to check the input value isNumber
  let input = input_box[i];
  input.addEventListener("keyup", () => {
    numArray.forEach((num) => {
      if (input.id === "x" || input.id === "y") {
        // I want only x and y input so use if statement
        if (input.value === num) {
          // to check the input value isNumber
          alert("Enter only x sambol and y sambol");
        }
      }
    });
  });
}
const createEquation = () => {
  //second operation
  equation.innerHTML = "";
  if (
    x_input.value.length > 0 &&
    y_input.value.length > 0 &&
    n_input.value.length > 0
  ) {
    // to check the input value to user put
    let r_value = 1,
      n_value = 1,
      x_expo,
      x_expo_value,
      x,
      y_expo,
      y_expo_value,
      y,
      temp,
      flag = true,
      data;
    for (let i = 0; i < input_box.length; i++) {
      let input = input_box[i];
      switch (
        input.id // to get value from the input with id
      ) {
        case "x-expo":
          x_expo = input.value;
          break; // if I directly change from string to number with parseFloat, it can not call includes()
        case "x":
          x = input.value;
          break;
        case "y-expo":
          y_expo = input.value;
          break;
        case "y":
          y = input.value;
          break;
        case "n":
          n = parseFloat(input.value, 10);
          temp = n;
          break;
      }
    }
    let op_array = [];
    const create_op = (first_op, second_op) => {
      // I create this loop and function not to duplicate the statement(don't repeat yourself)
      for (let i = 0; i <= n; i++) {
        if (n % 2 === 0) {
          if (op_array.length === n) {
            op_array.push(first_op);
          } else {
            op_array[i] = first_op; //if n is odd, the operator is even
            op_array[i + 1] = second_op;
            i++;
          }
        } else {
          op_array[i] = first_op; //if n is odd do this
          op_array[i + 1] = second_op;
          i++;
        }
      }
    };
    // change minus value to plus value and check operator whether + and - or - and +
    let x_parse_value = parseFloat(x_expo, 10);
    let y_parse_value = parseFloat(y_expo, 10);
    console.log(x_parse_value, y_parse_value);
    for (let i = 0; i <= n; i++) {
      // I create this loop to collect operator in the array
      if (x_expo.includes("-") === true && y_expo.includes("-") !== true) {
        x_expo_value = x_parse_value * -1;
        y_expo_value = y_parse_value; // remove minus(-) from user input
        create_op("-", "+");
        console.log(x_expo_value, y_expo_value);
      } else if (
        x_expo.includes("-") !== true &&
        y_expo.includes("-") === true
      ) {
        x_expo_value = x_parse_value;
        y_expo_value = y_parse_value * -1;
        create_op("+", "-");
      } else if (
        x_expo.includes("-") === true &&
        y_expo.includes("-") === true
      ) {
        x_expo_value = x_parse_value * -1;
        y_expo_value = y_parse_value * -1;
        n % 2 === 0 ? create_op("+", "+") : create_op("-", "-"); // if n is even, all operators are +, or if n is odd, all operators are -
      } else if (
        x_expo.includes("-") !== true &&
        y_expo.includes("-") !== true
      ) {
        x_expo_value = x_parse_value;
        y_expo_value = y_parse_value;
        create_op("+", "+");
      }
    }
    showEquation(op_array); // after putting the operator in the array, call showEquation();
    function showEquation(opArray) {
      if (n === 0) {
        equation.innerHTML = "1";
      }
      if (x_parse_value === 0 && y_parse_value !== 0) {
        equation.innerHTML = `${Math.pow(y_parse_value, n)}${y}<sup>${n}<sup/>`;
      } else if (x_parse_value !== 0 && y_parse_value === 0) {
        equation.innerHTML = `${Math.pow(x_parse_value, n)}${x}<sup>${n}<sup/>`;
      } else if (x_parse_value === 0 && y_parse_value === 0) {
        equation.innerHTML += "0";
      } else {
        for (let i = 1; i <= n; i++) {
          if (flag) {
            // first expo and first ternary operator is to check + or - , second ternary operator is to check the number whether
            opArray[0] === "+"
              ? (equation.innerHTML +=
                  n === 1
                    ? `${x_expo_value}${x}`
                    : `${Number(x_expo_value ** n).toFixed(5)}${x}<sup>${n}<sup/>`)
              : (equation.innerHTML +=
                  n === 1
                    ? `${opArray[i - 1]}${x_expo_value}${x}`
                    : `${opArray[i - 1]}${Number(x_expo_value ** n).toFixed(5)}${x}<sup>${n}<sup/>`);
            flag = false;
            i = 0; // first i is 1 and second i is 2, but second i is need to be 1 so I change i to 0 and do i++, so i is 1
          } else {
            if (temp === 0) {
              break;
            }
            let n_decrease = temp--;
            n_value *= n_decrease; // (n=3), 3 * 2 * 1
            r_value *= i; // (r=5), 1 * 2 * 3
            data = n_value / r_value;
            if (data === 1) {
              // last
              if (n === 1) {
                equation.innerHTML += opArray[i]; // if n value is 1, show only y_expo_value and y
                equation.innerHTML += `${y_expo_value}${y}`;
              } else {
                equation.innerHTML += opArray[i];
                equation.innerHTML += `${Number(y_expo_value ** n).toFixed(5)}${y}<sup>${i}<sup/>`;
              }
            } else {
              // second
              let n_decrease_temp = --n_decrease; // this statement to create power expo
              let result =
                data *
                Math.pow(x_expo_value, n_decrease_temp) *
                Math.pow(y_expo_value, i); // 8xtupe + 3*4xsquare*3y + 3*2x*9ysquare + 27ytupe
              equation.innerHTML += opArray[i];
              equation.innerHTML += Number(result).toFixed(5);
              equation.innerHTML += `${x}<sup>${n_decrease_temp}<sup/>`;
              equation.innerHTML += `${y}<sup>${i}<sup/>`;
            }
          }
        }
      }
    }
    input_box.forEach((input) => {
      // to make empty input after get value
      input.value = "";
    });
  } else {
    x_expo_input.classList.add("error");
    x_input.classList.add("error");
    y_expo_input.classList.add("error");
    y_input.classList.add("error");
    n_input.classList.add("error");
    setTimeout(() => {
      x_expo_input.classList.remove("error");
      x_input.classList.remove("error");
      y_expo_input.classList.remove("error");
      y_input.classList.remove("error");
      n_input.classList.remove("error");
    }, 1000);
  }
};
button.addEventListener("click", createEquation); //get value and to listen event input
