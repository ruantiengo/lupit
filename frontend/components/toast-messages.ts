type Variant = "destructive" | "default";
export const toastMessages = (
  toast: any,
  variant: Variant,
  title: string,
  description?: string
) => {
  toast({
    variant,
    title,
    description,
  });
};
