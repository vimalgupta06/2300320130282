mport { Log } from "logging_middleware";

const API_URL = process.env.REACT_APP_NOTIFICATION_API;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

export async function fetchNotifications(page = 1, limit = 20, notificationType = "") {
  await Log(
    "frontend",
    "info",
    "api",
    `Fetching notifications page=${page}, limit=${limit}, type=${notificationType || "all"}`,
    ACCESS_TOKEN
  );

  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit)
  });

  if (notificationType) {
    params.append("notification_type", notificationType);
  }

  const response = await fetch(`${API_URL}?${params.toString()}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`
    }
  });

  if (!response.ok) {
    await Log(
      "frontend",
      "error",
      "api",
      `Notification API failed with status ${response.status}`,
      ACCESS_TOKEN
    );

    throw new Error("Failed to fetch notifications");
  }

  const data = await response.json();

  await Log(
    "frontend",
    "info",
    "api",
    `Fetched ${data.notifications.length} notifications successfully`,
    ACCESS_TOKEN
  );

  return data.notifications;
}