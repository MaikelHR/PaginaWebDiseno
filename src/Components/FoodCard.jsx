import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const FoodCard = ({imgUrl, name, onClick}) => {
  return (
    <Card sx={{ width: 345, marginBottom: "2em" }}>
      <CardActionArea onClick={onClick}>
        <CardMedia
          component="img"
          height="140"
          image={imgUrl}
          alt={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default FoodCard