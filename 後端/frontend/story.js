/* global axios */
const itemTemplate = document.querySelector("#story-template");
const StoryList = document.querySelector("#storys");

const instance = axios.create({
    baseURL: "http://localhost:8000/api",
  });
  

$(document).ready(async function() {

    try {
        // 抓書名
        const textValue = localStorage.getItem('storedText');
        console.log(textValue);
        const books = await getBooks({"name":textValue});

        console.log(books.content)
        books.content.forEach((page) => renderstory(page));


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

    var currentPage = 1;
    // Logout Button Click Event
    $('#logout-btn').on('click', function() {
        Swal.fire({
            title: 'Logout',
            text: 'Are you sure you want to logout?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, logout',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                window.location.href = './homepage_before_login.html'; // Redirect to logout page
            }
        });
       });

    
    // home-btn 超連結
    $('#home-btn').on('click', function() {
        window.location.href = './homepage.html';
        localStorage.removeItem('homepageCategory');

    });

    // favorite-btn 超連結
    $('#favorite-btn').on('click', function() {
        window.location.href = './favoritepage.html';
        localStorage.removeItem('homepageCategory');

    });   


    // introduction-btn 超連結
    $('#introduction-btn').on('click', function() {
        window.location.href = './introduction.html';
        localStorage.removeItem('homepageCategory');
    
    });  

       
    // 上一頁按鈕點擊事件
    $('#prev-btn').on('click', function() {
        // console.log('上一頁按鈕被點擊');
        if (currentPage > 1) {
            currentPage--;
            slideBook();
        }
        else if (currentPage === 1){
            Swal.fire({
                icon: 'warning', // Set the icon (success, error, warning, info, question)
                title: "It's the first page!",
                showConfirmButton: true               
              });
        }
    });

    // 下一頁按鈕點擊事件
    $('#next-btn').on('click', function() {
        // console.log('下一頁按鈕被點擊');
        if (currentPage < $('.page').length) {
            currentPage++;
            slideBook();
        }
        
        else if (currentPage == $('.page').length){
            Swal.fire({
                icon: 'warning', // Set the icon (success, error, warning, info, question)
                title: 'It\'s the last page! \nThanks for reading~',
                showConfirmButton: true
                // timer: 3000
              });
        }

    });

    function slideBook() {
        var slideAmount = -(currentPage - 1) * 100; // 計算滑動的距離
        console.log('slideAmount:', slideAmount);
        $('.story').animate({
            'margin-left': slideAmount + '%'
        }, 500); // 1000 表示滑動的時間，以毫秒為單位
        
    }
});


async function getstory(name) {
    // console.log({params:category})
    const response = await instance.get("/books/story", {params:name});
    return response.data;
  }



// 抓取書本資訊
async function renderstory(page) {
    const item = itemTemplate.content.cloneNode(true);
    // 圖片
    const storyImage = item.querySelector(".story-image");
    console.log(page)
    urlpic = "./story/" + page
    console.log(urlpic)
    storyImage.src = urlpic;

    // 加入前端List
    StoryList.appendChild(item);
    
}




  // 前端呼叫後端function
async function getBooks(bookName) {
  // console.log({params:bookName});
  const response = await instance.get("/books", {params:bookName});
  return response.data;
}


