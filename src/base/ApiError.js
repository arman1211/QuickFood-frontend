class ApiError extends Error {
  constructor(message, status) {
    console.log(message.message, "hhhhhhh");
    super(message);
    this.message = message.message;
    this.name = "ApiError";
    this.status = status;
  }
}

export default ApiError;
