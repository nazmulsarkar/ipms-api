export class MutationResponseDTO<T> {
  data: T;
  success: boolean;
  validationResult?: any = null;
  message?: any = null;
  messageCode?: any = null;
}
