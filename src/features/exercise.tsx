import React, { useState } from "react";
import { ResourceService, Exercise, isSuccess } from "../core";
import { NotSuccess } from "./resource";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { PoseDetector } from "./pose-detection";

interface ExerciseProps {
  resourceService: ResourceService;
}

export function ExerciseManager({ resourceService }: ExerciseProps) {
  const exercisesR = resourceService.useExercises();
  const [exerciseId, setExerciseId] = useState<number | null>(null);

  if (!isSuccess(exercisesR)) {
    return <NotSuccess r={exercisesR} />;
  }

  // Type guard `isSuccess` has ensured `.data` is present and defined
  const exercises = exercisesR.data;

  return (
    <>
      {exerciseId !== null ? (
        <PerformExercise
          resourceService={resourceService}
          onCancel={() => setExerciseId(null)}
          exercise={exercises[exerciseId]}
        />
      ) : (
        <ExerciseList exercises={exercises} setExerciseId={setExerciseId} />
      )}
    </>
  );
}

function PerformExercise({
  resourceService,
  onCancel,
  exercise,
}: ExerciseProps & { exercise: Exercise; onCancel: () => void }) {
  const [poseCapture, setPoseCapture] = useState<any>(null);

  function onCapture(data: any) {
    setPoseCapture(data);
  }

  return (
    <Grid>
      <Grid item>
        <Button onClick={onCancel}>Cancel</Button> {exercise.title}
      </Grid>
      <Grid item>
        {poseCapture === null ? (
          <PoseDetector
            model="posenet"
            type={undefined}
            onCapture={onCapture}
          />
        ) : (
          <pre>{JSON.stringify(poseCapture, null, 2)}</pre>
        )}
      </Grid>
    </Grid>
  );
}

function ExerciseList({
  exercises,
  setExerciseId,
}: {
  exercises: Exercise[];
  setExerciseId: (i: number) => void;
}) {
  return (
    <Stack spacing={2}>
      {exercises.map((exercise, i) => (
        <Stack direction="row" key={exercise.id}>
          <Button onClick={() => setExerciseId(i)}>Begin Exercise</Button>
          <ExercisePreview exercise={exercise} />
        </Stack>
      ))}
    </Stack>
  );
}

function ExercisePreview({ exercise }: { exercise: Exercise }) {
  return <Box sx={{ p: 2 }}>{exercise.title}</Box>;
}
