(function(){
"use strict";

// テキストボックス、ボタン、結果表示、ツィート表示エリアのエレメントを取得
// 表示エリアは、htmlにあらかじめdivを作っておく
const userNameInput = document.getElementById("yourname");
const assesmentButton = document.getElementById("namesubmit");
const resultDivided = document.getElementById("result-area");
const tweetDivided = document.getElementById("tweet-area");



// 子要素を全て削除する関数を規定 
function removeAllChild (element){
while (element.firstChild){
    element.removeChild(element.firstChild);
}
}


// 回答リストを規定
const answer = [

 //constは一度入れたら変更できない変数

        '{userName}はネズミです',
        '{userName}は牛です',
        '{userName}はトラです',
        '{userName}はうさぎです',
        '{userName}は龍です',
        '{userName}は蛇です',
        '{userName}は馬です',
        '{userName}は羊です',
        '{userName}は猿です',
        '{userName}は鳥です',
        '{userName}は犬です',
        '{userName}は猪です'
];


//回答出し分けロジックを作成
// ユーザー名の文字コードを取得し、合計して、回答の種類で割る。
// それを配列で表示する。

function assesment (n){
    let sumOfCharCode = 0;

// letは{の中でだけ使えるので他に影響しづらい}
    
    for (let i = 0; i<n.length; i++){
        sumOfCharCode = sumOfCharCode + n.charCodeAt(i);
    }

    const index = sumOfCharCode % answer.length;
    let result = answer[index];

    result = result.replace(/\{userName\}/g, n);
    result = result.replace("です","だよ");
    
    // 正規表現というらしい

    return result;


}

// ボタンクリックで、
// １ 診断領域エリアに見出しを追加
// ２ assesmentメソッドに引数としてテキストボックスのvalueを渡し実行
// ３ 診断領域エリアに段落を追加し、メソッドの戻り値を追加

assesmentButton.onclick = () => {
        // () =>{}はアロー関数という
    const userName = userNameInput.value;
    if (userName.length === 0){
        return;
        // return; は、戻り値なしでそこで処理を終了させるという意味
    }
    console.log(userName);


removeAllChild(resultDivided);

const header = document.createElement("h3");
header.innerText = "診断結果"
resultDivided.appendChild(header);

const paragraph = document.createElement("p");
const result = assesment(userName);
paragraph.innerText = result;
resultDivided.appendChild(paragraph);

resultDivided.style = ("padding:10px; border-radius:5px;")

// Twitterのaタグの内容を分解し、createElementとsetAttributeを使って構成
removeAllChild(tweetDivided);
const anchor = document.createElement("a");
const hrefValue = "https://twitter.com/intent/tweet?button_hashtag=" + encodeURIComponent("あなたの裏十二支は？") + "&ref_src=twsrc%5Etfw";
anchor.setAttribute("href", hrefValue);
anchor.className = "twitter-hashtag-button"
anchor.setAttribute("data-text", result);
anchor.innerText = "Tweet #裏十二支"
tweetDivided.appendChild(anchor);

//Twitterのスクリプトをロード
twttr.widgets.load();

tweetDivided.style = ("margin-top:15px;")
};

userNameInput.onkeydown = (event)=> {
    if (event.key === "Enter"){
        assesmentButton.onclick();
    }
}

})();




