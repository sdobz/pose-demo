import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

import { Exercise, getUid, isSuccess, useAppContext } from "../core";
import { NotSuccess } from "./resource";
import { PoseDetector } from "./pose-detection";

interface ExerciseProps {}

export function ExerciseManager({}: ExerciseProps) {
  const { resourceService } = useAppContext();
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
  onCancel,
  exercise,
}: ExerciseProps & { exercise: Exercise; onCancel: () => void }) {
  const [poseCapture, setPoseCapture] = useState<any>(null);
  const { resourceService, authState } = useAppContext();
  const uid = getUid(authState);

  // type issue: must check uid. note useResource limitation: can't skip queries
  const logR = resourceService.useLogs(exercise.id, uid!);

  if (!isSuccess(logR)) {
    return <NotSuccess r={logR} />;
  }

  function onCapture(data: any) {
    setPoseCapture(data);
  }

  return (
    <Grid>
      <Grid item>
        <Button onClick={onCancel}>Cancel</Button> {exercise.title} has been
        performed {logR.data.length} time(s)
      </Grid>
      <Grid item>
        {poseCapture === null ? (
          <PoseDetector
            model="posenet"
            type={undefined}
            onCapture={onCapture}
          />
        ) : (
          <ExerciseResult poseCapture={poseCapture} exercise={exercise} />
        )}
      </Grid>
    </Grid>
  );
}

function ExerciseResult({
  poseCapture,
  exercise,
}: {
  poseCapture: any;
  exercise: Exercise;
}) {
  const { resourceService, authState } = useAppContext();
  const uid = getUid(authState);

  // type issue: must check uid. note useResource limitation: can't skip queries
  const logSubmitR = resourceService.useSubmitLog(exercise.id, uid!);

  if (!isSuccess(logSubmitR)) {
    return <NotSuccess r={logSubmitR} />;
  }

  return (
    <>
      <p>Submitted log ID: {logSubmitR.data.id}</p>
      <pre>{JSON.stringify(poseCapture, null, 2)}</pre>
    </>
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
