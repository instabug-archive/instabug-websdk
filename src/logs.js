const errors = [];
const consoleLog = [];
const userData = [];
const oldLog = window.console.log;

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

function parseLogObj(logArr) {
  let output = '';
  for (let i = 0; i < logArr.length; i += 1) {
    output += logArr[i].timestamp.toString();
    output += `${logArr[i].message}`;
    output += '\n';
  }
  return output;
}

function setUserData(message) {
  userData.push({
    message,
    timestamp: Date.now(),
  });
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

module.exports = {
  setUserData,
  getAllLogs,
  getErrors,
  getConsoleLog,
  getUserData,
  parseLogObj,
};
