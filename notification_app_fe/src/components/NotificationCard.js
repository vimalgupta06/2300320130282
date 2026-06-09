import { Card, CardContent, Chip, Typography } from "@mui/material";

export default function NotificationCard({ notification }) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Chip label={notification.Type} sx={{ mb: 1 }} />

        <Typography variant="h6" fontWeight={600}>
          {notification.Message}
        </Typography>

        <Typography color="text.secondary">
          {new Date(notification.Timestamp).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
}