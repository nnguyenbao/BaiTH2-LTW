import React from "react";
import { Typography, Card, CardContent, Button, Box } from "@mui/material";

import { useParams, Link as RouterLink } from "react-router-dom";
import models from "../../modelData/models";

import "./styles.css";

function UserDetail() {
  const { userId } = useParams();

  const user = models.userModel(userId);

  if (!user) {
    return <Typography variant="h5">Không tìm thấy người dùng.</Typography>;
  }

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
      <CardContent>
        <Typography variant="h4" component="div" gutterBottom>
          {user.first_name} {user.last_name}
        </Typography>

        <Typography variant="body1" color="text.secondary" gutterBottom>
          <strong>Vị trí:</strong> {user.location}
        </Typography>

        <Typography variant="body1" color="text.secondary" gutterBottom>
          <strong>Nghề nghiệp:</strong> {user.occupation}
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph>
          <strong>Mô tả:</strong> {user.description}
        </Typography>

        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to={`/photos/${user._id}`}
          >
            Xem ảnh của {user.first_name}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default UserDetail;
