import { v4 as uuid } from "uuid"


/**
 * ミリ秒を00h 00mの形にフォーマットする関数 by ChatGPT3.5
 * @param milliseconds 
 * @returns 
 */
export const millisecondsToHours = (milliseconds: number) => {
  const hours = milliseconds / 3600000; // 1時間のミリ秒数で割る
  const result = parseFloat(hours.toFixed(2)); // 小数点以下2桁までの小数を取得
  return result === 0 ? "0.00h" : `${String(result)}h`; // 0のとき表示を変える
}

export const getDayTaskOrder = (orderData, index) => {
  const taskStartIndex = orderData.indexOf(index) + 1;
  const taskEndIndex = orderData.indexOf(index + 1);

  if (taskStartIndex === 0 || taskEndIndex === -1) {
    return [];
  }

  const dayTaskOrder = orderData.slice(taskStartIndex, taskEndIndex);
  return dayTaskOrder
}

export const getChangedOrder = (orderData: (string | number)[], taskId: string, direction: "forward" | "backward" = "forward") => {
  const currentIndex = orderData.indexOf(taskId);
  if (currentIndex === -1) {
    return orderData; // 該当する文字列が見つからない場合は元の配列を返す
  }

  const nextIndex = direction === "forward" ? currentIndex + 1 : currentIndex - 1;

  if (nextIndex === 0 || nextIndex === orderData.length - 1) {
    return orderData; // 端の要素と入れ替えようとする場合は元の配列を返す
  }

  const copyOrderData = [...orderData]; // 元の配列を変更せずにコピー
  // 配列の要素を入れ替え
  [copyOrderData[currentIndex], copyOrderData[nextIndex]] = [copyOrderData[nextIndex], copyOrderData[currentIndex]];

  return copyOrderData;
}

export const createNewTask = (allTaskState, orderDataState, dayIndex) => {
  const [allTask, setAllTask] = allTaskState
  const [orderData, setOrderData] = orderDataState

  const newId = createNewUUID(orderData) // かぶらないようにUUID発行

  // orderDataのdayIndexの次の仕切りの手前に挿入する
  const newOrderData = [...orderData]
  const indexToInsert = newOrderData.indexOf(dayIndex + 1);
  newOrderData.splice(indexToInsert, 0, newId)

  const newTask = { title: "タスク", time: 0, }
  const newAllTask = { ...allTask, [newId]: newTask }

  setAllTask(newAllTask)
  setOrderData(newOrderData)
}


const orderData = [0, "a", "b", 1, "c", 2, 3, 4, "d", "e", 5,]

export const createNewUUID = (orderData) => {
  //既存のOrderData配列に含まれないUUIDが出たらReturn
  let tries = 0;
  while (tries < 100) {
    const id: string = uuid();
    if (!orderData.includes(id)) { return id }
    tries++;
  }

  throw new Error("新しいUUIDが生成できませんでした。");
}

export const updateTaskTitle = (allTaskState, taskId: string, title: string) => {
  const [allTask, setAllTask] = allTaskState

  const task = allTask[taskId]
  const updatedTask = { ...task, title: title }

  const newAllTask = { ...allTask, [taskId]: updatedTask }
  setAllTask(newAllTask)
}

export const updateTaskTime = (allTaskState, doingTaskId: string, startTime: number) => {
  const [allTask, setAllTask] = allTaskState

  const task = allTask[doingTaskId]
  if (!task) return
  const newTaskTime = task.time + (Date.now() - startTime)
  const updatedTask = { ...task, time: newTaskTime, }

  const newAllTask = { ...allTask, [doingTaskId]: updatedTask }
  setAllTask(newAllTask)
}

export const deleteTask = (grobalState) => {
  if (!confirm("タスクを削除しますか？")) return

  const [allTask, setAllTask] = grobalState.allTaskState
  const [orderData, setOrderData] = grobalState.orderDataState
  const [startTime, setStartTime] = grobalState.doingTaskState
  const [doingTaskId, setDoingTaskId] = grobalState.startTimeState
  const [selectedTaskId, setSelectedTaskId] = grobalState.selectedTaskIdState

  // 削除するIDの項目を削除
  const newAllTask = { ...allTask };
  delete newAllTask[selectedTaskId];

  // 削除するID以外を抽出
  const newOrderData = orderData.filter(item => item !== selectedTaskId);

  setAllTask(newAllTask)
  setOrderData(newOrderData)
  setSelectedTaskId("")

  // 消えたのが実行中のタスクじゃなければ中断
  if (selectedTaskId !== doingTaskId) return

  setStartTime(0)
  setDoingTaskId("")
}

export const deleteAllTask = (grobalState) => {
  if (!confirm("タスクを全て削除しますか？")) return

  const [allTask, setAllTask] = grobalState.allTaskState
  const [orderData, setOrderData] = grobalState.orderDataState
  const [startTime, setStartTime] = grobalState.doingTaskState
  const [doingTaskId, setDoingTaskId] = grobalState.startTimeState
  const [selectedTaskId, setSelectedTaskId] = grobalState.selectedTaskIdState

  setAllTask({})
  setOrderData([0, 1, 2, 3, 4, 5])
  setStartTime(0)
  setDoingTaskId("")
  setSelectedTaskId("")
}

export const ALL_TASK = {
  // "a1e73c8a-74d0-a1a5-4ef3-a58d99f0f69f": { title: "タスク", time: 11234567, },
  // "9c874c99-1364-178c-d8d0-e19b45c67a8e": { title: "タスク", time: 11234567, },
  // "8056d430-1342-1a64-7591-ba1af8b5dae3": { title: "タスク", time: 11234567, },
  // "bde841f3-3d9c-9e45-4196-672302ca5f9e": { title: "タスク", time: 11234567, },
  // "46767c15-cb33-2c6d-1baa-72e093aae910": { title: "タスク", time: 11234567, },
}

export const ORDER = [
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
