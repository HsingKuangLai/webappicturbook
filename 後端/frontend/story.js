

$(document).ready(function() {
    var currentPage = 1;

    // 上一頁按鈕點擊事件
    $('#prev-btn').on('click', function() {
        console.log('上一頁按鈕被點擊');
        if (currentPage > 1) {
            currentPage--;
            slideBook();
        }
    });

    // 下一頁按鈕點擊事件
    $('#next-btn').on('click', function() {
        console.log('下一頁按鈕被點擊');
        if (currentPage < $('.page').length) {
            currentPage++;
            slideBook();
        }
        
        if (currentPage == $('.page').length){
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