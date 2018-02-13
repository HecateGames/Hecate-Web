"use strict";

function clocksTimer() {
    var t = this;
    this.init = function () {
        t.setTimezoneHour("Europe/Madrid", "clockMAD"), t.setTimezoneHour("America/New_York", "clockNYC"), t.setTimezoneHour("America/Bogota", "clockMED")
    }, this.setTimezoneHour = function (t, e) {
        var a = new moment;
        a.utc().tz(t);
        var o = document.getElementById(e);
        o.getElementsByClassName("second-hand")[0].className = "sh-" + a.format("ss") + " second-hand", o.getElementsByClassName("minute-hand")[0].className = "mh-" + a.format("mm") + " minute-hand", o.getElementsByClassName("hour-hand")[0].className = "hh-" + a.format("hh") + " hour-hand"
    }
}

function figuresAnimations(t) {
    this.initCircles = function () {
        return !0
    }, this.initSquares = function () {
        return !0
    }
}

function parallaxImages(t) {
    this.isSetTransiton = !1, this.classSections = "parallax-content", this.classImages = "parallax-image", this.init = function () {
        t && (this.classSections = t.classSections ? t.classSections : this.classSections, this.classImages = t.classImages ? t.classImages : this.classImages), this.scrolling()
    }, this.setTransitons = function () {
        for (var t = document.getElementsByClassName(this.classImages), e = 0; e < t.length; e++) {
            var a = t[e],
                o = a.getAttribute("data-transiton");
            o = "all " + (o = o || "0.1s"), a.style.transition = o
        }
    }, this.scrolling = function () {
        var t = this,
            e = this.classSections,
            a = this.classImages,
            o = void 0,
            c = document.getElementsByClassName(a),
            n = document.getElementsByClassName(e);
        window.addEventListener("scroll", function (e) {
            var a = this.pageYOffset;
            o || function () {
                o = [];
                for (var t = 0; t < n.length; t++) o[n[t].id] = n[t].offsetTop
            }();
            for (var s = 0; s < c.length; s++) {
                var i = c[s],
                    r = i.getAttribute("data-speed"),
                    l = i.getAttribute("data-parent-section"),
                    d = -(a - o[l]) * r / 100;
                i.style.webkitTransform = "translate3d(0px, " + d + "px, 0px)", i.style.MozTransform = "translate3d(0px, " + d + "px, 0px)", i.style.msTransform = "translate3d(0px, " + d + "px, 0px)", i.style.OTransform = "translate3d(0px, " + d + "px, 0px)", i.style.transform = "translate3d(0px, " + d + "px, 0px)"
            }
            t.isSetTransiton || (t.setTransitons(), t.isSetTransiton = !0)
        })
    }
}

function pluginAnimations(t) {
    var e = this;
    this.sections = [], this.currentSection = [], this.configBgColors = t.bgColors, this.configParticles = t.particles, this.headerFixedTop = document.getElementById("headerFixedTop"), this.bodyElement = document.getElementsByTagName("body")[0], this.init = function () {
        e.sections = e.mapSections(), e.currentSection = e.findSection(), e.loadParticles(), e.resizing(), e.scrolling()
    }, this.addTransition = function () {
        var t = "background-color " + e.configBgColors.timeTransition;
        e.bodyElement.style.transition = t
    }, this.mapSections = function () {
        for (var t = [], a = document.getElementsByClassName(e.configBgColors.className), o = 0; o < a.length; o++) {
            var c = /bg_\w*/.exec(a[o].className)[0].replace("bg", "");
            c && (a[o].bgColorClass = c, a[o].bgColor = configColorsBg[c].color, a[o].offset = a[o].dataset.bgOffset ? parseInt(a[o].dataset.bgOffset) : e.configBgColors.offset, a[o].particlesColor = a[o].dataset.particlesColor ? a[o].dataset.particlesColor : "_grey", a[o].particlesAlpha = !!a[o].dataset.particlesAlpha && parseFloat(a[o].dataset.particlesAlpha), a[o].showParticles = a[o].classList.contains("section-bg-particles"), a[o].classList.contains("percentual-divider-start") && (a[o].percentualDividerId = a[o].dataset.percentualDividerId), t.push(a[o]))
        }
        return t
    }, this.findSection = function () {
        for (var t = window.scrollY, a = 0; a < e.sections.length; a++) {
            var o = e.sections[a];
            if (o.offsetTop - e.sections[a].offset + o.offsetHeight > t) return a
        }
    }, this.setBackground = function (t) {
        var a = document.getElementsByClassName(e.configBgColors.className);
        if (e.configBgColors.dynamicBackgrounds) {
            for (var o = 0; o < a.length; o++) "static" !== a[o].dataset.colorChange && (t ? a[o].style.backgroundColor = "" : a[o].setAttribute("style", "background-color:transparent !important"));
            e.sections[e.currentSection] && (e.bodyElement.style.backgroundColor = t ? "" : e.sections[e.currentSection].bgColor)
        }
    }, this.loadParticles = function () {
        e.configParticles.enable && (particlesJS("body", e.configParticles.jsonConfig), window.pJS_GUI = window.pJSDom[0].pJS, e.toggleParticlesMotion(!0))
    }, this.toggleParticlesMotion = function (t) {
        e.configParticles.enable && (pJS_GUI.particles.move.enable = !t, pJS_GUI.fn.particlesRefresh())
    }, this.toggleParticlesColors = function (t, a) {
        e.configParticles.enable && (window.pJS_GUI.particles.number.value = e.configParticles.number, window.pJS_GUI.particles.color.value = configColorsBg[t].color, window.pJS_GUI.particles.line_linked.color = configColorsBg[t].color, window.pJS_GUI.particles.line_linked.opacity = a || .5, pJS_GUI.fn.particlesRefresh())
    }, this.responsiveMobile = function (t) {
        $(".modal-responsive .hecate-section").height(.285 * t), $(".modal-responsive .hecate-options").height(.145 * t)
    }, this.resizing = function () {
        e.bodyElement.classList.remove("dynamic-backgrounds"), e.configBgColors.dynamicBackgrounds && window.innerWidth > 992 && (e.bodyElement.classList.add("dynamic-backgrounds"), e.setBackground(!1)), e.toggleParticlesMotion(!(window.innerWidth >= 577)), e.responsiveMobile(window.innerHeight);
        var t = e;
        window.addEventListener("resize", function (e) {
            t.responsiveMobile(this.innerHeight), console.log(this.innerWidth), t.configBgColors.dynamicBackgrounds && this.innerWidth > 992 ? (t.bodyElement.classList.add("dynamic-backgrounds"), t.setBackground(!1)) : (t.bodyElement.classList.remove("dynamic-backgrounds"), t.setBackground(!0)), t.toggleParticlesMotion(!(window.innerWidth >= 577))
        })
    }, this.awwardsAnimation = function (t) {
        t > 5 ? (document.getElementById("www").classList.add("active"), document.getElementById("ss-bd").classList.add("active")) : (document.getElementById("www").classList.remove("active"), document.getElementById("ss-bd").classList.remove("active"))
    }, this.scrolling = function () {
        var t = e,
            a = !1,
            o = !1,
            c = !1,
            n = "_grey",
            s = !1,
            i = !1;
        e.awwardsAnimation(window.scrollY), window.addEventListener("scroll", function (e) {
            var r = this.pageYOffset;
            if (t.sections[t.currentSection]) {
                var l = t.sections[t.currentSection],
                    d = t.configBgColors.offset;
                this.innerWidth >= 1200 && (d = t.sections[t.currentSection + 1] ? t.sections[t.currentSection + 1].offset : t.sections[t.currentSection].offset);
                if (l.offsetTop - d + l.offsetHeight > r) {
                    var m = t.sections[t.currentSection].bgColor,
                        p = t.sections[t.currentSection].bgColorClass;
                    t.configBgColors.dynamicBackgrounds && (t.bodyElement.style.backgroundColor = m), configColorsBg[p].isLightBg ? t.bodyElement.classList.add("content-text-dark") : t.bodyElement.classList.remove("content-text-dark"), c != l.showParticles && (l.showParticles ? t.bodyElement.classList.add("show-particles") : t.bodyElement.classList.remove("show-particles"), t.toggleParticlesMotion(!(this.innerWidth >= 577) || !l.showParticles)), l.percentualDividerId && i != l.percentualDividerId && document.getElementById(l.percentualDividerId).classList.add("animate-divider"), n == l.particlesColor && s == l.particlesAlpha || t.toggleParticlesColors(l.particlesColor, l.particlesAlpha), o = configColorsBg[p].isLightBg, n = l.particlesColor, s = l.particlesAlpha, c = l.showParticles, i = l.percentualDividerId, t.currentSection > 0 && t.currentSection--
                } else t.currentSection < t.sections.length - 1 && t.currentSection++;
                a || (t.addTransition(), a = !0)
            }
            r > 5 ? t.headerFixedTop.classList.add("fixed-top-active") : (headerFixedTop.classList.remove("fixed-top-active"), headerFixedTop.style.backgroundColor = "transparent"), t.awwardsAnimation(r)
        })
    }
}
var configColorsBg = {
        _primary: {
            color: "#082c4c"
        },
        _deep_primary: {
            color: "#072744"
        },
        _secundary_red: {
            color: "#f03856"
        },
        _secundary_blue: {
            color: "#25b5e9"
        },
        _deep_secundary_red: {
            color: "#c23554"
        },
        _grey: {
            color: "#f1f5f7",
            isLightBg: !0
        },
        _deep_grey: {
            color: "#f1f5f7",
            isLightBg: !0
        },
        _white: {
            color: "#ffffff",
            isLightBg: !0
        },
        _black: {
            color: "#000000"
        }
    },
    configParticles = {
        particles: {
            number: {
                value: 100,
                density: {
                    enable: !0,
                    value_area: 3e3
                }
            },
            color: {
                value: "#ffffff"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                },
                polygon: {
                    nb_sides: 3
                },
                image: {
                    src: "img/github.svg",
                    width: 100,
                    height: 100
                }
            },
            opacity: {
                value: .2,
                random: !1,
                anim: {
                    enable: !1,
                    speed: .8,
                    opacity_min: .1,
                    sync: !1
                }
            },
            size: {
                value: 3,
                random: !0,
                anim: {
                    enable: !1,
                    speed: 50,
                    size_min: .1,
                    sync: !1
                }
            },
            line_linked: {
                enable: !0,
                distance: 150,
                color: "#ffffff",
                opacity: .4,
                width: 1
            },
            move: {
                enable: !0,
                speed: 5,
                direction: "none",
                random: !1,
                straight: !1,
                out_mode: "out",
                bounce: !1,
                attract: {
                    enable: !1,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: !1,
                    mode: "repulse"
                },
                onclick: {
                    enable: !1
                },
                resize: !0
            },
            modes: {
                grab: {
                    distance: 800,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 800,
                    size: 80,
                    duration: 2,
                    opacity: .8,
                    speed: 3
                },
                repulse: {
                    distance: 400,
                    duration: .4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: !1,
        detect_on: !1,
        events: {
            onhover: {
                enable: !1
            },
            onclick: {
                enable: !1
            },
            resize: !1
        }
    };
$("select").each(function () {
    var t = $(this),
        e = $(this).children("option").length;
    t.addClass("select-hidden"), t.wrap('<div class="select"></div>'), t.after('<div class="select-styled"></div>');
    var a = t.next("div.select-styled");
    a.text(t.children("option").eq(0).text() + " ↓");
    for (var o = $("<ul />", {
            class: "select-options"
        }).insertAfter(a), c = 0; c < e; c++) $("<li />", {
        text: t.children("option").eq(c).text(),
        rel: t.children("option").eq(c).val()
    }).appendTo(o);
    var n = o.children("li");
    a.click(function (t) {
        t.stopPropagation(), $("div.select-styled.active").not(this).each(function () {
            $(this).removeClass("active").next("ul.select-options").hide()
        }), $(this).toggleClass("active").next("ul.select-options").toggle()
    }), n.click(function (e) {
        e.stopPropagation(), a.text($(this).text() + " ↓").removeClass("active"), t.val($(this).attr("rel")), o.hide();
        var c = "Please introduce yourself and let us know how we can collaborate together…";
        switch ($(this).attr("rel")) {
            case "boost":
                c = "Pitch us your idea or startup and how you see hecate adding value to your business…";
                break;
            case "enterprise":
                c = "Let us know about you, your company and the next big move you’re planning…";
                break;
            case "labs":
                c = "Tell us about you and your interest in hecate Labs or our products…"
        }
        $("#contactDescription").attr("placeholder", c)
    }), $(document).click(function () {
        a.removeClass("active"), o.hide()
    })
}), window.addEventListener("load", function () {
    (new clocksTimer).init(), $(".go-contact-modal").click(function (t) {
        t.preventDefault(), $("#contacthecate .back-modal").hide(), $("#contacthecate .tab-content .tab-pane").removeClass("in active show"), $("#contacthecate .contact-selector-container").removeClass("show"), $("#contacthecate .tab-content #contact-tab-01").addClass("in active show"), $(".modal-responsive.show").modal("hide"), $("#contacthecate").modal("show")
    }), $(".go-contact-email").click(function (t) {
        t.preventDefault(), $("#contacthecate .back-modal").show(), $("#contacthecate .tab-content .tab-pane").removeClass("in active show"), $("#contacthecate .tab-content #contact-tab-02").addClass("in active show"), $("#contacthecate .contact-selector-container").addClass("show"), $(".modal-contact.show").length || $("#contacthecate").modal("show"), $("#contactSelect option[value=" + t.currentTarget.dataset.contactType + "]").attr("selected", "selected");
        var e = $("#contactSelect option[value=" + t.currentTarget.dataset.contactType + "]").text();
        $("#contactSelectWrapper .select-styled").text(e + " ↓"), $("#contactEmail").focus()
    }), $("#contacthecate .go-contact-tab").click(function (t) {
        t.preventDefault();
        1 === t.currentTarget.dataset.contactTabId.replace("contact-tab-", "") ? $("#contacthecate .back-modal").hide() : $("#contacthecate .back-modal").show(), $("#contacthecate .tab-content .tab-pane").removeClass("in active show"), $("#contacthecate .tab-content #" + t.currentTarget.dataset.contactTabId).addClass("in active show"), ["contact-tab-01", "contact-tab-04"].includes(t.currentTarget.dataset.contactTabId) ? $("#contacthecate .contact-selector-container").removeClass("show") : $("#contacthecate .contact-selector-container").addClass("show")
    }), $("#contacthecate .back-contact-tab").click(function (t) {
        t.preventDefault();
        var e = $("#contacthecate .tab-content .tab-pane.in.show.active"),
            a = parseInt(e[0].id.replace("contact-tab-", ""));
        2 === a && $("#contacthecate .back-modal").hide(), $("#contacthecate .tab-content .tab-pane").removeClass("in active show"), $("#contacthecate .tab-content #contact-tab-0" + (a - 1)).addClass("in active show"), a - 1 == 1 || a - 1 == 4 ? $("#contacthecate .contact-selector-container").removeClass("show") : $("#contacthecate .contact-selector-container").addClass("show")
    }), $("#contacthecate #formEmail").submit(function (t) {
        t.preventDefault(), $("#contactEmailWrapper").removeClass("form-feedback");
        var e = $("#contactEmail").val();
        e ? /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(e) ? ($("#contacthecate .tab-content .tab-pane").removeClass("in active show"), $("#contacthecate .tab-content #contact-tab-03").addClass("in active show"), $("#contactDescription").focus()) : ($("#contactEmailWrapper").addClass("form-feedback"), $("#contactEmailWrapper .feedback p").text("Incorrect e-mail format")) : ($("#contactEmailWrapper").addClass("form-feedback"), $("#contactEmailWrapper .feedback p").text("E-mail is required"))
    }), $("#contacthecate #formDescription").submit(function (t) {
        t.preventDefault(), $("#contactDescriptionWrapper").removeClass("form-feedback");
        if ($("#contactDescription").val()) {
            var e = "GENERAL INQUIRES";
            switch ($("#contactSelect").val()) {
                case "boost":
                    e = "hecate BOOST";
                    break;
                case "enterprise":
                    e = "hecate ENTERPRISE";
                    break;
                case "labs":
                    e = "hecate LABS"
            }
            $.ajax({
                url: "https://docs.google.com/forms/d/e/1FAIpQLSccuzbinKX_pReDvBlSQXieXW-VpBjcLi7E_H_faCqllZZjJg/formResponse",
                type: "POST",
                crossDomain: !0,
                dataType: "xml",
                data: {
                    "entry.374502905": e,
                    "entry.812448389": $("#contactEmail").val().trim(),
                    "entry.557130182": $("#contactDescription").val().trim()
                },
                success: function (t, e, a) {
                    console.log("Enter on success"), $("#contactEmail").val(""), $("#contactDescription").val("")
                },
                error: function (t, e, a) {
                    console.log("Enter on error"), $("#contactEmail").val(""), $("#contactDescription").val("")
                }
            }), $("#contacthecate .back-modal").hide(), $("#contacthecate .tab-content .tab-pane").removeClass("in active show"), $("#contacthecate .contact-selector-container").removeClass("show"), $("#contacthecate .tab-content #contact-tab-04").addClass("in active show"), $("#thanksCloseBtn").text("CLOSING IN 6 ...");
            var a = 6,
                o = setInterval(function () {
                    0 === (a -= 1) && (clearInterval(o), $(".modal-contact.show").length && $("#contacthecate").modal("hide")), $("#thanksCloseBtn").text("CLOSING IN " + a + " ...")
                }, 1e3)
        } else $("#contactDescriptionWrapper").addClass("form-feedback")
    })
});