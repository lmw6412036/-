/**
 * Created by Admin on 2016/8/17.
 */
// 所有模块都通过 define 来定义
define('app', [
        'news/list'
    ],
    function (require, exports, module) {
        $(function () {
            //首页ctrl
            $(document).on('pageInit','#index',function (e,id,page) {

            });
            
            //新闻列表页ctrl
            require('news/list');

            $.init();
        });
    });