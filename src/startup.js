function InstabugException(message) {
  this.message = message;
  this.name = 'InstabugException';
}

if (typeof window === 'undefined') {
  throw new InstabugException('instabug websdk still not support nodejs enviroment');
}
