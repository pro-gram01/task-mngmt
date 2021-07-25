(function () {
  "use strict";
  // two way data binding (to UI) = dataとUIを結びつけること

  var vm = new Vue({
    // どの領域と結びつけるかelements = el
    el: '#app',
    // dataというキーを指定
    data: {
      newItem: "",
      todos: [],
      message: 'Please enter the task.'
    },

    watch: {
      todos: {
        handler: function() {
          // todo配列に変更があった際、todosというキーでtodoの値をJSON形式して保存する
          localStorage.setItem('todos', JSON.stringify(this.todos));
          // alert('Data saved!');
        },   
        deep: true
      }
    },

    mounted: function () {
      // localStorageからtodosのキーでデータを取得する(JSONデータをを読み込む),JSON.parseができない場合は、空の配列にする
      this.todos = JSON.parse(localStorage.getItem("todos")) || [];
    },

    methods: {
      addItem: function () {
        
        if (!this.newItem) {
          // テキストボックスが未入力の場合は通過せずreturn
          return;
        }
          var item = {
            // newItemをtitle、isDoneはfalseに設定
            title: this.newItem,
            isDone: false,
          };
        // newItemに追加された内容がtodosの末尾に追加される
        // 結果としてli要素として反映される
        this.todos.push(item);
        // アイテム追加後は入力欄を空にする
        this.newItem = "";
      },

      // index番目のアイテムを削除したいためindexを引数で受け取る
      deleteItem: function (index) {
        // 削除の前に確認メッセージを表示する
        if (confirm("Do you really want to delete this task?")) {
          // index番目から1個削除する
          this.todos.splice(index, 1);
        }
        // タスクが0になったら"Congratulations!"と表示する
        if (todos.length === 0) {
          console.log('Congratulations!');
        }
      },

      // purgeボタンメソッド
      purge: function () {
        // 終了したタスクを消す前に確認メッセージを表示する
        if (!confirm("Do you really want to delete this?")) {
          // キャンセルされたときはreturnし、それ以降は何もしない
          return;
        }
        // OKが押されたら、this.todosにはremainingを割り当てる
        this.todos = this.remaining;
        // タスクが0になったら"Congratulations!"と表示する
        if (remaining.length === 0) {
          console.log("Congratulations!");
        }
      },
    },

    // データから自動的にプロパティを計算してくれる、算出プロパティを使用
    computed: {
      remaining: function () {
        // filterはある配列から指定のデータを抽出する際に用いる
        return this.todos.filter(function (todo) {
          // todos配列の中でidDone=falseのものだけを返す
          return !todo.isDone;          
        });
      },
    },
  });
})();
