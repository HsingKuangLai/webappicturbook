/* global axios */

const itemTemplate = document.querySelector("#homepage-book-template");
const bookList = document.querySelector(".image-grid");

const instance = axios.create({
    baseURL: "http://localhost:8000/api",
  });
  
async function main() {
    
    try {
    
      Books = await getAllBooks();
      Books.forEach((book) => renderAllBooks(book));
      // bookList.innerHTML = "";
    
    } catch (error) {
      alert("Failed to load books!");
      console.log(error);
    }
    
    $(document).ready(function() {
        $('.image-grid').on('click', '.introduction-page', function() {
            const bookTitle = $(this).find('span').text();
            localStorage.setItem('storedText', bookTitle);
            window.location.href = "./introduction.html"
        });

        $('.themeicon').on('click', async function() {
          const bookCategory = $(this).attr('id');
          const headText = document.querySelector("#headText");
          headText.innerText = bookCategory

          Books = await getCategoryBooks({"category":bookCategory});
          bookList.innerHTML = ""
          Books.forEach((book) => renderAllBooks(book));
          
        });

        $('#search-box').on('keyup', async function(event) {
          try {
    
            if (event.key === 'Enter') {
              const textInput = document.querySelector("#search-box");
              const text = textInput.value;
              if (!text) {
                alert("Please enter word!");
                return;
              }
              Books = await getSearchBooks({"name":text})
              
              bookList.innerHTML = ""
              Books.forEach((book) => renderAllBooks(book));
              if(Books.length === 0){
                // bugs 是警告視窗會先跳，原本的頁面才刪除
                alert("No book Found！")
                return;
              }
            }
          
          } catch (error) {
            alert("Failed to Search books!");
            console.log(error);
          }
        });


    });

  }



// 抓取書本資訊
async function renderAllBooks(books) {
    const item = itemTemplate.content.cloneNode(true);
    // 圖片
    const coverImage = item.querySelector(".book-image");
    urlpic = "./image/" + books.cover
    coverImage.src = urlpic;

    // 書名
    const names = item.querySelector("span.book-series");
    names.innerText = books.name;

    // 作者
    const author = item.querySelector(".author-name");
    author.innerText = books.author;

    // 類別
    const category = item.querySelector("span.genre");
    category.innerText = books.category;

    // 瀏覽次數
    const times = item.querySelector("span.times");
    times.innerText = `${times.innerText} ${books.times}`;

    // 加入前端List
    bookList.appendChild(item);
}


// 前端呼叫後端function
async function getAllBooks() {
    const response = await instance.get("/books/all");
    return response.data;
}

async function getCategoryBooks(category) {
    // console.log({params:category})
    const response = await instance.get("/books/category", {params:category});
    return response.data;
}

async function getSearchBooks(name) {
  // console.log({params:category})
  const response = await instance.get("/books/search", {params:name});
  return response.data;
}

main();






