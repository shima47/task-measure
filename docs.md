# 変更概要
## v1.4.0
- 工数予定機能
## v1.4.1
- 新規作成時にschedule合計がNaNになる不具合
- 新規作成時にscheduleプロパティを作成
## v1.4.2
- 保護済みタスクの削除時にscheduleが初期化されない不具合
- 保護済みタスクの削除時にscheduleを初期化

# v1.4.0 設計
## 要件定義
- 各タスクに予定工数を記入できること
- 日の工数合計を算出できること
## 基本設計
- 現状ある工数フォームのパクリで進める
- 文字は小さめにする
- 実績工数の右に配置する
## 詳細設計
### テーブル設計
- title: string
- time: number
- schedule: number
- isProtected: boolean
### クラス、関数設計
- 現状ある工数フォームのパクリで進める
- useTaskTime.tsより、useScheduleTime.tsを作成
- データ更新のためにuseUpdateTask.tsにupdateScheduleTime関数を追加
- 予定合計計算のuseTotalDaySchedule.tsを追加
## 単体テスト
- 
## 結合テスト
- フォームの数値が記録できることをテスト
- 実績工数の右に配置されていることをテスト
- 文字が小さめであることをテスト
## 総合テスト
- 各タスクに予定工数を記入できることをテスト
- 日の工数合計を算出できることをテスト

# v1.4.1 設計
## 要件定義
- タスク新規作成時にscheduleを設定すること
## 基本設計
- タスク新規作成時にscheduleを0にする
### テーブル設計
- title: string
- time: number
- schedule: number
- isProtected: boolean
## 詳細設計
### クラス、関数設計
- useNewTask.tsのcreateTask関数でscheduleを初期化するように変更
## 単体テスト
## 結合テスト
## 総合テスト
- 新規作成時にschedule合計がNaNにならず計算されることをテスト

# v1.4.2 設計
## 要件定義
- 保護済みタスクの削除時にscheduleを初期化されること
## 基本設計
- 保護済みタスクの削除時にscheduleを0にする
## 詳細設計
### クラス、関数設計
- useDeleteTask.tsのdeleteTask関数とdeleteAllTask関数でscheduleを0に設定するように変更
## 単体テスト
## 結合テスト
## 総合テスト
- 保護済みタスクの削除時にscheduleが0になることをテスト




