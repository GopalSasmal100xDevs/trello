export const redirectMiddleware = (store) => (next) => (action) => {
  if (action.type === "boards/createNewBoard/fulfilled") {
    const shouldRedirect = action.payload.data.id;

    if (shouldRedirect) {
      window.location.href = `/boards/${shouldRedirect}`;
    }
  }

  return next(action);
};
