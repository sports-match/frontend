import { reactive, ref } from 'vue';

export type AlertDialogOptions = {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'default' | 'destructive';
};

const open = ref(false);
const state = reactive<AlertDialogOptions>({
  title: '',
  description: '',
  confirmText: 'OK',
  cancelText: 'Cancel',
  confirmVariant: 'default',
});

let resolver: (val: boolean) => void;

export function useAlertDialogState() {
  return {
    open,
    state,
    resolve(value: boolean) {
      resolver?.(value);
    },
  };
}

export function useAlertDialog() {
  return (options: AlertDialogOptions): Promise<boolean> => {
    Object.assign(state, {
      confirmText: 'OK',
      cancelText: 'Cancel',
      confirmVariant: 'default',
      ...options,
    });
    open.value = true;

    return new Promise((res) => {
      resolver = res;
    });
  };
}
