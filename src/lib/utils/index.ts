import { toast } from 'svelte-sonner';

export const isAnchorActive = (pathname: string, href: string, fuzzy?: boolean) => {
  if (fuzzy) {
    return pathname.startsWith(href);
  } else {
    return pathname == href;
  }
};

export const copyToClipboard = (text: string, message?: string, errorMessage?: string) => {
  message ??= 'Text has been copied';
  errorMessage ??= 'Text could not be copied';

  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success(message, {
        description: text,
        cancel: {
          label: 'Close'
        }
      });
    })
    .catch((err) => {
      toast.error(errorMessage, {
        description: err.name + ': ' + err.message,
        cancel: {
          label: 'Close'
        }
      });
    });
};
