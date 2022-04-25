import React, { useEffect, useState } from "react";
import { ResourceService, ResourceState, Exercise, isSuccess } from "../core";
import { NotSuccess } from "./resource";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

interface ExerciseListProps {
  resourceState: ResourceState;
  resourceService: ResourceService;
}

export function ExerciseSelector({
  resourceState,
  resourceService,
}: ExerciseListProps) {
  const { exercises } = resourceState;
  const [exerciseId, setExerciseId] = useState<number | null>(null);

  useEffect(() => resourceService.loadExercises(), []);
  if (!isSuccess(exercises)) {
    return <NotSuccess r={exercises} retry={resourceService.loadExercises} />;
  }

  // Type guards have ensured `.data` is present and defined
  const exerciseData = exercises.data;

  return (
    <Grid container spacing={2}>
      {exerciseData.map((exercise, i) => (
        <Grid item key={exercise.id} onClick={() => setExerciseId(i)}>
          <ExercisePreview exercise={exercise} />
        </Grid>
      ))}
    </Grid>
  );
}

function ExercisePreview({ exercise }: { exercise: Exercise }) {
  return <Box sx={{ p: 2 }}>{exercise.title}</Box>;
}
