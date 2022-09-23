/**
 * Created by Henry Huang.
 */

const formDataToJsonString = (formData) => {
  const object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  return JSON.stringify(object);
};

export const post = (endpoint, data, opts) => {
  const options = {
    method: 'post',
    headers: {},
  };

  if (data instanceof FormData) {
    // options.body = data;
    options.body = formDataToJsonString(data);
  } else {
    options.body = JSON.stringify(data);
  }
  Object.assign(options.headers, {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });

  if (opts && opts.headers) {
    Object.assign(options.headers, opts.headers);
  }

  return fetch(endpoint, options).then(response => (
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return Promise.resolve(json);
    })
  ));
};


export const get = (endpoint, opts) => {
  const options = {
    method: 'get',
  };
  if (opts) {
    Object.assign(options, opts);
  }

  return fetch(endpoint, options).then(response => response.json().then((json) => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    return Promise.resolve(json);
  }));
};
