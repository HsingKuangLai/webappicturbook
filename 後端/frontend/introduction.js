/* global axios */

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

async function main() {
    setupEventListeners();
    try {
      // 抓書名
      const textValue = localStorage.getItem('storedText');
      // console.log(textValue);
      const books = await getBooks({"name":textValue});
      renderBook(books);
      $('.text').hide();
      $('.text').css('transform', 'translateX(0)').fadeIn(300);
    
    } catch (error) {
      console.log(error);
      $('.container').hide();
      Swal.fire({
        icon: 'error', // Set the icon (success, error, warning, info, question)
        title: 'Fail to Load the book！',
        showConfirmButton: true
        // timer: 3000
      });
    }
  }

// 設定EventListeners
async function setupEventListeners() {
    const startReadButton = document.querySelector("#StartReadingButton");    
    startReadButton.addEventListener("click", async () => {
      const book = localStorage.getItem('storedText');
      updateBookTimes(book);
      window.location.href = "./story.html"
  
    });

    // 判斷addButton愛心顏色
    addButton = document.getElementById('addFavoriteButton');
    const account = id;
    const bookName = textValue;
    const insideFav = await checkIfBookInFavorites({account, bookName});
    
    console.log(insideFav);
    if (insideFav){
      addButton.innerHTML = '<img src="./image/tofavorite.png">';
    } else {
      addButton.innerHTML = '<img src="./image/addfavorite.png">';
    }

    
    

    // addButton 點擊 function
    addButton = document.getElementById('addFavoriteButton');
    addButton.addEventListener("click", async () => {
      // Check if the book is already in favorites
      const account = id;
      const bookName = textValue;
      const isBookInFavorites = await checkIfBookInFavorites({account, bookName});
      // console.log(isBookInFavorites);
      if (!isBookInFavorites) {
          // If not, add it to favorites
          const back = await addFavorite(id, textValue);
          // console.log(back);
          Swal.fire({
              icon: 'success',
              title: 'Add Successfully!',
              showConfirmButton: false,
              timer: 1500
          });

          addButton.innerHTML = '<img src="./image/tofavorite.png">';
      } else {
          
          Swal.fire({
              icon: 'warning',
              title: 'Are you sure that you want to delete it? ',
              showConfirmButton: true,
              showCancelButton: true,
              confirmButtonText: 'Ok',
              cancelButtonText: 'Cancel' 

              // timer: 1500
          }).then(async (result) => {
            if (result.isConfirmed) {
              // If the book is already in favorites, remove it from favorites
              const removed = await deleteMembersFav(id, textValue);
              console.log(removed);
              // Change the image source after successful removal
               addButton.innerHTML = '<img src="./image/addfavorite.png">';
            }})
          
      }
    });

}



function renderBook(book) {
    // 書名
    const firstBook = book;
    const names = document.querySelector("#bookName");
    names.innerText = firstBook.name;

    // 作者
    const author = document.querySelector("#author");
    author.innerText = `${author.innerText} ${firstBook.author}`;

    // 譯者
    const translator = document.querySelector("#translator");
    translator.innerText = `${translator.innerText} ${firstBook.translator}`;

    // 繪者
    const painter = document.querySelector("#painter");
    painter.innerText = `${painter.innerText} ${firstBook.painter}`;

    // 出版社
    const publisher = document.querySelector("#publisher");
    publisher.innerText = `${publisher.innerText} ${firstBook.publisher}`;

    // 出版日期
    const publish_date = document.querySelector('#publish_date');
    publish_date.innerText = `${publish_date.innerText} ${firstBook.publish_date}`;

    // 類別
    const category = document.querySelector('#category');
    category.innerText = `${category.innerText} ${firstBook.category}`;

    // 瀏覽次數
    const times = document.querySelector('#times');
    times.innerText = `${times.innerText} ${firstBook.times} ${"次"}`;

    // 簡介
    const introduction = document.querySelector('#introduction');
    // console.log(firstBook.introduction)
    introduction.innerText = firstBook.introduction;

    // 圖片
    const coverImage = document.querySelector("#coverImage");
    urlpic = "./image/" + firstBook.cover
    coverImage.src = urlpic;

}

// 前端呼叫後端function
async function getBooks(bookName) {
  // console.log({params:bookName});
  const response = await instance.get("/books", {params:bookName});
  return response.data;
}

// addButton 顏色判斷
async function buttonColor(favBook){
    const response = await instance.get("/members/favorite", {params : favBook});
    return response.data;

}

async function checkIfBookInFavorites(favBook) {
  try {
      console.log("Checking favorites for member:", favBook);
      const response = await instance.get("/members/favorite", {params : favBook});
      console.log("Response from server:", response.data);

      return response.data;
  } catch (error) {
      // console.error("Check Favorites Error:", error);
      throw error;
  }
}

async function addFavorite(member, bookName){
    // req.userId = member;
    const response = await instance.put("/members", {"bookName":bookName, "userId":member});
    return response.data;
}

async function deleteMembersFav(userId, bookName) {
  const response = await instance.delete("/members/target", {
      data: {userId, bookName}});
  return response.data;
}

async function updateBookTimes(bookName) {
  const response = await instance.put("/books", {"name": bookName});
  return response.data;
}

//Retrieve the idValue from local storage
const textValue = localStorage.getItem('storedText');
console.log('Stored Text:', textValue);

const id = localStorage.getItem('ID');
console.log('ID:', id);

main();
  