## 時間編集
- [x] 時間用のStateを作る
- [x] 編集用のStateを作る
- [x] 編集中かどうかを示すStateを作る
- [x] 編集中かどうかで表示するStateを変更する
- [x] focus時に編集中に変更する
- [x] 現在のフォーム内容を編集フォームに渡す
- [x] 編集フォームの変更時は普通に編集Stateに反映
- [ ] focus外すとき
  - [x] 小数に変換
    - [x] エラーなら値を元に戻す
  - [x] DBに反映
  - [x] 小数に0を足して文字列に
  - [x] 元のStateに反映
  - [x] 実行中のタスクならStartTimeをリセットする
  - [x] 編集状態OFF
- [x] 0.25減らすボタン

## タスク実行
- [x] 実行時間計算の共通化
- [x] 曜日の合計時間

## 並べ替え
- [ ] ドラッグ移動

## 複数選択
- [ ] 並べ替え
- [ ] 削除

## 新規作成
- [ ] 選択の場所に作成

## コピー機能
- [ ] コピー機能

## 削除保護
- [x] Task.tsxにボタン追加する
- [x] onClickProtection関数作る
- [x] UpdateTaskProtection作成
  - [x] 新規作成関数でisProtectedプロパティを追加するように修正
  - [x] isProtectedプロパティ：Boolを変更する
  - [ ] 他の関数に影響ありそう？
- [x] DeleteTaskの修正
  - [x] CheckProtection関数で共通化したい
  - [x] DeleteAllTask関数修正
    - [x] Filterで削除しないデータだけ抜き取る
      - [x] AllTask
      - [x] Order
  - [x] DeleteTask関数修正
    - [x] 保護フラグチェックするだけ
- [x] 保護表示かどうかをUIに反映
  - [x] isProtectedStateで管理

## JSON
- [x] エクスポート
- [ ] インポート
  - [ ] バリデーション
  - [x] 基礎機能

## 経過時間をきりよく丸める
- [x] 1.34みたいな時間を1.25にする
- [x] 丸める計算ロジック作成
  - チャッピー
- [x] クリックカスタムフック
  - [x] dayTaskOrderを取得
  - [x] それぞれ丸めてデータ保存
- [x] ボタン作成
  - [x] DayDivに配置
  - [x] アイコンはチェックボタンかな

## リファクタ
- [ ] データ格納形式
- [x] UseStateをまとめる
  - [x] 全体レンダリング系をまとめる
    - order, startTime, runningTaskId, 
    - [x] UseContextにする
  - [x] 全体レンダリングが不要なものを分散
    - [x] allTask, isOpenAryはトップに初回のみStateを置きつつ子コンポーネントで各自Stateを持つ
    - [ ] 更新はlocalstorageを直に更新
    - [x] UseContextを使う
- [x] task timeのカスタムフック化
  - タスクIDからタスクを割り出す
    - UseTask
  - タスクが削除されたらReturn Null
  - 未反映の時間を反映させる
    - UseApplyTime
  - 時間編集カスタムフック
    - UseTaskTime
    - 表示用タスクタイムのForm用State
      - 再レンダリングに合わせて変更させるのでStateは不要
    - 編集用タスクタイムのForm用State
    - タスクタイムの編集状態State
    - タスクの時間を小数点二桁にする
    - OnForcus
      - 編集状態ON
      - 表示内容を編集Form Stateに渡す
    - Onchange
      - 編集用Form Stateを変更
    - OnBlur
      - 編集状態OFF
      - 入力された内容を確定させる

  - 実行中状態（Stateじゃない）
    - 未反映の時間の反映に利用
    - 脱フォーカス時に利用
      - なのでカスタムフック化する

  - タスクの選択状態
    - カスタムフック


## 設定画面


## 休み時間対応
- 

## アイコンホバー注釈


## 時間の移し替え
- 休憩時間前開始 ＞ 休憩時間前終了          |   休憩   |
- 休憩時間前開始 ＞ 休憩時間中終了
- 休憩時間前開始 ＞ 休憩時間後終了
- 休憩時間中開始 ＞ 休憩時間中終了
- 休憩時間中開始 ＞ 休憩時間後終了
- 休憩時間後開始 ＞ 休憩時間後終了
- 

## 削除保護