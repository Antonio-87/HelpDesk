const createRequest = (url, options = {}, callback = null) => {
  fetch(url, options).then((response) => {
    if (response.ok) {
      response
        .json()
        .then((response) => (callback ? callback(response) : response));
    } else {
      alert("Ошибка в HTTP:" + response.status + "\n" + response.statusText);
    }
  });
};

export default createRequest;
