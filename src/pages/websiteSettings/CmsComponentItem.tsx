import React from "react";
import { IconButton, Typography, Paper, Grid, Tooltip } from "@mui/material";
import {
  Delete as DeleteIcon,
  DragHandle as DragHandleIcon,
} from "@mui/icons-material";
import { useDrag, useDrop } from "react-dnd";


interface ComponentItemProps {
  name: string;
  description: string;
  index: number;
  moveComponent: (fromIndex: number, toIndex: number) => void;
  removeComponent: (index: number) => void;
}

const ComponentItem = ({
  name,
  description,
  index,
  moveComponent,
  removeComponent,
}: ComponentItemProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: "COMPONENT",
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: "COMPONENT",
    hover: (item: any, monitor) => {
      if (item.index !== index) {
        moveComponent(item.index, index);
        item.index = index;
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <Tooltip title={isDragging ? "Drop here" : ""}>
      <Paper
        ref={(node) => drag(drop(node))}
        style={{
          padding: "16px",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          marginBottom: "8px",
          backgroundColor: isOver ? "#f5f5f5" : "#fff",
          opacity: isDragging ? 0.5 : 1,
          transition: "background-color 0.3s, opacity 0.3s",
        }}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <IconButton>
              <DragHandleIcon />
            </IconButton>
          </Grid>
          <Grid item xs={8}>
            <div>
              <Typography variant="h6">{`${index + 1}. ${name}`}</Typography>
              <Typography variant="body2">{`${
                index + 1
              }. ${description}`}</Typography>
            </div>
          </Grid>
          <Grid item xs={2}>
            <IconButton
              onClick={() => removeComponent(index)}
              color="error"
              size="small"
              edge="end"
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </Tooltip>
  );
};

export default ComponentItem;
