// We must force tsc to interpret this file as a module, resolves
// "Augmentations for the global scope can only be directly nested in external modules or ambient module declarations."
export {};

declare global {
  interface Window {
    /** Counter for unique identifiers */
    uikit: {
      ids: { [namespace: string]: number; default: number };
      nextId: (namespace?: string) => string;
    };
  }
}

(function() {
  // Make sure there is an incremental ID each component can use
  if (window.uikit) {
    window.uikit = {
      ids: { default: 0 },
      nextId(namespace?: string): string {
        if (!namespace || namespace == 'default') return `id-${this.ids.default++}`;
        if (this.ids[namespace]) return `id-${namespace}-${this.ids[namespace]++}`;
        this.ids[namespace] = 0;
        return `id-${namespace}-${this.ids[namespace]}`;
      },
    };
  }
})();
