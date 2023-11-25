$(document).ready(function() {
    // 为所有阅读按钮绑定点击事件
    $('.read-btn').on('click', function() {
        // 获取当前书籍的信息（例如标题、图片等）
        const bookTitle = $(this).siblings('p').text();
        const bookImage = $(this).siblings('img').attr('src');

        // 在这里执行跳转到另一个页面的操作，可以使用 window.location.href
        // 例如，跳转到书籍详情页面，将书籍信息传递给新页面
        // window.location.href = 'book-details.html?title=' + encodeURIComponent(bookTitle) + '&image=' + encodeURIComponent(bookImage);
        window.location.href = "./introduction.html"
    });

    // 为所有删除按钮绑定点击事件
    $('.delete-btn').on('click', function() {
        // 获取当前要删除的书籍的信息（例如标题、图片等）
        const bookTitle = $(this).siblings('p').text();
        const bookImage = $(this).siblings('img').attr('src');

        // 在这里执行删除书籍的操作，可以使用 li.remove() 将该书籍从列表中移除
        // 你也可以在这里发送请求到服务器，告知服务器删除该书籍的信息
        $(this).closest('li').remove();
    });
});