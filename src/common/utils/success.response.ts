export default class SuccessResponse {
  success!: boolean;

  static fromSuccess(success: boolean): SuccessResponse {
    const response = new SuccessResponse();
    response.success = success;
    return response;
  }
}
