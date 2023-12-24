import { API_TIMEOUT_IN_SEC } from "./config/config.js";
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
export const AJAX = async function (url, payload = undefined) {
  try {
    const fetchPromise = payload
      ? fetch(url, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        })
      : fetch(url);
    const response = await Promise.race([
      fetchPromise,
      timeout(API_TIMEOUT_IN_SEC),
    ]);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`${data.message} ${response.status}`);
    }
    return data;
  } catch (error) {
    throw error;
  }
};

// export const getJSON = async function (url) {
//   try {
//     const response = await Promise.race([
//       fetch(url),
//       timeout(API_TIMEOUT_IN_SEC),
//     ]);
//     const data = await response.json();
//     if (!response.ok) {
//       throw new Error(`${data.message} ${response.status}`);
//     }
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const sendJSON = async function (url, payload) {
//   try {
//     const options = {
//       method: "POST",
//       body: JSON.stringify(payload),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     const response = await Promise.race([
//       fetch(url, options),
//       timeout(API_TIMEOUT_IN_SEC),
//     ]);
//     const data = await response.json();
//     if (!response.ok) {
//       throw new Error(`${data.message} ${response.status}`);
//     }
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };
