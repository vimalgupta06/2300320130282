import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography
} from "@mui/material";
import { Link } from "react-router-dom";
import { Log } from "logging_middleware";
import NotificationCard from "../components/NotificationCard";
import { fetchNotifications } from "../services/notificationService";
import { getPriorityNotifications } from "../utils/priority";

const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

export default function PriorityPage() {
  const [notifications, setNotifications] = useState([]);
  const [topN, setTopN] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadPriorityNotifications() {
    try {
      setLoading(true);
      setError("");

      await Log(
        "frontend",
        "info",
        "page",
        `Priority inbox requested top ${topN} notifications`,
        ACCESS_TOKEN
      );

      const data = await fetchNotifications(1, 10);
      const priorityData = getPriorityNotifications(data, topN);

      setNotifications(priorityData);

      await Log(
        "frontend",
        "info",
        "utils",
        `Calculated ${priorityData.length} priority notifications`,
        ACCESS_TOKEN
      );
    } catch {
      setError("Unable to fetch priority notifications.");

      await Log(
        "frontend",
        "error",
        "page",
        "Priority inbox failed to fetch data",
        ACCESS_TOKEN
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPriorityNotifications();
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Priority Inbox
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Shows top n notifications using priority and recency.
      </Typography>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
        <TextField
          label="Top N"
          type="number"
          value={topN}
          onChange={(event) => setTopN(Number(event.target.value))}
          sx={{ width: 120 }}
        />

        <Button variant="contained" onClick={loadPriorityNotifications}>
          Refresh
        </Button>

        <Button variant="outlined" component={Link} to="/">
          All Notifications
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
