//task #1
var count = rememberCount();
count();
count();
count();
count();
console.log(count());

//task #2
var pass = comparePassword("10");
pass("11");
pass("11");
pass("11");
pass("11");
pass("11");
pass("11");
pass("11");

//task #3
console.log(multiA(2)(3));
var multi3 = multiA(3);
var multi4 = multiA(4);

console.log(multi3(2));
console.log(multi4(5));

//task #4
var counter = rememberCountAnalog();
counter.count();
counter.count();
console.log(counter.count());

//task #5
var food = function (food) {
  if (food === 'cookies') {
    console.log('More please :)');
  } else {
    console.log('Some food please :)');
  }
};

food('cookies');

//task #6
var form = {
  name: {
    value: 'John',
    validationRules: {
      minLength: 3,
      maxLength: 20,
      required: true,
    },
    errorMessage: '',
  },
  email: {
    value: 'email@example.com',
    validationRules: {
      email: true,
      required: true,
    },
    errorMessage: '',
  }
};

console.log(validation(form));

function rememberCount() {
  var counter = 0;
  return function add() {
    return ++counter;
  }
}

function comparePassword(password) {
  var counter = 0;
  return function tryPassword(str) {
    if (str === password) {
      counter = 0;
      return true;
    } else {
      counter++;
      if (counter > 5) {
        console.log('Вы уже ' + counter + ' раз пытаетесь угадать пароль, может хватит?');
      }
      return false;
    }
  }
}

function multiA(a) {
  return function (b) {
    return a * b;
  }
}

function rememberCountAnalog() {
  var counter = 0;
  return {
    count: function() {
      return counter++;
    }
  }
}

function checkRequired(obj) {
  for (var key in obj) {
    if (!obj[key].value && obj[key].validationRules.required) {
      obj[key].errorMessage = 'Field is required\n';
      console.log(obj[key].errorMessage);
      return false;
    }
  }
  return true;
}

function checkMaxMinLength(obj) {
  if (obj.name.value.length < obj.name.validationRules.minLength || obj.name.value.length > obj.name.validationRules.maxLength) {
    obj.name.errorMessage = 'Enter name between ' + obj.name.validationRules.minLength + ' and ' + obj.name.validationRules.maxLength;
    console.log(obj.name.errorMessage);
    return false;
  } else return true;
}

function checkEmail(obj) {
  var value = obj.email.value;
  var valid = true;
  var errorMsg = obj.email.errorMessage;

  if (obj.email.validationRules.required && obj.email.validationRules.email && !value) {
    valid = false;
    errorMsg = 'Field is required';
  } else if (value.indexOf('@') === -1) {
    errorMsg = 'Your email got to have "@"';
    valid = false;
  } else {
    var parts = value.split('@');
    var domain = parts[1];
    if (domain.indexOf('.') === -1) {
      errorMsg = 'Your email got to have "."';
      valid = false;
    } else {
      var domainParts = domain.split('.');
      var ext = domainParts[1];
      if (ext.length > 4 || ext.length < 2) {
        errorMsg = 'your domain name got to be between 2 and 4';
        valid = false;
      }
    }
  }
  return valid;
}

function validation(obj) {
  return checkRequired(obj) && checkMaxMinLength(obj) && checkEmail(obj);
}