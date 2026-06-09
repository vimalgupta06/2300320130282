import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  MenuItem,
  TextField,
  Typography
} from "@mui/material";
import { Link } from "react-router-dom";
import { Log } from "logging_middleware";
import NotificationCard from "../components/NotificationCard";
import { fetchNotifications } from "../services/notificationService";

const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

export default function AllNotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [notificationType, setNotificationType] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadNotifications() {
    try {
      setLoading(true);
      setError("");

      await Log(
        "frontend",
        "info",
        "page",
        "All notifications page requested notification list",
        ACCESS_TOKEN
      );

      const data = await fetchNotifications(page, limit, notificationType);

      setNotifications(data);
    } catch {
      setError("Unable to fetch notifications.");

      await Log(
        "frontend",
        "error",
        "page",
        "All notifications page failed to fetch data",
        ACCESS_TOKEN
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Campus Notifications
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        View all campus notifications and filter them by type.
      </Typography>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
        <TextField
          select
          label="Notification Type"
          value={notificationType}
          onChange={(event) => setNotificationType(event.target.value)}
          sx={{ minWidth: 220 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Event">Event</MenuItem>
          <MenuItem value="Result">Result</MenuItem>
          <MenuItem value="Placement">Placement</MenuItem>
        </TextField>

        <TextField
          label="Page"
          type="number"
          value={page}
          onChange={(event) => setPage(Number(event.target.value))}
          sx={{ width: 120 }}
        />

        <TextField
          label="Limit"
          type="number"
          value={limit}
          onChange={(event) => setLimit(Number(event.target.value))}
          sx={{ width: 120 }}
        />

        <Button variant="contained" onClick={loadNotifications}>
          Apply
        </Button>

        <Button variant="outlined" component={Link} to="/priority">
          Priority Inbox
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ display: "grid", gap: 2 }}>
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.ID}
              notification={notification}
            />
          ))}
        </Box>
      )}
    </Container>
  );
}
