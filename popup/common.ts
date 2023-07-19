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