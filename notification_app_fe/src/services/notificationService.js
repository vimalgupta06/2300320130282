
import { Log } from "logging_middleware";

const API_URL = process.env.REACT_APP_NOTIFICATION_API;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

const fallbackNotifications = [
  {
    ID: "7393db34-feae-4167-8900-7f341a7ea5f5",
    Type: "Placement",
    Message: "Nvidia Corporation hiring",
    Timestamp: "2026-06-08 09:59:46"
  },
  {
    ID: "c4910fa8-0ed8-4263-aa7b-36ff53d479bc",
    Type: "Placement",
    Message: "Apple Inc. hiring",
    Timestamp: "2026-06-09 03:29:29"
  },
  {
    ID: "90d1e022-cfcb-486c-b4d0-bb4757acbccb",
    Type: "Placement",
    Message: "PayPal Holdings Inc. hiring",
    Timestamp: "2026-06-09 02:59:12"
  },
  {
    ID: "9677fc64-09b7-4f8f-ba81-6745858a1dce",
    Type: "Event",
    Message: "traditional-day",
    Timestamp: "2026-06-08 18:58:55"
  },
  {
    ID: "acbf4188-a12a-42e2-a5f9-8b398e3ac6d6",
    Type: "Placement",
    Message: "Nvidia Corporation hiring",
    Timestamp: "2026-06-08 14:28:38"
  },
  {
    ID: "41230a39-3589-42b4-91f3-029b6dd0c734",
    Type: "Result",
    Message: "external",
    Timestamp: "2026-06-08 21:58:21"
  },
  {
    ID: "5636692c-ffac-4de6-a865-94190b8912f3",
    Type: "Placement",
    Message: "Amazon.com Inc. hiring",
    Timestamp: "2026-06-09 03:28:04"
  },
  {
    ID: "941d5c0e-11ee-439d-921b-e91e52ea3150",
    Type: "Placement",
    Message: "PayPal Holdings Inc. hiring",
    Timestamp: "2026-06-09 02:27:47"
  },
  {
    ID: "837c8fe1-2e76-407a-9b80-d6f95777bb5e",
    Type: "Event",
    Message: "tech-fest",
    Timestamp: "2026-06-08 23:57:30"
  },
  {
    ID: "95572381-7f9b-4567-9b47-98c359ab6e9c",
    Type: "Event",
    Message: "traditional-day",
    Timestamp: "2026-06-08 23:27:13"
  }
];

export async function fetchNotifications(page = 1, limit = 10, notificationType = "") {
  try {
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
      throw new Error("Remote notification API failed");
    }

    const data = await response.json();
    return data.notifications;
  } catch {
    await Log(
      "frontend",
      "warn",
      "api",
      "Using local fallback notification data after API request failure",
      ACCESS_TOKEN
    );

    let data = fallbackNotifications;

    if (notificationType) {
      data = data.filter((item) => item.Type === notificationType);
    }

    return data.slice(0, limit);
  }
}
