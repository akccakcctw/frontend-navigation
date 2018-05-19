## json2readme.py Usage

#### Requirement

- Python3
- Python module: colorama
  - `pip install colorama`
- Make sure tool/json2readme.py is executable
  - `chmod u+x tool/json2readme.py`

#### Usage (command-line)

Just run `npm run build:readme`, or do it manually:

1. `cd` to frontend-navigation/
2. `./tool/json2readme.py`

---

## json2readme.sh Usage

json2readme.sh will generate/update README.md on the basis of data(js/data.json). Before using it, you have to install [jq](https://stedolan.github.io/jq/download/) in your machine.

#### Usage (command-line)

1. `cd` to frontend-navigation/
2. `sh tool/json2readme.sh`

執行 json2readme.sh，將依據 js/data.json 的內容，自動產生／更新 README.md 於根目錄。使用前，請確認電腦已安裝 [jq](https://stedolan.github.io/jq/download/)。

#### 使用方法（命令列）

1. 切換 terminal 至 frontend-navigation/ 根目錄
2. 輸入 `sh tool/json2readme.sh`
