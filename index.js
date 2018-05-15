$(document).ready(function() {
  var input = $("#input").html();

  //boolean to check if you can input an operator
  var operatorAsInput = false;

  //boolean to check if the button doesn't create an error, if no then display it
  var isDisplayed = false;
  var lastChar;

  //Handle calculation and rounding

  function calculate(str) {
    str = str.replace(/\+/g, ",+,");
    str = str.replace(/\-/g, ",-,");
    str = str.replace(/\*/g, ",*,");
    str = str.replace(/÷/g, ",÷,");
    var arrayResult = str.split(",");
    if (arrayResult[arrayResult.length - 1] == '') arrayResult.splice(-1, 1);
    console.log(arrayResult);

    var result = parseFloat(arrayResult[0]);
    for (let i = 1; i < arrayResult.length; i += 2) {
      if (arrayResult[i] == "+") result += parseFloat(arrayResult[i + 1]);
      if (arrayResult[i] == "-") result -= parseFloat(arrayResult[i + 1]);
      if (arrayResult[i] == "*") result *= parseFloat(arrayResult[i + 1]);
      if (arrayResult[i] == "÷") result /= parseFloat(arrayResult[i + 1]);
    }
    if (result % 1 === 0) return result;
    return result.toFixed(8);
  }

  //Button click animation

  $(".button").click(function() {
    $(this)
      .addClass("moved")
      .delay(500)
      .queue(function(next) {
        $(this).removeClass("moved");
        next();
      });
  });

  //Handle logic to prevent syntax error

  $(".isDisplayed").click(function() {
    if ($(this).hasClass("number")) {
      isDisplayed = true;
      operatorAsInput = true;
    }

    if ($(this).hasClass("operator") && operatorAsInput === false) {
      isDisplayed = false;
      operatorAsInput = false;
    }
    if ($(this).hasClass("operator") && operatorAsInput === true) {
      isDisplayed = true;
      operatorAsInput = false;
    }

    if (isDisplayed === true) {
      input += $(this).text();
      $("#input").html(input);
    }
  });

  //Delete and process lastChar

  $(".clear").click(function() {
    input = input.substring(0, input.length - 1);
    $("#input").html(input);
    if (typeof lastChar == "number") {
      operatorAsInput = true;
    } else {
      operatorAsInput = false;
    }
  });

  //Show the result when the = button is clicked

  $(".equals").click(function() {
    lastChar = parseInt(input[input.length - 1])
    if (typeof lastChar == "number" && !isNaN(lastChar)) {
      console.log(lastChar);

      $('#answer').html(calculate(input));

    }
  });

  //Reset to the initial state

  $(".AC").click(function() {
    $("#input").empty();
    input = '';
    $("#answer").text(0);
  });
});
