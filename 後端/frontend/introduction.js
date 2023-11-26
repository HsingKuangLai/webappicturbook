/* global axios */

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

async function main() {
    setupEventListeners();
    try {
    // 抓書名
      const textValue = localStorage.getItem('storedText');
      const books = await getBooks({"name":textValue});
      renderBook(books);
    
    } catch (error) {
      alert("Failed to load books!");
    }
  }

// 設定EventListeners
function setupEventListeners() {
    const startReadButton = document.querySelector("#StartReadingButton");    
    startReadButton.addEventListener("click", async () => {
      const book = localStorage.getItem('storedText');
      updateBookTimes(book);
      window.location.href = "./story.html"
  
    });

    addButton = document.getElementById('addFavoriteButton');
    addButton.addEventListener("click", async() => {
    await addFavorite(id, textValue)
    alert("Add Successfully！")
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
    times.innerText = `${times.innerText} ${firstBook.times}`;

    // 簡介
    const introduction = document.querySelector('#introduction');
    // console.log(firstBook.introduction)
    introduction.innerText = firstBook.introduction;

    // 圖片
    const coverImage = document.querySelector("#coverImage");
    urlpic = "./image/" + firstBook.cover
    coverImage.src = urlpic;

}


//Retrieve the idValue from local storage
const textValue = localStorage.getItem('storedText');
console.log('Stored Text:', textValue);

const id = localStorage.getItem('ID');
console.log('ID:', id);


// 前端呼叫後端function
async function getBooks(bookName) {
    // console.log({params:bookName});
    const response = await instance.get("/books", {params:bookName});
    return response.data;
}

async function addFavorite(member, bookName){
    // req.userId = member;
    const response = await instance.put("/members", {"bookName":bookName, "userId":member});
    return response.data;
}

async function updateBookTimes(bookName) {
  const response = await instance.put("/books", {"name": bookName});
  return response.data;
}

main();
  