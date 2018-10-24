import { pender } from 'redux-pender';

export function applyPenders(
  reducer: any,
  state: any,
  action: any,
  penders?: any[]
) {
  if (!penders) {
    return reducer(state, action);
  }
  const updaters = Object.assign({}, ...penders.map(pender));
  if (updaters[action.type]) {
    return updaters[action.type](state, action);
  }
  return reducer(state, action);
}
