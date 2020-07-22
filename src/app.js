import Passwordly from '../lib/passwordly.js';

window.addEventListener('DOMContentLoaded', (event) => {

  const settings = {};
  let passwordType = 'string';
  const outputField = document.querySelector("#output");
  const btnGenerate = document.querySelector("#btn-generate");
  const radiobuttons = document.querySelectorAll('input[type=radio');
  const checkboxes = document.querySelectorAll('input[type=checkbox]');
  const inputFields = document.querySelectorAll('.options-panel--footer input[type=text]');

  radiobuttons.forEach((item) => {
    item.addEventListener('click', (evt) => {
      passwordType = item.value;
    });
  });

  checkboxes.forEach((item) => {
    settings[item.name] = item.checked ? true : false;
    item.addEventListener('change', (evt) => {
      settings[item.name] = item.checked ? true : false;
    });
  });

  inputFields.forEach((item) => {
    if (item.name === 'delimiter') {
      settings[item.name] = item.value;
    } else {
      settings[item.name] = parseInt(item.value);
    }

    item.addEventListener('change', (evt) => {
      if (item.name === 'delimiter') {
        settings[item.name] = item.value;
      } else {
        settings[item.name] = parseInt(item.value);
      }
    });
  });

  btnGenerate.addEventListener('click', (evt) => {
    evt.preventDefault();
    outputField.value = Passwordly(passwordType, settings);
  });

  outputField.value = Passwordly(passwordType, settings);

});