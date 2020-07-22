import Passwordly from '../lib/passwordly';

window.addEventListener('DOMContentLoaded', () => {
  const settings = {};
  let passwordType = 'string';
  const outputField = document.querySelector('#output');
  const btnGenerate = document.querySelector('#btn-generate');
  const radiobuttons = document.querySelectorAll('input[type=radio');
  const checkboxes = document.querySelectorAll('input[type=checkbox]');
  const inputFields = document.querySelectorAll('.options-panel--footer input[type=text]');

  radiobuttons.forEach((item) => {
    item.addEventListener('click', () => {
      passwordType = item.value;
    });
  });

  checkboxes.forEach((item) => {
    settings[item.name] = !!item.checked;
    item.addEventListener('change', () => {
      settings[item.name] = !!item.checked;
    });
  });

  inputFields.forEach((item) => {
    if (item.name === 'delimiter') {
      settings[item.name] = item.value;
    } else {
      settings[item.name] = parseInt(item.value, 10);
    }

    item.addEventListener('change', () => {
      if (item.name === 'delimiter') {
        settings[item.name] = item.value;
      } else {
        settings[item.name] = parseInt(item.value, 10);
      }
    });
  });

  btnGenerate.addEventListener('click', (evt) => {
    evt.preventDefault();
    outputField.value = Passwordly(passwordType, settings);
  });

  outputField.value = Passwordly(passwordType, settings);
});
