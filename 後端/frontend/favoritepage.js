/* global axios */

const itemTemplate = document.querySelector("#favorite-book-template");
const bookList = document.querySelector("#favorite_books");

const instance = axios.create({
    baseURL: "http://localhost:8000/api",
  });
  
async function main() {
    
    try {
    
      // 抓書名
      const textValue = localStorage.getItem('storedText');
      console.log('textValue:', textValue);
    
      // 抓用戶
      const id = localStorage.getItem('ID');
      console.log('ID:', id);

      const members = await getMembers({"email":id});
      members.favorite.forEach((book) => renderFavorite(book))
    
    } catch (error) {
      alert("Failed to load Favorite books!");
      console.log(error);
    }
    
    $(document).ready(function() {
        // 为所有阅读按钮绑定点击事件
        $('ul').on('click', '.read-btn', function() {
            const bookTitle = $(this).siblings('p').text();
            localStorage.setItem('storedText', bookTitle);
            window.location.href = "./introduction.html"
        });
    
       
        $('ul').on('click', '.delete-btn', function() {
            // const names = document.querySelector("p.bookName");
            const bookTitle = $(this).siblings('p').text();
            const id = localStorage.getItem('ID');
            console.log(bookTitle)
            $(this).closest('li').remove();
            deleteMembersFav(id, bookTitle)
        });
    });

  }


// 抓取書本資訊
async function renderFavorite(books) {
    const item = itemTemplate.content.cloneNode(true);
    // const container = item.querySelector(".farvorite-book-list");

    favorBook = await getBooks({"name":books});
    
    // 圖片
    const coverImage = item.querySelector(".favorite-image");
    urlpic = "./image/" + favorBook.cover
    coverImage.src = urlpic;

    // 書名
    const names = item.querySelector("p.bookName");
    names.innerText = favorBook.name;

    // 加入前端List
    bookList.appendChild(item);
}


// 前端呼叫後端function
async function deleteMembersFav(userId, bookName) {
    const response = await instance.delete("/members/target", {
        data: {userId, bookName}});
    return response.data;
}

async function getMembers(id) {
    const response = await instance.get("/members/target", {params:id});
    return response.data;
}

async function getBooks(bookName) {
    const response = await instance.get("/books", {params:bookName});
    return response.data;
}

main();




