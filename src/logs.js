const errors = [];
const consoleLog = [];
const userData = [];
const oldLog = window.console.log;


/**
 * parseLogObj - formatting logs array and converting it to one string
 *
 * @param  {type} logArr array of logs items
 * @return {string} returns the passed logs array after formatting
 */
function parseLogObj(logArr) {
  let output = '';
  for (let i = 0; i < logArr.length; i += 1) {
    output += logArr[i].timestamp.toString();
    output += `${logArr[i].message}`;
    output += '\n';
  }
  return output;
}

function getAllLogs() {
  return {
    errors,
    consoleLog,
    userData,
  };
}

function getErrors() {
  return errors;
}

function getConsoleLog() {
  return consoleLog;
}

function getUserData() {
  return parseLogObj(userData);
}

window.console.log = (...args) => {
  consoleLog.push({
    message: args.toString(),
    timestamp: Date.now(),
  });
  oldLog.apply(console, args);
};

window.onerror = (error, url, line) => {
  errors.push({
    message: {
      error,
      url,
      line,
    },
    timestamp: Date.now(),
  });

  consoleLog.push({
    message: `Error: ${error} @  ${url} : ${line}`,
    timestamp: Date.now(),
  });
};

module.exports = {
  getAllLogs,
  getErrors,
  getConsoleLog,
  getUserData,
  parseLogObj,
};
