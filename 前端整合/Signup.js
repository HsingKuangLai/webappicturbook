var db,str;
$(document).ready(function () {
	window.indexedDB = window.indexedDB || window.mozIndexedDB || 	window.webkitIndexedDB || window.msIndexedDB;
	if (!window.indexedDB) {
	    alert("您的瀏覽器不支援indexedDB");
	}
	//開啟資料庫
    var req = window.indexedDB.open("Member");
    req.onsuccess = function (e) {
		db = this.result;
		str="MyDatabaseA 建立完成"
				+ " >狀態：" + this.readyState
				+ " >版本：" + db.version
				+ "<br>";
		//  $("div").html(str);
         console.log("in");
    };
    req.onerror = function (e) {    
	   $("div").html("開啟資料庫錯誤:"+e.target.errorCode);
    };
	//onupgradeneeded事件
    req.onupgradeneeded = function(e) { 
	  //建立objectStore
	  var objectStore = e.target.result.createObjectStore("member", { keyPath: "user_id" });
	  objectStore.createIndex("user_id", "user_id", { unique: false });
      objectStore.createIndex("email", "email", { unique: false });
      objectStore.createIndex("password", "password", { unique: false });
      objectStore.createIndex("creditCard_num", "creditCard_num", { unique: false });	  
	};
	$("#signupButton").click(function(){ //signupButton
		add_click('add');
	});
	// $("#putbtn").click(function(){
	// 	add_click('put');
	// });
})


// 刪除資料庫
// indexedDB.deleteDatabase("databaseName")

//新增資料
function add_click(add_way){
	str="";
	var transaction = db.transaction("member", "readwrite");
	transaction.oncomplete = function(e) {
		str+="交易成功<br>";
		$("div").html(str);
	};
	transaction.onerror = function(e) {$("div").html("交易失敗");};
	store = transaction.objectStore("member");

	if(add_way=="add")
		request = store.add({user_id: $("#user_id").val(), email: $("#email").val(), password: $("#password").val(), creditCard_num: $("#creditCard_num").val()});
	else
		request = store.put({user_id: $("#user_id").val(), name: $("#name").val()});

	request.onsuccess = function (e){
		str+="新增資料成功<br>";
		console.log(str);
	}
	request.onerror = function (e){
		console.log("新增資料失敗:"+e.target.error);
	}
}
