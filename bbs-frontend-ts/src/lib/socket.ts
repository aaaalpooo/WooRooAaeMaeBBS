const parseJSON = (str: string) => {
  let parsed = null;
  try {
    parsed = JSON.parse(str);
  } catch (e) {
    return null;
  }
  return parsed;
};

export default (function socketHelper() {
  let _store: any = null;
  let _socket = null;
  let _uri: any = null;

  const listener = (message: any) => {
    const data = parseJSON(message.data); // JSON 파싱
    if (!data || !data.type) return; // 파싱 실패했거나, type 값이 없으면 무시
    console.log(data);
    _store.dispatch(data); // 제대로 된 데이터면 store 에 디스패치
  };

  const reconnect = () => {
    // 연결이 끊겼을 때 3초마다 재연결
    console.log('reconnecting..');
    setTimeout(() => connect(_uri), 3000);
  };

  const connect = (uri: any) => {
    _uri = uri;
    _socket = new WebSocket(uri);
    _socket.onmessage = listener;
    _socket.onopen = event => {
      console.log(`connected to ${uri}`);
    };
    _socket.onclose = reconnect; // 연결이 끊기 면 재연결 시도
  };

  return {
    initialize: (store: any, uri: any) => {
      _store = store;
      connect(uri);
    },
  };
})();
