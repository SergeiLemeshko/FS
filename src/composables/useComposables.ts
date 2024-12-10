export const debounce = (func: Function, delay: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debouncedFunction = (...args: any[]): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };

  debouncedFunction.clear = (): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
  };

  return debouncedFunction;
};