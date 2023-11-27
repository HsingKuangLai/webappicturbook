$(document).ready(function () {
    var currentPage = 1;

    // 上一頁按鈕點擊事件
    $('#prev-btn').on('click', function () {
        console.log('上一頁按鈕被點擊');
        if (currentPage > 1) {
            currentPage--;
            slideBook();
        }
    });

    // 下一頁按鈕點擊事件
    $('#next-btn').on('click', function () {
        console.log('下一頁按鈕被點擊');
        var totalBooks = $('.book').length;
        var booksPerPage = 5;
        var totalPages = Math.ceil(totalBooks / booksPerPage);

        if (currentPage < totalPages) {
            currentPage++;
            slideBook();
        }
    });

    function slideBook() {
        var booksPerPage = 5;
        var startBook = (currentPage - 1) * booksPerPage;
        var endBook = startBook + booksPerPage;


        // 隐藏所有书籍
        $('.book').hide();

        // 只显示 startBook 到 endBook 之间的书籍
        $('.book').slice(startBook, endBook).show();
    }

    // 页面加载时执行一次
    slideBook();
});

