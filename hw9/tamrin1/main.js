const urlInput = document.getElementById("url");
const methodSelect = document.getElementById("select-box");
const requestBody = document.getElementById("requestBody");
const responseBody = document.getElementById("responseBody");
const statusCode = document.getElementById("statusCode");
const submit = document.getElementById("submit");

function showRequestBody() {
  if (methodSelect.value === "POST") {
    requestBody.classList.remove("hidden");
  } else {
    requestBody.classList.add("hidden");
  }
}

methodSelect.addEventListener("change", showRequestBody);

async function showResponseBody() {
  const url = urlInput.value;
  const method = methodSelect.value;
  const requestBodyValue = requestBody.value;

  try {
    let options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (method === "POST") {
      try {
        JSON.parse(requestBodyValue);
        options.body = requestBodyValue;
      } catch (error) {
        responseBody.textContent = error.message;
        return;
      }
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error, Status: ${response.status} - ${errorText}`);
    }

    const contentType = response.headers.get("content-type");
    let result;

    if (contentType && contentType.includes("application/json")) {
      result = await response.json();
      responseBody.textContent = JSON.stringify(result, null, 2);
    } else {
      result = await response.text();
      responseBody.textContent = responseBody;
    }

    statusCode.textContent = `Status Code: ${response.status}`;
  } catch (error) {
    console.error("Error:", error);
    responseBody.textContent = `Error: ${error.message}`;
    statusCode.textContent = "Error";
  }
}

submit.addEventListener("click", showResponseBody);

showRequestBody();
