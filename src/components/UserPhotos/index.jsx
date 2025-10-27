import React from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";

import { useParams, Link as RouterLink } from "react-router-dom";

import models from "../../modelData/models";

import "./styles.css";

function formatDateTime(dateTimeString) {
  try {
    const date = new Date(dateTimeString);

    return date.toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch (e) {
    console.error("Lỗi định dạng ngày:", e);
    return dateTimeString;
  }
}

function UserPhotos() {
  const { userId } = useParams();

  const photos = models.photoOfUserModel(userId);
  // console.log(photos);

  if (!photos || photos.length === 0) {
    return (
      <Typography variant="h5">Người dùng này chưa có ảnh nào.</Typography>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      {photos.map((photo) => (
        <Card key={photo._id} sx={{ mb: 4 }}>
          <CardMedia
            component="img"
            image={`/images/${photo.file_name}`}
            alt={`Ảnh của ${userId}`}
            sx={{ maxHeight: 400, objectFit: "contain", background: "#f0f0f0" }}
          />
          <CardContent>
            <Typography variant="caption" color="text.secondary" gutterBottom>
              Ngày đăng: {formatDateTime(photo.date_time)}
            </Typography>

            <Typography variant="h6" sx={{ mt: 2 }}>
              Bình luận:
            </Typography>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {photo.comments && photo.comments.length > 0 ? (
                photo.comments.map((comment, index) => (
                  <React.Fragment key={comment._id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={
                          <Typography variant="body2">
                            {comment.comment}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography
                              component={RouterLink}
                              to={`/users/${comment.user._id}`}
                              variant="caption"
                              color="primary"
                              sx={{
                                textDecoration: "none",
                                fontWeight: "bold",
                              }}
                            >
                              {comment.user.first_name} {comment.user.last_name}
                            </Typography>

                            <Typography
                              component="span"
                              variant="caption"
                              color="text.secondary"
                            >
                              {" - "}
                              {formatDateTime(comment.date_time)}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>

                    {index < photo.comments.length - 1 && (
                      <Divider component="li" />
                    )}
                  </React.Fragment>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="Chưa có bình luận nào." />
                </ListItem>
              )}
            </List>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default UserPhotos;
