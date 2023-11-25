// favoritepage.js

$(document).ready(function() {
    // 获取顾客的书单数据（假设这里使用了异步请求，比如Ajax）
    // 你需要根据你的实际情况来获取书单数据
    $.ajax({
        url: 'url/to/get/customer/books', // 替换成实际的后端接口
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            // 根据获取到的书单数据动态生成图书列表
            generateBookList(data.books);
        },
        error: function(error) {
            console.error('Failed to get customer books:', error);
        }
    });

    // 生成图书列表的函数
    function generateBookList(books) {
        const taskList = $('#taskList');

        // 清空当前列表
        taskList.empty();

        // 遍历书单数据，为每本书生成一个列表项
        books.forEach(function(book) {
            const li = $('<li>').append(`
            <li>
                <div class="favorite-book">
                    <img src="./image/cover_Image1.png" alt="Image 1">
                </div>
                <div class="text-box">
                    <p>新動物慾言繪本系列2吵架的松鼠</p>
                    <button class="read-btn">Read</button>
                    <button class="delete-btn">Unlike</button>
                </div>
            </li>
            `).appendTo(taskList);

            li.find('.read-btn').on('click', function() {
                // 在这里执行跳转到书籍详情页面的操作
                window.location.href = 'book-details.html?title=' + encodeURIComponent(book.title) + '&image=' + encodeURIComponent(book.image);
            });

            li.find('.delete-btn').on('click', function() {
                // 在这里执行删除书籍的操作
                li.remove(); // 也可以发送请求到服务器删除书籍
            });
        });
    }
});
