let idPos = 0
$(".tag-group").each(function(i, obj) {
    $(this).find(".tag").each(function() {
        idPos = idPos + 1
        $(this).attr("data-pos", idPos)
    })
    idPos = -1
});

$(".color").each(function(i, obj) {  
    $(this).css("background-color", ("#"+($(this).attr("data-color"))))
    $(this).addClass($(this).attr("data-size"))
});
$(".card").each(function(i, obj) {
    if (localStorage.getItem($(this).attr("data-id")) == "true") {
        $(this).attr("data-bookmark", "true")
        $(this).addClass("selected")
    } else {
        $(this).attr("data-bookmark", "false")
        $(this).removeClass("selected")
    }
});

$(".card").each(function(i, obj) {
    if (!($(this).hasClass("selected"))) {
        $(this).find(".card-bookmark span").text("Add")
        $(this).find(".card-bookmark img").attr("src", "assets/icons/bright/add.svg")
    }
    if (!(window.matchMedia("(hover: none)").matches)) {
        if ($(this).hasClass("selected")) {
            $(this).find(".card-bookmark").css("opacity", "1")
            $(this).find(".card-bookmark").addClass("text-color-muted")
            $(this).find(".card-bookmark span").text("Added")
            $(this).find(".card-bookmark img").attr('src', "assets/icons/muted/check.svg")
        }
    } else {
        if ($(this).hasClass("selected")) {
            $(this).find(".card-bookmark span").text("Remove")
            $(this).find(".card-bookmark img").attr('src', "assets/icons/bright/remove.svg")
        }
    }
});

$(".card").click(function () {
    const id = $(this).attr("data-id")
    if (!($(this).hasClass("selected"))) {
        $('.card[data-id="'+ id +'"] .card-bookmark span').animate({'opacity': 0}, 150, function () {
            $(this).text("Remove")
        }).animate({'opacity': 1}, 150)
        $('.card[data-id="'+ id +'"] .card-bookmark img').animate({'opacity': 0}, 150, function () {
            $(this).attr("src", "assets/icons/bright/remove.svg")
        }).animate({'opacity': 1}, 150)
    } else {
        $('.card[data-id="'+ id +'"] .card-bookmark span').animate({'opacity': 0}, 150, function () {
            $(this).text("Add")
        }).animate({'opacity': 1}, 150)
        $('.card[data-id="'+ id +'"] .card-bookmark img').animate({'opacity': 0}, 150, function () {
            $(this).attr("src", "assets/icons/bright/add.svg")
        }).animate({'opacity': 1}, 150)
    }
});

$(".card").hover(function () {
    const id = $(this).attr("data-id")
    $('.card[data-id="'+ id +'"] .card-bookmark').css("opacity", "1")
    $('.card[data-id="'+ id +'"] .card-bookmark').removeClass("text-color-muted")
    if ($(this).hasClass("selected")) {
        $('.card[data-id="'+ id +'"] .card-bookmark span').text("Remove")
        $('.card[data-id="'+ id +'"] .card-bookmark img').attr("src", "assets/icons/bright/remove.svg")
    }
    if (($("#bookmarks").hasClass("active"))) {
        $('.card[data-id="'+ id +'"]').removeClass("border-hide")
        $(".selected").removeClass("transition-hide")
        $(".selected .card-bookmark").removeClass("transition-hide")
    }
}, function () {
    const id = $(this).attr("data-id")
    if (!($("#bookmarks").hasClass("active")) && $(this).hasClass("selected")) {
        $('.card[data-id="'+ id +'"] .card-bookmark').addClass("text-color-muted")
        $('.card[data-id="'+ id +'"] .card-bookmark span').text("Added")
        $('.card[data-id="'+ id +'"] .card-bookmark img').attr("src", "assets/icons/muted/check.svg")
    } else {
        $('.card[data-id="'+ id +'"] .card-bookmark').css("opacity", "0")
    }
    if ($("#bookmarks").hasClass("active")) {
        $('.card[data-id="'+ id +'"]').addClass("border-hide")
        $('.card[data-id="'+ id +'"] .card-bookmark').css("opacity", "0")
        $(".selected").removeClass("transition-hide")
        $(".selected .card-bookmark").removeClass("transition-hide")
    }
});

$(".card").focusin(function () {
    if (!(window.matchMedia("(hover: none)").matches)) {
        const id = $(this).attr("data-id")
        if (!($(".color").is(":focus"))) {
            $('.card[data-id="'+ id +'"] .card-bookmark').css("opacity", "1")
            $('.card[data-id="'+ id +'"] .card-bookmark').removeClass("text-color-muted")
            if ($(this).hasClass("selected")) {
                $('.card[data-id="'+ id +'"] .card-bookmark span').text("Remove")
                $('.card[data-id="'+ id +'"] .card-bookmark img').attr("src", "assets/icons/bright/remove.svg")
            }
            if (($("#bookmarks").hasClass("active"))) {
                $('.card[data-id="'+ id +'"]').removeClass("border-hide")
                $(".selected").removeClass("transition-hide")
                $(".selected .card-bookmark").removeClass("transition-hide")
            }
        } else {
            if (!($("#bookmarks").hasClass("active")) && $(this).hasClass("selected")) {
                $('.card[data-id="'+ id +'"] .card-bookmark').addClass("text-color-muted")
                $('.card[data-id="'+ id +'"] .card-bookmark span').text("Added")
                $('.card[data-id="'+ id +'"] .card-bookmark img').attr("src", "assets/icons/muted/check.svg")
            } else {
                $('.card[data-id="'+ id +'"] .card-bookmark').css("opacity", "0")
            }
        }
    }
});

$(".card").focusout( function () {
    if (!(window.matchMedia("(hover: none)").matches)) {
        const id = $(this).attr("data-id")
        if (!($("#bookmarks").hasClass("active")) && $(this).hasClass("selected")) {
            $('.card[data-id="'+ id +'"] .card-bookmark').addClass("text-color-muted")
            $('.card[data-id="'+ id +'"] .card-bookmark span').text("Added")
            $('.card[data-id="'+ id +'"] .card-bookmark img').attr("src", "assets/icons/muted/check.svg")
        } else {
            $('.card[data-id="'+ id +'"] .card-bookmark').css("opacity", "0")
        }
        if ($("#bookmarks").hasClass("active")) {
            $('.card[data-id="'+ id +'"]').addClass("border-hide")
            $('.card[data-id="'+ id +'"] .card-bookmark').css("opacity", "0")
            $(".selected").removeClass("transition-hide")
            $(".selected .card-bookmark").removeClass("transition-hide")
        }
    }
});

$(window).blur(function () {
    $(".card").blur()
})

$(".card").click(function () {
    if ($('[data-bookmark="true"]').length > 0) {
        sessionStorage.setItem("session", "true")
    }
    if ($('[data-bookmark="true"]').length == 0 && sessionStorage.getItem("session") != "true") {
        $(".banner").fadeIn(300)
        sessionStorage.setItem("session", "true")
    }
    $(".banner .action span").click(function() {
        $(".banner").fadeOut(150)
    })
    $("#bookmarks").removeAttr("disabled")
    $(this).toggleClass("selected")
    $(this).attr("data-bookmark", function(_, attr){return !(attr == "true")})
    if (!($("#bookmarks").hasClass("active"))) {
        $("#bookmarks span").text("Marked "+"("+$(".card.selected").length+")")
    }
    if ($(".overlay.right").is(":hidden")) {
        $(".scrollbar").scrollLeft($(".tags")[0].scrollWidth-$(".scrollbar").width())
    }
    if ($("#bookmarks").hasClass("active")) {
        $('[data-bookmark="false"]').hide()
        if ($('[data-bookmark="true"]').length == 0) {
            $("#bookmarks").attr('disabled',true)
            $("#bookmarks").removeClass("active")
            $('[data-bookmark="false"]').show()
            $(".filter").show()
            $("#bookmarks img").hide()
            $("#bookmarks span").text("Marked "+"("+$(".card.selected").length+")")
            if ($(window).innerWidth() <= 887) { 
                $(".content").css("margin-top", "24px")
            }
            $("#description").show()
            $("footer #links").removeAttr("style")
            $(".card").each(function(i, obj) {
                $(this).removeClass("border-hide")
            })
            showCards()
            if (!($(".tag.active").length == 0)) {
                $(".card").show()
                $(".tag.active").each(function () {
                    const tag = $(this).data('tag')
                    const filtered = $(".card:visible").filter(function() {
                        return $(this).data('tags').indexOf(tag) != -1
                    }).show()
                    $(".card").not(filtered).hide()
                })
                $("#showMore").hide()
            }
            if ($(".overlay.right").is(":hidden")) {
                $(".scrollbar").scrollLeft($(".tags")[0].scrollWidth-$(".scrollbar").width())
            }
        }
    } else {
        if ($('[data-bookmark="true"]').length == 0) {
            $("#bookmarks").attr('disabled',true)
        }
    }
});

$(".card").click(function () {
    const id = $(this).attr("data-id")
    const state = $('[data-id="'+ id +'"]').attr("data-bookmark") == "true"
    localStorage.setItem(id, state)
    const bookmarksAmount = $(".card.selected").length
    localStorage.setItem("bookmarksAmount", bookmarksAmount)
    if ($(".card.selected").length == 0) {
        localStorage.clear()
    }
});

$("#bookmarks").click(function () {
    $(".selected").addClass("transition-hide")
    $(".selected .card-bookmark").addClass("transition-hide")
    if ($("#bookmarks").hasClass("active")) {
        $(".selected").removeClass("transition-hide")
        $(".selected .card-bookmark").removeClass("transition-hide")
        $(".selected .card-bookmark").css("opacity", "1")
        if (!(window.matchMedia("(hover: none)").matches)) {
        $(".selected .card-bookmark").addClass("text-color-muted")
        $(".selected .card-bookmark span").text("Added")
        $(".selected .card-bookmark img").attr("src", "assets/icons/muted/check.svg")
        } else {
            $(".selected .card-bookmark span").text("Remove")
            $(".selected .card-bookmark img").attr("src", "assets/icons/bright/remove.svg")
        }
        $(".card").each(function(i, obj) {
            $(this).removeClass("border-hide")
        });
    } else {
        if (!(window.matchMedia("(hover: none)").matches)) {
            $(".selected").addClass("border-hide")
            $(".selected .card-bookmark").css("opacity", "0")
        }
    }
});

$("#bookmarks").click(function () {
    if (!($('[data-bookmark="true"]').length == 0)) {
        $(this).toggleClass("active")
        $(".card").show()
        const selected = $(".card").filter(function() {
            return $(this).hasClass("selected")
        }).show()
        $(".card").not(selected).hide()
    }
    if ($("#bookmarks").hasClass("active") && $('[data-bookmark="true"]').length != 0) {
        $("#bookmarks img").show()
        $("#bookmarks span").text("Explore")
        $(".filter").hide()
        $(".back-to-top").hide()
        $("#showMore").hide()
        if ($(window).innerWidth() <= 887) { 
            $("#description").hide()
            $(".content").css("margin-top", "8px")
            $("footer #links").css("justify-content", "center")
            $("footer #links").css("text-align", "center")
        }
    } else {
        $("#bookmarks img").hide()
        $("#bookmarks span").text("Marked "+"("+$(".card.selected").length+")")
        $(".filter").show()
        $("#description").show()
        $("footer #links").removeAttr("style")
        if ($(window).innerWidth() <= 887) { 
            $(".content").css("margin-top", "24px")
        }
        showCards()
        if (!($(".tag.active").length == 0)) {
            $(".card").show()
            $(".tag.active").each(function () {
                const tag = $(this).data('tag')
                const filtered = $(".card:visible").filter(function() {
                    return $(this).data('tags').indexOf(tag) != -1
                }).show()
                $(".card").not(filtered).hide()
            })
            $("#showMore").hide()
        }
    }
    if ($("footer").css("visibility") == "hidden") {
        $("footer").css("opacity", "1")
        $("footer").css("visibility", "visible")
    }
});

if (localStorage.getItem("bookmarksAmount") == null) {
    localStorage.setItem("bookmarksAmount", "0")
    $("#bookmarks span").text("Marked "+"("+localStorage.getItem("bookmarksAmount")+")")
} else {
    $("#bookmarks span").text("Marked "+"("+localStorage.getItem("bookmarksAmount")+")")
}

if (localStorage.getItem("bookmarksAmount") != "0") {
    $("#bookmarks").removeAttr("disabled")
}

$(".colors").hover(function () {
    const id = $(this).attr("data-id")
    $('.display[data-id="'+ id +'"]').fadeIn(300)
}, function () {
    $(".display").fadeOut(300)
});

$(".color").hover(function () {
    const id = $(this).attr("data-id")
    $('.display[data-id="'+ id +'"]').show()
    $('.display[data-id="'+ id +'"] img').fadeIn(150)
    $('.display[data-id="'+ id +'"] span').fadeIn(150)
    if (!(window.matchMedia("(hover: none)").matches)) {
        $(".display img").attr('src',"assets/icons/bright/copy.svg")
        $(".display span").text($(this).attr("data-color").toUpperCase())
    }
    $(this).css("box-shadow", ("0px 8px 16px"+" #"+($(this).attr("data-color"))+"66"))
    $(this).css("transform", "scale3d(1.05, 1.05, 1.05")
}, function() {
    const id = $(this).attr("data-id")
    $(".color").css("box-shadow", "none")
    $(".color").css("transform", "none")
    $('.display[data-id="'+ id +'"] img').fadeOut(150)
    $('.display[data-id="'+ id +'"] span').fadeOut(150)
});

$(".color").focusin(function () {
    const id = $(this).attr("data-id")
    $('.display[data-id="'+ id +'"]').show()
    $('.display[data-id="'+ id +'"] img').fadeIn(150)
    $('.display[data-id="'+ id +'"] span').fadeIn(150)
    $('.display[data-id="'+ id +'"]').show()
    if (!(window.matchMedia("(hover: none)").matches)) {
        $(".display img").attr('src',"assets/icons/bright/copy.svg")
        $(".display span").text($(this).attr("data-color").toUpperCase())
    }
});

$(".color").focusout(function () {
    const id = $(this).attr("data-id")
    $('.display[data-id="'+ id +'"] img').fadeOut(150)
    $('.display[data-id="'+ id +'"] span').fadeOut(150)
    $(".display").hide()
});

$(".colors").hover(function () {
    const id = $(this).attr("data-id")
    $('.card[data-id="'+ id +'"] .card-bookmark').css("opacity", "0")
    $('.card[data-id="'+ id +'"]').addClass("border-hide")
}, function() {
    const id = $(this).attr("data-id")
    $('.card[data-id="'+ id +'"] .card-bookmark').css("opacity", "1")
    $('.card[data-id="'+ id +'"]').removeClass("border-hide")
});

$(".color").click(function () {
    navigator.clipboard.writeText($(this).attr("data-color").toUpperCase())
    if (!(window.matchMedia("(hover: none)").matches)) {
        $(".display span").animate({'opacity': 0}, 150, function () {
            $(this).text("Copied")
        }).animate({'opacity': 1}, 150)
        $(".display img").animate({'opacity': 0}, 150, function () {
            $(this).attr('src',"assets/icons/bright/check.svg")
        }).animate({'opacity': 1}, 150)
    }
});

$(".colors").click(function (e) {
    e.stopPropagation()
});

$(".tag").hover(function () {
    if (!($(this).hasClass("active") || $(this).is(":disabled"))) {
        $(this).css("transform", "translateY(-2px)")
    }
}, function () {
    $(this).removeAttr("style")
});

$(".tag").click(function () {
    if (!($(this).hasClass("active"))) {
        if ($(this).parent().hasClass("group-1")) {
            $(this).addClass("pillow")
        } else if ($(this).parent().hasClass("group-2")) {
            $(this).addClass("rectangular")
        }
        if (!($(this).is(":disabled"))) {
            $(".actives").addClass("actives-gap")
            $(this).addClass("active")
            $(".actives").append(this)
            if ($(".tag.active").length == 1) {
                if ($(".overlay.right").is(":hidden")) {
                    $(".scrollbar").scrollLeft($(".tags")[0].scrollWidth-$(".scrollbar").width())
                }
            }
        }
        $("#showMore").hide()
    } else {
        if ($(".tag.active").length == 1) {
            $(".actives").removeClass("actives-gap")
        }
        $(this).removeClass("active")
        if ($(this).hasClass("pillow")) {
            $(".tags .group-1").append(this)
            $(".group-1 .tag").sort(sort_a).appendTo('.group-1')
            function sort_a(a, b) {
                return ($(b).data('pos')) < ($(a).data('pos')) ? 1 : -1
            }
        } else if ($(this).hasClass("rectangular")) {
            $(".tags .group-2").append(this)
            $(".group-2 .tag").sort(sort_a).appendTo('.group-2')
            function sort_a(a, b) {
                return ($(b).data('pos')) < ($(a).data('pos')) ? 1 : -1
            }
        }
    }
    if ($("footer").css("visibility") == "hidden") {
        $("footer").css("opacity", "1")
        $("footer").css("visibility", "visible")
    }
});

$(".tag").click(function () {
    if ($(".tag.active").length == 0) {
        showCards()
        $(".tag").removeAttr("disabled")
        $(".card").removeAttr("data-show")
    } else {
        $(".card").show()
        $(".tag.active").each(function () {
            const tag = $(this).data('tag')
            const filtered = $(".card:visible").filter(function() {
                return $(this).data('tags').indexOf(tag) != -1
            }).show()
            $(".card").not(filtered).hide()
            $(".card").removeAttr("data-show")
            $(filtered).attr("data-show", "")
            $(".tag").removeAttr("disabled")
            $(filtered).each(function () {
                const value = $(this).data("tags")
                $(".tag").each(function () {
                    if (value.includes($(this).data("tag"))) {
                        $(this).attr("data-show", "")
                        if ($(filtered).length <= 1) {
                            $(this).removeAttr("data-show")
                        }
                    }
                })
            })
            if ($(".tag.active").length <= 2) {
                $(".tag:not([data-show], .active)").attr("disabled",true)
            } else {
                $(".tag:not(.active)").attr("disabled",true)
            }
            $(".tag").removeAttr("data-show")
        })
    }
});

$(".scrollbar").scroll(function() {
    const scrollPositionLeft = Math.ceil($(this).scrollLeft())
    const scrollLeftEnd = Math.ceil(($(".tags")[0].scrollWidth)-$(".scrollbar").width())
    if (scrollPositionLeft >= 1){
        $(".overlay.left").fadeIn(300)
    } else {
        $(".overlay.left").fadeOut(300)
    }
    if (scrollLeftEnd - scrollPositionLeft <= 1) {
        $(".overlay.right").fadeOut(300)
    } else {
        $(".overlay.right").fadeIn(300)
    }
});

if (!(window.matchMedia("(hover: none)").matches)) {
    $(".scrollbar.container").hover(function() {
        $(".control").css("opacity", "1")
        $(".control").css("visibility", "visible")
    }, function () {
        $(".control").css("opacity", "0")
        $(".control").css("visibility", "hidden")
    });
} else {
    $(".control").css("opacity", "0")
    $(".control").css("visibility", "hidden")
}

$(".overlay.left .control").click(function () {
    $('.scrollbar').animate({scrollLeft: "-=440px"})
});
$(".overlay.right .control").click(function () {
    $('.scrollbar').animate({scrollLeft: "+=440px"})
});

$(window).scroll(function() {
    const scrollPositionTop = Math.ceil($(this).scrollTop())
    const scrollTopEnd = Math.ceil($(document).height() - (scrollPositionTop + $(window).height()))
    if ($(window).innerWidth() > 887) {
        if (scrollPositionTop >= 16){
            $("header, .filter").css("opacity", "0")
            $("header, .filter").css("visibility", "hidden")
        } else {
            $("header, .filter").css("opacity", "1")
            $("header, .filter").css("visibility", "visible")
        }
    } else {
        if (scrollPositionTop >= 1){
            $(".filter").css("opacity", "0")
            $(".filter").css("visibility", "hidden")
        } else {
            $(".filter").css("opacity", "1")
            $(".filter").css("visibility", "visible")
        }
        if (scrollPositionTop >= 48){
            $("header").css("opacity", "0")
            $("header").css("visibility", "hidden")
        } else {
            $("header").css("opacity", "1")
            $("header").css("visibility", "visible")
        }
    }
    if (scrollPositionTop >= 64){
        $(".back-to-top").show()
    } else {
        $(".back-to-top").hide()
    }
    if (scrollTopEnd <= 16){
        $("footer").css("opacity", "1")
        $("footer").css("visibility", "visible")
        $("footer").css("transition", "0.5s ease")
    }
});

$(function() {
    $(window).scrollTop(0);
});

$(".back-to-top").click(function () {
    window.scrollTo({ top: 0, behavior: 'smooth' })
});

const showCards = function () {
    $(".card").hide()
    if ($(window).innerWidth() > 1311) {
        $(".card").slice(0, 10).attr("data-showed", "")
    } else if ($(window).innerWidth() > 1007 && $(window).innerWidth() <= 1311) {
        $(".card").slice(0, 8).attr("data-showed", "")
    } else if ($(window).innerWidth() <= 1007) {
        $(".card").slice(0, 6).attr("data-showed", "")
    }
    $("[data-showed]").show()
    $("#showMore").show()
    if ($(".card:hidden").length == 0) {
        $("#showMore").hide()
    }
}

$("#showMore").click(function () {
    if ($(window).innerWidth() > 1311) {
        $(".card:hidden").slice(0, 15).attr("data-showed", "")
    } else if ($(window).innerWidth() > 1007 && $(window).innerWidth() <= 1311) {
        $(".card:hidden").slice(0, 12).attr("data-showed", "")
    } else if ($(window).innerWidth() <= 1007) {
        $(".card:hidden").slice(0, 9).attr("data-showed", "")
    }
    $("[data-showed]").show()
    if ($(".card:hidden").length == 0) {
    $("#showMore").hide()
    }
});

showCards()

var width = $(window).width()

$(window).resize(function () {
    if($(window).width() != width){
        if (!($("#bookmarks").hasClass("active") || $(".tag.active").length >= 1)) {
            showCards()
        }
        if ($(window).innerWidth() > 1007 && $(window).innerWidth() <= 1311) {
            $(".card").removeAttr("data-showed")
        } else if ($(window).innerWidth() <= 1007) {
            $(".card").removeAttr("data-showed")
        }
    }
    if ($(window).innerWidth() <= 887) {
        if (!($("header + div").hasClass("filter"))) {
            $(".filter").insertAfter("header")
            $("#description").insertAfter(".left:not(.overlay)")
            $(".filter").css("visibility", "visible")
            $(".content").css("margin-top", "24px")
            if ($("#bookmarks").hasClass("active")) {
                $("#description").hide()
                $(".content").css("margin-top", "8px")
            }
        }
    } else if (($(window).innerWidth() > 887)) {
        if (!($("header div").hasClass("filter"))) {
            $(".filter").insertAfter(".left:not(.overlay)")
            $("#description").insertBefore("#links")
            $("#description").show()
            $(".content").removeAttr("style")
        }
    }
    if ($(window).innerWidth() <= 731) { 
        if (!($("footer div").is('[description]'))) {
            $("#description").insertBefore("#links")
        }
    } else if ($(window).innerWidth() > 731 && $(window).innerWidth() < 887) { 
        if (!($("header + div").is('[description]'))) {
            $("#description").insertAfter(".left:not(.overlay)")
        }
    }
}).resize()

if (window.matchMedia("(hover: none)").matches) {
    $(".color").click(function () {
        const id = $(this).attr("data-id")
        $('.display[data-id="'+ id +'"]').fadeIn(150)
        $(".display").delay(1500).fadeOut(150)
        $(".card").removeClass("border-hide")
    })
    $(".filter").off("mouseenter mouseleave")
    $(".card").off("mouseenter mouseleave")
    $(".card-media").off("mouseenter mouseleave")
    $(".color").off("mouseenter mouseleave")
    $(".tag").off("mouseenter mouseleave")
    $(".display span").text("Copied")
    $(".display img").attr('src',"assets/icons/bright/check.svg")
    $("footer").css("opacity", "1")
    $("footer").css("visibility", "visible")
}

$('[tabindex="0"]').on('keydown', function(evt) {
    if(evt.keyCode == 13 || evt.keyCode == 32) {
        if (!($(".color").is(":focus"))) {
            $(this).click()
        }     
    }
});

function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        (new Image()).src = this
    })
}

preload([
    'assets/icons/bright/remove.svg',
    'assets/icons/bright/check.svg',
    'assets/icons/muted/check.svg'
])

if (!(window.matchMedia("(hover: none)").matches)) {
    const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2
    };
    function observerCallback(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            entry.target.style.opacity = "1"
            } else {
                entry.target.style.opacity = "0"
            }
        })
    }
    const observer = new IntersectionObserver(observerCallback, observerOptions)
    document.querySelectorAll(".card").forEach(el => observer.observe(el))
}

if ("IntersectionObserver" in window) {
    const lazyImages = document.querySelectorAll(".lazy")
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.src = entry.target.dataset.src
                delete entry.target.dataset.src
                lazyImageObserver.unobserve(entry.target)
            }
        })
    })
    lazyImages.forEach(function(lazyImage) {
        lazyImageObserver.observe(lazyImage)
    })
}
