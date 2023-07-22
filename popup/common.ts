/**
 * ミリ秒を00h 00mの形にフォーマットする関数 by ChatGPT3.5
 * @param milliseconds 
 * @returns 
 */
export const formatElapsedTime = (milliseconds: number) => {
  // ミリ秒を秒に変換
  const seconds = Math.floor(milliseconds / 1000);

  // 時間と分を計算
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  // 2桁の0埋め
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

  // フォーマットして返す
  return `${formattedHours}h ${formattedMinutes}m`;
}

export const getDayTaskOrder = (orderData, index) => {
  const taskStartIndex = orderData.indexOf(index) + 1;
  const taskEndIndex = orderData.indexOf(index + 1);

  if (taskStartIndex === 0 || taskEndIndex === -1) {
    return [];
  }

  return orderData.slice(taskStartIndex, taskEndIndex);
}

export const changeOrder = (orderData: (string | number)[], str: string, direction: "forward" | "backward" = "forward") => {
  const currentIndex = orderData.indexOf(str);
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

export const updateTask = (allTaskState, taskId, newTask) => {
  const [allTask, setAllTask] = allTaskState
  const newAllTask = { ...allTask, [taskId]: newTask }
  console.dir("newAllTask")
  console.dir(newAllTask)
  setAllTask(newAllTask)
}


export const ALL_TASK = {
  "a1e73c8a-74d0-a1a5-4ef3-a58d99f0f69f": { title: "タスク", time: 11234567, },
  "9c874c99-1364-178c-d8d0-e19b45c67a8e": { title: "タスク", time: 11234567, },
  "8056d430-1342-1a64-7591-ba1af8b5dae3": { title: "タスク", time: 11234567, },
  "bde841f3-3d9c-9e45-4196-672302ca5f9e": { title: "タスク", time: 11234567, },
  "46767c15-cb33-2c6d-1baa-72e093aae910": { title: "タスク", time: 11234567, },
}

export const ORDER = [
  0,
  "a1e73c8a-74d0-a1a5-4ef3-a58d99f0f69f",
  "9c874c99-1364-178c-d8d0-e19b45c67a8e",
  1,
  "8056d430-1342-1a64-7591-ba1af8b5dae3",
  2, 3, 4,
  "bde841f3-3d9c-9e45-4196-672302ca5f9e",
  "46767c15-cb33-2c6d-1baa-72e093aae910",
  5,
]
