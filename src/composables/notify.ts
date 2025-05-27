import { toast } from 'vue-sonner';

export type NotifyError = {
  response: {
    data: {
      errors: {
        defaultUserMessage: string;
      }[];
      message?: string;
      error_description?: string;
      defaultUserMessage?: string;
    };
  };
};

export const notify = {
  success: (message: string) => toast.success(message),
  error: (message: NotifyError | string) => getErrorMessage(message),
};
function getErrorMessage(error: NotifyError | string) {
  if (error && typeof error === 'string') {
    return toast.error(error);
  }
  if (error && typeof error !== 'string') {
    toast.error(
      error.response?.data?.message
      || error.response?.data?.error_description
      || error.response?.data?.defaultUserMessage
      || 'Something went wrong',
    );
  } else {
    toast.error('Something went wrong');
  }
}
