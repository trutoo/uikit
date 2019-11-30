// We must force tsc to interpret this file as a module, resolves
// "Augmentations for the global scope can only be directly nested in external modules or ambient module declarations."
export {};

declare global {
  interface Window {
    /** Counter for unique identifiers */
    eid: number;
  }
}

(function() {
  // Make sure there is an incremental ID each component can use
  window.eid || (window.eid = 0);
})();
