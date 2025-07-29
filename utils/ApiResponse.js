
class ApiResponse {
  constructor({ code, message, payload = undefined }) {
    this.status = code < 400 ? "success" : "error";
    this.code = code;
    this.message = message;
    if (payload !== undefined) {
      this.payload = payload;
    }
  }
}

module.exports = ApiResponse;