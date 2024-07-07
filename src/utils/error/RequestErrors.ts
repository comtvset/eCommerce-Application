interface CommercetoolsErrorDetail {
  code: string;
  message: string;
}

interface CommercetoolsErrorResponse {
  statusCode: number;
  message: string;
  errors: CommercetoolsErrorDetail[];
}

export const ErrorType = ['Invalid', 'Error'];
export const WarningType = ['Warning', 'Attention'];

const isCommercetoolsError = (error: unknown): error is { body: CommercetoolsErrorResponse } => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'body' in error &&
    typeof (error as { body: unknown }).body === 'object' &&
    (error as { body: unknown }).body !== null &&
    'errors' in (error as { body: CommercetoolsErrorResponse }).body &&
    Array.isArray((error as { body: CommercetoolsErrorResponse }).body.errors)
  );
};

export const detailedError = (error: unknown) => {
  const errorsList: string[] = [];

  if (isCommercetoolsError(error)) {
    error.body.errors.forEach((err: CommercetoolsErrorDetail) => {
      errorsList.push(`${err.code}: ${err.message}`);
    });
  }
  return errorsList.join('\n');
};

export class ServerError extends Error {
  constructor(
    public message: string,
    public originalError?: unknown,
  ) {
    super(message);
    this.name = 'ServerError';
    const detailedErr = detailedError(originalError).split(':').at(1)?.toString();
    if (detailedErr) {
      this.message = detailedErr;
    }
  }
}
