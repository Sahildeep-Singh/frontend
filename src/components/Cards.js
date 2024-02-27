import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function ActionAreaCard({ user }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={user.profile}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email : {user.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Mobile : {user.mobile}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Zip-Code : {user.zipCode}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.distance.toFixed(2)} km away
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
