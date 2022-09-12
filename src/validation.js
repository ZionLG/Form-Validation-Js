const validation = (() => {
  const _email = document.getElementById("user-email");
  const _country = document.getElementById("user-country");
  const _zip = document.getElementById("user-zip");
  const _password = document.getElementById("user-pass");
  const _passConfirm = document.getElementById("user-pass-conf");
  const _btn = document.getElementById("submit-user-form");
  const fields = { _email, _country, _zip, _password, _passConfirm };

  const _isValid = (field) => {
    return (
      (field.validity.valid && field != _passConfirm) ||
      (field == _passConfirm &&
        field.value === _password.value &&
        _password.value != "")
    );
  };

  const _addEvents = () => {
    for (const field of Object.values(fields)) {
      field.addEventListener("focusout", (e) => {
        if (_isValid(field)) {
          field.nextElementSibling.textContent = "";
          field.nextElementSibling.className = "error";
        } else {
          _showError(field);
        }
      });
    }

    _btn.addEventListener("click", (e) => {
      for (const field of Object.values(fields)) {
        if (!_isValid(field)) {
          _showError(field);
        }
      }
      e.preventDefault();
    });
  };
  const _showError = (field) => {
    let errorMessage = "";

    switch (field) {
      case _email:
        if (field.validity.valueMissing) {
          errorMessage = "You need to enter an e-mail address.";
        } else if (field.validity.typeMismatch) {
          errorMessage = "Entered value needs to be an e-mail address.";
        }
        break;

      case _country:
        errorMessage = "You need to enter a country.";
        break;

      case _zip:
        errorMessage = "You need to enter a zip code.";
        break;

      case _password:
        errorMessage = "You need to enter a password.";
        break;

      case _passConfirm:
        if (field.validity.valueMissing) {
          errorMessage = "You need to enter your chosen password";
        } else {
          errorMessage = "Passwords missmatch.";
        }
        break;

      default:
        if (field.validity.valueMissing) {
          errorMessage = "You need to enter an value.";
        } else if (field.validity.typeMismatch) {
          errorMessage = "Invalid value.";
        }
        break;
    }

    field.nextElementSibling.textContent = errorMessage;
    field.nextElementSibling.className = "error active";
  };

  _addEvents();
})();

export { validation };
