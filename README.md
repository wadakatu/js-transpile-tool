[1]:https://qiita.com/wadakatu/items/d988a3c59a2a17a0c1f3

# JS-Build-Tool
[こちら][1]で作成したJSのトランスパイルツールをGitHub上に配置しました。<br>
その使い方について説明していきます。

## 前提条件
node.jsがインストールされていること。
もし、まだの方は[この記事][1]を参考にしてください。

## 手順

### 1. ローカルに「js-build-tool」をクローン

```terminal
git clone https://github.com/wadakatu/js-build-tool.git
```

クローン終了後、js-build-toolのディレクトリが存在していればOKです。

### 2. ディレクトリ移動

以降の作業は、全て「js-transpile-tool」ディレクトリ内で行います。

```terminal
cd js-transpile-tool
```

### 3. 必要なモジュールをインストール

```terminal
npm install
```

### 4. トランスパイルしたいJSファイルを設置

srcフォルダの中にトランパイルしたいJSファイルを設置してください。<br>
ファイルの数は、単数でも複数でも大丈夫です。

### 5. トランスパイル実行

以下のコマンドでトランパイルが実行できます。

```terminal
npm run build -- --env filename=bundle
```

やっていることは下記の通りです。
1. ESLintでJS構文チェック
2. 構文にエラーがなければ、ES5にトランスパイル
3. トランスパイルしたファイルをdistフォルダに出力

構文チェックでエラーがあった場合は、処理が中断されます。（トランスパイル後のJSファイルは生成されない)

ファイル名は、任意の値に変更してください。
拡張子は必要ないです。

### 6. 出力JSファイル確認

distフォルダ内に、JSファイルが１つ作成されていればOKです。

ファイル名は、先ほどトランスパイル実行時に入力した値。（今回だとbundle.js）

この作成されたファイルを任意プロジェクトの任意ディレクトリ配下に設置してください。<br>
あとは、htmlファイルにそのJSファイルを読み込むScriptタグを書けば完了です。

## Webpack, ESLint, Babelが初めての方

 初めての方向けに、テスト用JSファイルを用意してあります。<br>
 フォルダ構成：js-transpile-tool/test/src <-- トランスパイル前<br>
 　　　　　　　js-transpile-tool/test/dist <-- トランスパイル後
        
### JSファイル確認

js-transpile-tool/test/src直下には、「app.js」と「cats.js」が配置されています。<br>
これらは、cats.jsで定義した配列の内容をapp.jsで読み込んで、<br>
コンソール上に出力するというシンプルなJSです。

```terminal
node app.js
```

```terminal
[‘tama’, ‘kuro’, ‘tora’]
```

上記のように出力されるはずです。

今回は、この２つのファイルをトランスパイルし１つにまとめてみましょう。

トランスパイル前とトランスパイル後で、出力内容が一致すればOKです。

#### cats.jsのみESLintのチェックでエラーが出るようにしています。

### npm run / ESLint Error

それではトランスパイルを実行してみましょう。

```terminal
npm run test -- --env filename=hogehoge
```

下記のようなエラーが出ると思います。

```terminal
$ npm run test -- --env filename=hogehoge

> js-build-tool@1.0.0 test
> eslint --no-eslintrc --c .test-eslint.json ./test/src/*.js && webpack --config=webpack.config.test.js “--env” “filename=hogehoge”

/Users/hogehoge/js-build-tool/js-transpile-tool/test/src/cats.js
  1:45  error  Missing semicolon  semi
×: 1 problem (1 error, 0 warnings)
  1 error and 0 warnings potentially fixable with the `--fix` option.
```

このエラーは、「末尾のセミコロンがない」ことが原因です。

### セミコロン追加

cats.js内のコード末尾にセミコロンを追加しましょう。
```javascript:cats.js
export const cats = [‘tama’, ‘kuro’, ‘tora’];
```

### npm run / Success

```terminal
npm run test -- --env filename=hogehoge
```

下記のような表示が出て、トランスパイルが成功します。

```terminal
$ npm run test -- --env filename=hogehoge

> js-build-tool@1.0.0 test
> eslint --no-eslintrc --c .test-eslint.json ./test/src/*.js && webpack --config=webpack.config.test.js “--env” “filename=hogehoge”

asset hogehoge.js 480 bytes [emitted] [minimized] (name: main)
runtime modules 416 bytes 2 modules
cacheable modules 95 bytes
  ./test/src/app.js 52 bytes [built] [code generated]
  ./test/src/cats.js 43 bytes [built] [code generated]
webpack 5.45.1 compiled successfully in 767 ms
```

### 出力されたJSファイルの表示確認

test/distフォルダ直下に移動して、トランスパイル後のJSファイルを実行してみましょう。

```terminal
//フォルダ移動
cd test/dist

//JSファイル実行
node hogehoge.js
```

トランスパイル前と出力内容が一致すれば成功です。

```terminal
[‘tama’, ‘kuro’, ‘tora’]
```
