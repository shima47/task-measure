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

const getDayTask = (orderData, index) => {
  const taskStartIndex = orderData.indexOf(index) + 1;
  const taskEndIndex = orderData.indexOf(index + 1);
  
  if (taskStartIndex === 0 || taskEndIndex === -1) {
    return [];
  }
  
  return orderData.slice(taskStartIndex, taskEndIndex);
}

const changeOrder = (orderData: (string | number)[], str: string, direction: "forward" | "backward" = "forward") => {
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

export const updateTask = (allTaskState, newTask) => {
  const [allTask, setAllTask] = allTaskState

  const newAllTask = allTask.map((dayTask) => {
    return dayTask.map((task) => {
      return task.id === newTask.id ? newTask : task
    })
  })

  console.dir(newAllTask)
  setAllTask(newAllTask)
}

