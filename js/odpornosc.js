$(document).ready(function() {
    if($.browser.msie && $.browser.version.substr(0,1) < 7) {
        $('#tabs li ul.submenu li ul li a').prepend('- ');
        $('#footer ul li:not(:first-child)').prepend(' | ');
        $('#menu li:first-child, #menu li.selected + li').css('background-image', 'none');
        $('#popup h2 + *, #content h2 + *').css('margin-top', '-35px');
        $('img[src$=".png"]').not('img[src$="avatar.png"]').each(function() { $(this).width($(this).width()); $(this).height($(this).height()); $(this).css('filter', 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + $(this).attr('src') + '",sizingMethod="crop");'); $(this).attr('src', 'img/pix.gif'); });
        $('#mask').height($('#main').height());
        $('#popup').height($('#popup').height() - 1);
        $('#popup div.article').height($('#popup div.article').height() - 1);
        $('#menu li').mouseover(function(e) {
            $(this).addClass('hover');
        }).mouseout(function(e) {
            $(this).removeClass('hover');
        });
    }
    
    $('#tabs > li').mouseenter(function(e) {
        $(this).find('ul.submenu').show();
    }).mouseleave(function(e) {
        $(this).find('ul.submenu').hide();
    });

    var pos = 0;
    var len = $('#slider > ul.slides > li').length;
    var itimer = null
    var active = false;
    
    $('#slider > ul.slides').width(len * 454);
    $('#slider > a.next').bind('click', function(e) {
        e.preventDefault();
        if(active) return;
        active = true;
        if(itimer != null) {
            clearInterval(itimer);
        }
        $('#slider > ul.slides').animate({'margin-left': '-=454'}, 500, function() {
            li = $('#slider > ul.slides > li:first-child'); li.remove(); $('#slider > ul.slides').append(li);
            $('#slider > ul.slides').css('margin-left', '0px');
            itimer = setInterval(function() {
                $('#slider > a.next').click();
            }, 5000);
            active = false;
        }); 
        pos += pos == (len - 1) ? -(len - 1) : 1;
        $('#slider > div.slidespager > ul > li').removeClass('selected');
        $('#slider > div.slidespager > ul > li.slide' + pos.toString()).addClass('selected');
    });
    $('#slider > a.prev').bind('click', function(e) {
        e.preventDefault();
        if(active) return;
        active = true;
        if(itimer != null) {
            clearInterval(itimer);
        }
        li = $('#slider > ul.slides > li:last-child'); li.remove(); $('#slider > ul.slides').prepend(li);
        $('#slider > ul.slides').css('margin-left', '-454px');
        $('#slider > ul.slides').animate({'margin-left': '+=454'}, 500, function() {
            $('#slider > ul.slides').css('margin-left', '0px');
            itimer = setInterval(function() {
                $('#slider > a.next').click();
            }, 5000);
            active = false;
        }); 
        pos -= pos == 0 ? -(len - 1) : 1;
        $('#slider > div.slidespager > ul > li').removeClass('selected');
        $('#slider > div.slidespager > ul > li.slide' + pos.toString()).addClass('selected');
    });
    
    $('#slider > div.slidespager > ul > li > a').bind('click', function(e) {
        e.preventDefault();
        if(active) return;
        ds = parseInt($(this).parent().attr('class').replace(/[a-zA-Z]/g, ''));
        if(ds != pos) {
            if(itimer != null) {
                clearInterval(itimer);
            }
            if(ds < pos) {
                for(var i = 0; i < pos - ds; i++) {
                    li = $('#slider > ul.slides > li:last-child'); li.remove(); $('#slider > ul.slides').prepend(li);
                }
                $('#slider > ul.slides').css('margin-left', '-' + ((pos - ds) * 454).toString() + 'px');
            }
            $('#slider > ul.slides').animate({'margin-left': (ds > pos ? '-' : '+') + '=' + (Math.abs(ds - pos) * 454).toString()}, 500, function() {
                if(ds > pos) {
                    for(var i = 0; i < ds - pos; i++) {
                        li = $('#slider > ul.slides > li:first-child'); li.remove(); $('#slider > ul.slides').append(li);
                    }
                }
                $('#slider > ul.slides').css('margin-left', '0px');
                $('#slider > div.slidespager > ul > li').removeClass('selected');
                $('#slider > div.slidespager > ul > li.slide' + ds.toString()).addClass('selected');
                pos = ds;
                itimer = setInterval(function() {
                    $('#slider > a.next').click();
                }, 5000);
                active = false;
            }); 
            
        }
        console.log(ds);
    });

    
    itimer = setInterval(function() {
        $('#slider > a.next').click();
    }, 5000);

    $('#article-tabs ul.pager > li > a').click(function(e) {
        e.preventDefault();
        if(!$(this).parent().hasClass('selected')) {
            $(this).parent().parent().find('li').removeClass('selected');
            $('#article-tabs ul.pages > li:visible').fadeOut();
            $('#article-tabs ul.pages > li.' + $(this).parent().attr('class')).fadeIn();
            $(this).parent().addClass('selected');
        }
    });
    
    $('#article-tabs > ul.tabs > li > a').click(function(e) {
        e.preventDefault();
        $('#article-tabs > ul.tabs > li').removeClass('selected');
        $('#article-tabs > div').hide();
        $('#article-tabs > div.' + $(this).parent().attr('class')).show();
        $('#article-tabs ul.pages > li:visible').hide();
        $('#article-tabs ul.pages > li.' + $('#article-tabs > div.' + $(this).parent().attr('class') + ' ul.pager > li.selected').attr('class').replace(/\s*selected\s*/, '')).show();
        $(this).parent().addClass('selected');
    });

    $('dl.form > dt:not(.free) + dd > input[class^="text"], dl.form > dt:not(.free) + dd > textarea').blur(function(e) {
        if($(this).val() == '' || ($(this).attr('id').match(/^.?email$/) && !$(this).val().match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i))) {
            $(this).parent().addClass('invalid' + ($(this).is('textarea') ? '-textarea' : ''));
        } else {
            $(this).parent().removeClass('invalid').removeClass('invalid-textarea');
        }
    });
    
    $('form').submit(function(e) {
        var valid = true;
        $(this).find('dl.form > dt:not(.free) + dd > input[class^="text"], dl.form > dt:not(.free) + dd > textarea').each(function(i) {
            if($(this).val() == '' || ($(this).attr('id').match(/^.?email$/) && !$(this).val().match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i))) {
                valid = false;
            $(this).parent().addClass('invalid' + ($(this).is('textarea') ? '-textarea' : ''));
        } else {
            $(this).parent().removeClass('invalid').removeClass('invalid-textarea');
            }
        });
        if(!valid) {
            e.preventDefault();
        }
    });

    $('#popup a.close').click(function(e) {
        e.preventDefault();
        $('#popup').fadeOut(function() {
            $('#mask').hide();
        });
    });
    
    $('a.print').click(function(e) {
        e.preventDefault();
        $('body').addClass('print');
        $('#top #logo a').append($('<img src="img/logo.png" />'));
        window.print();
    });
    $(document).keyup(function(e) {
        if(e.keyCode == 27) {
            $('body.print').removeClass('print');
            $('#top #logo a img').remove();
        }
    });

    $('div.select > select').change(function() {
        $(this).parent().children('span').text($(this).children('option[value="' + $(this).val() + '"]').text());
    });
    $('div.select > select').change();

    $('div.article > h3 > a').mouseover(function(e) {
        $(this).parents('div.article').find('a.more').addClass('more-hover');
    }).mouseout(function(e) {
        $(this).parents('div.article').find('a.more').removeClass('more-hover');
    });

    $('div.article > p > a.more').mouseover(function(e) {
        $(this).parents('div.article').find('h3 > a').addClass('hover');
    }).mouseout(function(e) {
        $(this).parents('div.article').find('h3 > a').removeClass('hover');
    });
})
