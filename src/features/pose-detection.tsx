/**
 * Pose Detection
 * 
 * This file contains all pose detection code
 * 
 * Portions copied+modified from:

https://github.com/tensorflow/tfjs-models/blob/6b458da4d9c9489e7435b97097ac7f00d4ec251e/pose-detection/demos/live_video/index.html
Copyright 2021 Google LLC. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */

import Box from "@mui/material/Box";
import React, { useEffect } from "react";

import { app } from "../vendor/tfjs/index";

// Scrobbled from option_panel.js
type PoseDetectionParams =
  | {
      model: "posenet";
      type: undefined;
    }
  | {
      model: "movenet";
      type: "lightning" | "thunder" | "multipose";
    }
  | {
      model: "blazepose";
      type: "full" | "lite" | "heavy";
    };

export function PoseDetector(props: PoseDetectionParams) {
  useEffect(() => {
    const paramMap = new Map();
    paramMap.set("model", props.model);
    paramMap.set("type", props.type);
    // Wait a moment for the first render then run the pose detection gui setup code
    // There is a better way to do this with requestAnimationFrame
    setTimeout(async () => {
      console.log("[pose-detection] starting app()");
      await app(paramMap);
      console.log("[pose-detection] done");
    }, 10);
  }, []);

  return (
    <Box>
      <div className="canvas-wrapper">
        <canvas id="output"></canvas>
        <video
          id="video"
          playsInline
          style={{
            transform: "scaleX(-1)",
            visibility: "hidden",
            width: "auto",
            height: "auto",
          }}
        ></video>
      </div>
      <div id="scatter-gl-container"></div>
    </Box>
  );
}
