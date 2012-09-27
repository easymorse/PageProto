/**
 * Created with JetBrains WebStorm.
 * User: jiangli
 * Date: 12-9-26
 * Time: 下午5:26
 * To change this template use File | Settings | File Templates.
 */

var proto = {

};

(function (proto) {

    var currentIndex = 0;
    var movelength = 0;
    var beginX;

    proto.HistoryListView = Backbone.View.extend({
        'tagName':'div',
        'id':'content',
        render:function () {
            var template = Handlebars.compile($('#history_list_template').html());
            $(template()).appendTo(this.$el);
            $("#app").append(this.el);
            $('#innerContent').css({
                "-webkit-transform-style":"preserve-3d",
                width:'6134px'
            });
            return this;
        },
        events:{
            'touchstart  ':'touchstartFunction',
            'touchmove  ':'touchmoveFunction',
            'touchend  ':'touchendFunction',
            'touchend #p1':'doSomeThing'
        },
        touchstartFunction:function (e) {
            e.preventDefault();
            movelength = 0;
            beginX = e.originalEvent.targetTouches[0].pageX;
        },
        touchmoveFunction:function (e) {
            e.preventDefault();
            movelength = e.originalEvent.targetTouches[0].pageX - beginX;
            var positionX = -currentIndex * 1023 + movelength;
            $("#innerContent").css({
                "-webkit-transform-style":"preserve-3d",
                '-webkit-transform':'translate3d(' + positionX + 'px,0px,0px)',
                '-webkit-transition-duration':'0s'
            });
        },
        touchendFunction:function (e) {
            e.preventDefault();
            if (Math.abs(movelength) > 1024 / 3) {
                if (movelength < 0) {
                    if (currentIndex < $("#innerContent").width() / 1024 - 1) {
                        currentIndex++;
                    }
                } else {
                    if (currentIndex > 0) {
                        currentIndex--;
                    }
                }
            }
            $('#innerContent').css({
                "-webkit-transform-style":"preserve-3d",
                "-webkit-transition-duration":"0.5s",
                "-webkit-transform":"translate3d(-" + (1023 * currentIndex) + "px,0,0px)"
            });
        },
        doSomeThing:function (e) {
            alert('touch end!');
            return false;
        }

    });
}(proto));
