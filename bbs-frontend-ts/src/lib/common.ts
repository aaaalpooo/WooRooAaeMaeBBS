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

export const getScrollTop = (): number => {
  if (!document.body) {
    return 0;
  }
  const scrollTop = document.documentElement
    ? document.documentElement.scrollTop || document.body.scrollTop
    : document.body.scrollTop;
  return scrollTop;
};

export const getScrollBottom = (): number => {
  if (!document.body) {
    return 0;
  }

  const { scrollHeight } = document.body;
  const { innerHeight } = window;
  const scrollTop = getScrollTop();
  return scrollHeight - innerHeight - scrollTop;
};
