/**
 * Created by Administrator on 2017/2/16.
 */
var chooseDate = {
        API: {
            getDate: 'mock.json'
        },
        init: function () {
            this.render();
            this.bind()
        },
        render: function () {
            //渲染日历
            var _this = this, goodsid = 1;
            $.ajax({
                url: _this.API.getDate,
                type: 'GET',
                dataType: 'json',
                data: {
                    id: goodsid
                }
            }).done(function (data) {
                    var code = data.code, dateData = data.data, monthStr = '';
                    if (code == 200) {
                        for (var i = 0; i < dateData.length; i++) {
                            var dateStr = '';
                            var monthData = dateData[i];
                            var firstDay = new Date(monthData[0].Date),
                                firstDayInYear = firstDay.getFullYear(),
                                firstDayInMonth = firstDay.getMonth() + 1,
                                firstDayInWeek = firstDay.getDay(),
                                firstDayInDate = firstDay.getDate();
                            var rows = Math.ceil((monthData.length + firstDayInWeek) / 7);

                            for (var j = 0; j < rows; j++) {
                                var dayStr = '', date_str, index, dayItem;
                                for (k = 0; k < 7; k++) {
                                    var idx = j * 7 + k;
                                    if (monthData.length < 7) {
                                        if( j == 0){
                                            date_str = firstDayInDate - firstDayInWeek + k;
                                        }else{

                                        }
                                    } else {
                                        date_str = idx - firstDayInDate - 1 ;
                                    }
                                    //计算日期
                                    if (date_str < firstDayInDate || date_str >= firstDayInDate + monthData.length) {
                                        dayStr += '<td>&nbsp</td>'
                                    } else {
                                        index = date_str - firstDayInDate;
                                        dayItem = monthData[index];

                                        dayStr += '<td>' +
                                            '<div class="aligning">' +
                                            '<div class="monthDay">' + new Date(dayItem.Date).getDate() + '</div>' +
                                            '<div class="monthPrice">¥' + dayItem.Price + '</div>' +
                                            '</div>' +
                                            '</td>'

                                    }
                                }
                                dateStr +=
                                    '<tr>' + dayStr + '</tr>'
                            }

                            monthStr +=
                                '<table class="mouthWrap">' +
                                '<caption class="monthTitle">' + firstDayInYear + '年' + firstDayInMonth + '月</caption>' +
                                dateStr +
                                '</table>'
                        }
                        $('.popBody').append(monthStr)
                    }
                }
            )
        },
        bind: function () {
            var $datePop = $('.datePop'),
                $popContent = $datePop.find('.popContent'),
                $popHeader = $popContent.find('.popHeader'),
                $popBody = $popContent.find('.popBody');
            $('.chooseDate').on('click', function () {
                $datePop.show(); //动画？？？
            });
            $datePop.on('click', '.popMask', function () {
                $datePop.hide()
            });
            $popBody.on('click', '.mouthWrap td', function () {
                var thisEl = $(this),
                    $chooseStart = $popBody.find('.chooseStart'),
                    $chooseEnd = $popBody.find('.chooseEnd');
                var $dateHint = $popHeader.find('.dateHint'),
                    $dateSure = $popHeader.find('.dateSure'),
                    $thisElPrice = thisEl.find('.monthPrice');
                if (!thisEl.hasClass('roomful')) {
                    if ($chooseStart.length == 0 && $chooseEnd.length == 0) {
                        thisEl.addClass('chooseStart');
                        $dateHint.text('选择离店日期');
                        $thisElPrice.text('入店')
                    } else if ($chooseStart.length != 0 && $chooseEnd.length == 0) {
                        //最小入住1天，最大入住30天
                        //$chooseEnd-$chooseStart  注意日期格式怎么减

                        thisEl.addClass('chooseEnd');
                        $thisElPrice.text('离店');
                        $dateSure.show()
                    }
                }

            });
            $popHeader.on('click', '.dateSure', function () {
                //调取接口，返回相应的日期数据,显示在页面上
                $.ajax({}).done(function () {

                });
                $datePop.hide()
            })
        }
    }
    ;
chooseDate.init();
