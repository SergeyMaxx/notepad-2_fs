export const thunk = () => next => action => {
  action && next(action)
}