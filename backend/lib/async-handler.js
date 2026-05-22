/**
 * Wrap async Express handlers — forwards errors to centralized error middleware.
 * @param {(req: import('express').Request, res: import('express').Response) => Promise<void>} fn
 */
export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res)).catch(next);
  };
}
