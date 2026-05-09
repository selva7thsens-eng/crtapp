export const submitCardioForm = async (payload) => {
  console.log("========= API JSON =========");
  console.log(JSON.stringify(payload, null, 2));

  /*
  REAL API

  return await fetch("http://localhost:5000/api/cardio-form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  */

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
      });
    }, 1500);
  });
};