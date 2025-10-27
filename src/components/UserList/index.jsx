import React from "react";
import { Divider, List, ListItemText, ListItemButton } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import "./styles.css";
import models from "../../modelData/models";

function UserList() {
  const users = models.userListModel();

  return (
    <div>
      <List component="nav">
        {users.map((user, index) => (
          <div key={user._id}>
            <ListItemButton component={RouterLink} to={`/users/${user._id}`}>
              <ListItemText primary={`${user.first_name} ${user.last_name}`} />
            </ListItemButton>

            {index < users.length - 1 && <Divider />}
          </div>
        ))}
      </List>
    </div>
  );
}

export default UserList;
