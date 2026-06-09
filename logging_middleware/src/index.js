const LOG_API_URL = "http://4.224.186.213/evaluation-service/logs";

export async function Log(stack, level, packageName, message, token) {
  try {
    if (!token) {
      return;
    }

    await fetch(LOG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        stack,
        level,
        package: packageName,
        message
      })
    });
  } catch {
  }
}
