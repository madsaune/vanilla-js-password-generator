const generateKeyspace = (settings) => {
  const keyspace = [];

  if (settings.uppercase) {
    keyspace.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  }

  if (settings.lowercase) {
    keyspace.push('abcdefghijklmnopqrstuvwxyz');
  }

  if (settings.digits) {
    keyspace.push('0123456789');
  }

  if (settings.symbols) {
    keyspace.push('@!-*#%');
  }

  return keyspace.join('').split('').sort(() => Math.random() - 0.5).join('');
};

const isValid = (settings, str) => {
  if (settings.uppercase && !str.match(/[A-Z]/)) {
    return false;
  }

  if (settings.lowercase && !str.match(/[a-z]/)) {
    return false;
  }

  if (settings.digits && !str.match(/[0-9]/)) {
    return false;
  }

  if (settings.symbols && !str.match(/[@!-*#%]/)) {
    return false;
  }

  return true;
};

const generateStringPassword = (settings) => {
  const keyspace = generateKeyspace(settings);
  let password = [];

  do {
    password = [];

    for (let i = 0; i < settings.passwordLength; i += 1) {
      password.push(keyspace[Math.floor(Math.random() * (keyspace.length - 0)) + 0]);
    }
  } while (!isValid(settings, password.join('')));

  if (settings.prefix) {
    password.unshift(String(Math.floor(Math.random() * (9999 - 1111)) + 1111));
  }

  if (settings.suffix) {
    password.push((Math.floor(Math.random() * (9999 - 1111)) + 1111));
  }

  return password.join('');
};

const generateWordPassword = (settings) => {
  const password = [];

  for (let i = 0; i < settings.numberOfWords; i += 1) {
    const word = settings.wordlist[Math.floor(Math.random() * (settings.wordlist.length - 0)) + 0];
    password.push(word[0].toUpperCase() + word.slice(1));
  }

  if (settings.prefix) {
    password.unshift(String(Math.floor(Math.random() * (9999 - 1111)) + 1111));
  }

  if (settings.suffix) {
    password.push((Math.floor(Math.random() * (9999 - 1111)) + 1111));
  }

  return password.join(settings.delimiter);
};

export default (type, settings) => {
  const defaultSettings = {
    uppercase: false,
    lowercase: false,
    digits: false,
    symbols: false,
    prefix: false,
    suffix: false,
    passwordLength: 16,
    delimiter: '-',
    numberOfWords: 3,
    wordlist: [
      'design', 'range', 'trade',
      'discover', 'suspend', 'spiffy',
      'cool', 'unknown', 'feeble',
      'queen', 'arch', 'look',
      'letters', 'repeat', 'chicken',
      'guard', 'ticket', 'dramatic',
      'cart', 'tank', 'point',
      'chase', 'harsh', 'foamy',
      'suck',
    ],
  };

  if (typeof type === 'undefined') {
    throw new Error('You must specify a password type as first argument');
  }

  if (typeof settings === 'undefined') {
    Object.assign(defaultSettings, {
      uppercase: true,
      lowercase: true,
      digits: true,
      symbols: true,
    });
  } else if (Object.keys(settings).length === 0 && settings.constructor === Object) {
    Object.assign(defaultSettings, {
      uppercase: true,
      lowercase: true,
      digits: true,
      symbols: true,
    });
  } else {
    Object.assign(defaultSettings, settings);
  }

  if (type === 'string') {
    return generateStringPassword(defaultSettings);
  }

  return generateWordPassword(defaultSettings);
};
