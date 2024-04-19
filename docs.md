# 変更概要
## v1.4.0
- 工数予定機能

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



