/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
    var order_list;
    $('.page1 #serverip').change(function () {
        serverip = $('.page1 #serverip').val();
    });
    $('.page1 .btn').click(function () {
        $('.page1').fadeOut(function () {
            $('.page2').fadeIn();
        });
        if (!$('.page1 #serverip').val())
            serverip = 'http://192.168.16.100';
        $.ajax({
            type: "POST",
            dataType: "json",
            url: serverip + "/cms/olishop_ajax/test",
            async: false

        }).done(function (msg) {
            //$('#jsonresult').text(msg[1].id_order);
            order_list = msg;
            var html = "";
            $.each(order_list, function (key, val) {
                html += '<div class="order_row row">';
                $.each(val, function (key, value) {
                    html += '<div class="o_' + key + '">' + value + '</div>';
                });
                html += '</div>';
            });

            $('#order_list').append(html);
            $('#order_list .order_row').each(function () {
                $(this).append('<span class="o_details" order="' + $(this).find('.o_order_id').text() + '"></a>');
            });
        });

        $('.page2 .o_details').click(function () {
            var id=$(this).attr('order');
            $('.page2').fadeOut(function () {
                $('.page3').fadeIn();
            });

            $.ajax({
                type: "POST",
                dataType: "json",
                url: serverip + "/cms/olishop_ajax/test2/" + id,
                async: false

            }).done(function (msg2) {
                order_list = msg2;
                var html = '<div class="order_details_'+id+'">';
                $.each(order_list, function (key, val) {
                    html += '<div class="o_' + key + '">' + val + '</div>';
                });
                html += '</div>';
                $('#order_detail').append(html);
            });

        });




    });
});