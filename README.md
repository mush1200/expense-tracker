# 老爸的私房錢 Expense Tracker
一個用Express和MongoDB所建立的簡單記帳工具應用程式

## 專案功能
* 使用者可以用Facebook及信箱註冊帳號登入APP
* 使用者可以瀏覽屬於他自己的所有支出紀錄和支出總金額
* 使用者可以依據類別或月份來篩選支出紀錄
* 使用者可以新增一筆支出紀錄
* 使用者可以編輯一筆支出紀錄
* 使用者可以刪除一筆支出紀錄

## 環境建置
* nvm & Node.js
* nodemon
* MongoDB

## 安裝流程
1. 在終端機輸入指令 clone 此專案至本機電腦
```
git clone https://github.com/mush1200/expense-tracker.git
```
2. 進入專案資料夾
```
cd expense-tracker
```
3. 安裝相關套件
```
npm install
```
4. 安裝 nodemon 套件 (若未安裝)
```
npm install -g nodemon
```
5. 複製.env.example檔案，檔名更改為.env
```
cp .env.example .env
```
6. 將根目錄.env檔案中列為SKIP的部分替換為相關ID與金鑰內容
7. 新增種子資料
```
npm run seed
```
8. 啟動專案
```
npm run dev
```
9. 當終端機出現以下訊息後，即可在 http://localhost:3000 開始使用
<br>
App is running on http://localhost:3000.

## 預設使用者登入資料
email: root@example.com
<br>
password: 12345678