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
var food = function(food) {
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
    value: 'Superman',
    validationRules: {
      minLength: 3,
      maxLength: 20,
      required: true,
    },
    errorMessage: 'true',
  },
  email: {
    value: 'example@gmail.com',
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
  return function() {
    return ++counter;
  }
}

function comparePassword(password) {
  var counter = 0;
  return function(str) {
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
  return function(b) {
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

function validation(obj) {
  function checkRequired(key) {
    if (!key.value && key.validationRules.required) {
      key.errorMessage = 'Field is required\n';
      console.log(key.errorMessage);
      return false;
    }
    else {
      return true;
    }
  }

  function checkMaxMinLength(key) {
    if (!key.validationRules.minLength && !key.validationRules.maxLength) {
      return true;
    } else if (key.value.length > 0 && (key.value.length < key.validationRules.minLength || key.value.length > key.validationRules.maxLength)) {
      key.errorMessage = 'Fill the field between ' + key.validationRules.minLength + ' and ' + key.validationRules.maxLength;
      console.log(key.errorMessage);
      return false;
    } else {
      return true;
    }
  }


  function checkEmail(email) {
    var value = email.value;
    var valid = true;
    var errorMsg = email.errorMessage;

    if (email.validationRules.required || (!email.validationRules.required && email.value.length > 0)) {
      if (email.validationRules.email && !value) {
        valid = false;
      } else if (value.indexOf('@') === -1) {
        errorMsg = 'Your email got to have "@"';
        console.log(errorMsg);
        valid = false;
      } else {
        var parts = value.split('@');
        var domain = parts[1];
        if (domain.indexOf('.') === -1) {
          errorMsg = 'Your email got to have "."';
          console.log(errorMsg);
          valid = false;
        } else {
          var domainParts = domain.split('.');
          var ext = domainParts[1];
          if (ext.length > 4 || ext.length < 2) {
            errorMsg = 'your domain name got to be between 2 and 4';
            console.log(errorMsg);
            valid = false;
          }
        }
      }
    }
    return valid;
  }


  for (var key in obj) {
    if (!checkRequired(obj[key]) || !checkMaxMinLength(obj[key])) {
      return false;
    }
  }

  if (!checkEmail(obj.email)) {
    return false;
  }
  return true;
}