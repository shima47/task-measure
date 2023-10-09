import * as type from "~types/type"

const ALL_TASK: type.allTask = {
  // "a1e73c8a-74d0-a1a5-4ef3-a58d99f0f69f": { title: "タスク", time: 11234567, },
  // "9c874c99-1364-178c-d8d0-e19b45c67a8e": { title: "タスク", time: 11234567, },
  // "8056d430-1342-1a64-7591-ba1af8b5dae3": { title: "タスク", time: 11234567, },
  // "bde841f3-3d9c-9e45-4196-672302ca5f9e": { title: "タスク", time: 11234567, },
  // "46767c15-cb33-2c6d-1baa-72e093aae910": { title: "タスク", time: 11234567, },
}
const ORDER: type.order = [
  0,
  // "a1e73c8a-74d0-a1a5-4ef3-a58d99f0f69f",
  // "9c874c99-1364-178c-d8d0-e19b45c67a8e",
  1,
  // "8056d430-1342-1a64-7591-ba1af8b5dae3",
  2, 3, 4,
  // "bde841f3-3d9c-9e45-4196-672302ca5f9e",
  // "46767c15-cb33-2c6d-1baa-72e093aae910",
  5,
]
const RUNNING_TASK: type.runningTaskInfo = {
  id: "",
  startTime: 0,
}
const IS_OPEN_ARY: type.isOpenAry = [true, true, true, true, true]
const SELECTED_TASK_ID = ""
const IS_IMPORTING = false
const REST_TIME: type.restTime[] = [{
  startRestTime: "",
  endRestTime: "",
  isSelect: false,
}]

export const INITIAL_DATA = {
  ALL_TASK: ALL_TASK,
  ORDER: ORDER,
  RUNNING_TASK: RUNNING_TASK,
  IS_OPEN_ARY: IS_OPEN_ARY,
  SELECTED_TASK_ID: SELECTED_TASK_ID,
  IS_IMPORTING: IS_IMPORTING,
  REST_TIME: REST_TIME,
}