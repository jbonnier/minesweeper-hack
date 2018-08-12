! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery)
}(function(a) {
    function b(a) {
        return h.raw ? a : encodeURIComponent(a)
    }

    function c(a) {
        return h.raw ? a : decodeURIComponent(a)
    }

    function d(a) {
        return b(h.json ? JSON.stringify(a) : String(a))
    }

    function e(a) {
        0 === a.indexOf('"') && (a = a.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return a = decodeURIComponent(a.replace(g, " ")), h.json ? JSON.parse(a) : a
        } catch (a) {}
    }

    function f(b, c) {
        var d = h.raw ? b : e(b);
        return a.isFunction(c) ? c(d) : d
    }
    var g = /\+/g,
        h = a.cookie = function(e, g, i) {
            var j, k, l, m, n, o, p, q, r;
            if (void 0 !== g && !a.isFunction(g)) return i = a.extend({}, h.defaults, i), "number" == typeof i.expires && (j = i.expires, k = i.expires = new Date, k.setTime(+k + 864e5 * j)), document.cookie = [b(e), "=", d(g), i.expires ? "; expires=" + i.expires.toUTCString() : "", i.path ? "; path=" + i.path : "", i.domain ? "; domain=" + i.domain : "", i.secure ? "; secure" : ""].join("");
            for (l = e ? void 0 : {}, m = document.cookie ? document.cookie.split("; ") : [], n = 0, o = m.length; n < o; n++) {
                if (p = m[n].split("="), q = c(p.shift()), r = p.join("="), e && e === q) {
                    l = f(r, g);
                    break
                }
                e || void 0 === (r = f(r)) || (l[q] = r)
            }
            return l
        };
    h.defaults = {}, a.removeCookie = function(b, c) {
        return void 0 !== a.cookie(b) && (a.cookie(b, "", a.extend({}, c, {
            expires: -1
        })), !a.cookie(b))
    }
}),
function(a) {
    var b = 0;
    a.getUID = function() {
        return ++b
    }
}(jQuery),
function(a) {
    function b() {
        var a = navigator.userAgent.toLowerCase();
        return -1 != a.indexOf("msie") && parseInt(a.split("msie")[1])
    }
    var c = {
            init: function(c) {
                var i, j, k, l, m, q, r, u, v, w, x = {
                    width: 10,
                    height: 10,
                    mines: 10,
                    onStart: null,
                    onWin: null,
                    onGameOver: null,
                    displayNum: !0,
                    displayMark: !0,
                    createCounter: !0,
                    createButton: !0,
                    createTimer: !0,
                    setCounter: null,
                    setButton: null,
                    setTimer: null,
                    layout: null,
                    classes: null
                };
                return c && a.extend(x, c), i = a(this), myUID = a.getUID(), j = null, x.layout && (j = s(x.layout, x.width, x.height)), x.builtLayout = j, x.builtClasses = t(x.classes, x.width, x.height), k = d(x), l = e(x), m = "", m += '<div class="minesweeper-div" id="minesweeper-div-' + myUID + '">\n', (x.createCounter || x.createButton || x.createTimer) && (m += '<table class="minesweeper-header" id="minesweeper-header-' + myUID + '">\n', m += "<tr>\n", x.createCounter ? m += '<td class="minesweeper-counter" id="minesweeper-counter-' + myUID + '">' + (x.mines - l) + "</td>\n" : m += '<td class="minesweeper-counter-empty"></td>', x.createButton ? (m += '<td class="minesweeper-button-cell" id="minesweeper-button-cell-' + myUID + '">\n', m += '<input type="button" class="minesweeper-button" id="minesweeper-button-' + myUID + '" value=" "/>\n', m += "</td>\n") : m += '<td class="minesweeper-button-cell-empty"></td>', x.createTimer ? m += '<td class="minesweeper-timer" id="minesweeper-timer-' + myUID + '">0</td>\n' : m += '<td class="minesweeper-timer-empty"></td>', m += "</tr>\n", m += "</table>\n"), m += '<table class="minesweeper-table" id="minesweeper-table-' + myUID + '">\n\n', m += h(myUID, x), m += "</table>\n", m += '<div class="best-score"></div>\n', m += "</div>\n", i.html(m), q = a("#minesweeper-table-" + myUID), $header = a("#minesweeper-header-" + myUID), $header.width(q.width()), r = !1, u = !1, q.unbind(), q.mouseup(function(a) {
                    var c, d, e = a.target.id.match(/^minesweeper-\d+-(\d+)-(\d+)$/);
                    if (e)
                        if (c = parseInt(e[1], 10), d = parseInt(e[2], 10), b() && b() <= 8 && (1 == a.button ? a.button = 0 : 4 == a.button ? a.button = 1 : a.button = 2), r && u) p(i, c, d);
                        else if (0 == a.button) o(i, c, d);
                    else if (1 == a.button) p(i, c, d);
                    else if (2 == a.button) return n(i, c, d), !1;
                    r = !1, u = !1
                }), q.dblclick(function(a) {
                    var b, c, d = a.target.id.match(/^minesweeper-\d+-(\d+)-(\d+)$/);
                    d && (b = parseInt(d[1], 10), c = parseInt(d[2], 10), p(i, b, c))
                }), v = function(b) {
                    var c;
                    b.target.id.match(/^minesweeper-\d+-(\d+)-(\d+)$/) && (0 == b.button ? r = !0 : 2 == b.button && (u = !0), c = a(b.target), c.on("mouseleave", function() {
                        c.off("mouseenter mouseleave"), r = !1, u = !1
                    }))
                }, q.mousedown(function(a) {
                    return v(a), !1
                }), q[0].oncontextmenu = function() {
                    return !1
                }, document.onselectstart = function() {
                    return !1
                }, w = a("#minesweeper-button-" + myUID), w.attr("class", "minesweeper-button minesweeper-button-waiting"), w.click(function() {
                    i.minesweeper("restart")
                }), null !== x.setCounter && x.setCounter(x.mines - l), null !== x.setButton && x.setButton("waiting"), null !== x.setTimer && x.setTimer(0), i.data("minesweeper-data", {
                    settings: x,
                    uid: myUID,
                    remainingCells: k,
                    counter: x.mines - l,
                    timer: 0,
                    clickable: f(x),
                    flags: g(x),
                    finished: !1,
                    exactTimer: null
                }), this
            },
            restart: function() {
                var b, c, i, j, k, l = a(this),
                    m = l.data("minesweeper-data");
                m.counter = m.settings.mines - e(m.settings), m.settings.createCounter && (b = a("#minesweeper-counter-" + m.uid), b.html(m.counter)), null !== m.settings.setCounter && m.settings.setCounter(m.counter), m.remainingCells = d(m.settings), c = a("#minesweeper-button-" + m.uid), c.attr("class", "minesweeper-button minesweeper-button-waiting"), null !== m.settings.setButton && m.settings.setButton("waiting"), clearTimeout(m.timerObject), m.settings.createTimer && (i = a("#minesweeper-timer-" + m.uid), i.html("0")), null !== m.settings.setTimer && m.settings.setTimer(0), m.timer = 0, m.finished = !1, m.clickable = f(m.settings), m.flags = g(m.settings), j = a("#minesweeper-table-" + m.uid), k = h(m.uid, m.settings), j.html(k), m.matrix = null
            },
            export: function() {
                var b, c, d, e, f, g, h, i, j, k = a(this).data("minesweeper-data");
                if (!k.matrix) return null;
                for (b = k.settings, c = [], d = 0; d < b.height; d++)
                    for (e = 0; e < b.width; e++) f = a("#minesweeper-" + k.uid + "-" + e + "-" + d), f.hasClass("minesweeper-mark") ? c.push(10) : f.hasClass("minesweeper-flag") ? c.push(11) : f.hasClass("minesweeper-flag-wrong") ? c.push(12) : f.hasClass("minesweeper-mine-clicked") ? c.push(13) : f.hasClass("minesweeper-mine") ? c.push(14) : k.clickable[e][d] ? c.push(15) : c.push(k.matrix[e][d] + 1);
                return g = "", h = null, i = 0, a.each(c, function(a, b) {
                    if (i += b, null === h) h = b;
                    else {
                        var c = 16 * h + b;
                        g += String.fromCharCode(c), h = null
                    }
                }), null !== h && (g += String.fromCharCode(16 * h)), j = null === k.exactTimer ? k.timer : Math.round(10 * k.exactTimer) / 10, i += 17 * (10 * j + 95) + 11 * (k.counter + 35), encodeURIComponent(g) + String.fromCharCode(8) + b.width + String.fromCharCode(8) + b.height + String.fromCharCode(8) + i + String.fromCharCode(8) + (7 * (10 * j + 38) + 639) + String.fromCharCode(8) + (4 * (k.counter + 3) + 25)
            }
        },
        d = function(a) {
            var b, c, d = a.width * a.height - a.mines;
            if (a.builtLayout)
                for (b = 0; b < a.width; b++)
                    for (c = 0; c < a.height; c++) "-" === a.builtLayout[b][c] && d--;
            return d
        },
        e = function(a) {
            var b, c, d = 0;
            if (a.builtLayout)
                for (b = 0; b < a.width; b++)
                    for (c = 0; c < a.height; c++) "*" === a.builtLayout[b][c] && d++;
            return d
        },
        f = function(a) {
            var b, c, d = [];
            for (b = 0; b < a.width; b++)
                for (d[b] = [], c = 0; c < a.height; c++) a.builtLayout && "*" === a.builtLayout[b][c] ? d[b][c] = !1 : d[b][c] = !0;
            return d
        },
        g = function(a) {
            var b, c, d = [];
            for (b = 0; b < a.width; b++)
                for (d[b] = [], c = 0; c < a.height; c++) a.builtLayout && "*" === a.builtLayout[b][c] ? d[b][c] = !0 : d[b][c] = !1;
            return d
        },
        h = function(a, b) {
            var c, d, e, f = "";
            for (c = 0; c < b.height; c++) {
                for (f += '<tr class="minesweeper-row">\n', d = 0; d < b.width; d++) e = "minesweeper-unknown", b.builtLayout && ("-" === b.builtLayout[d][c] ? e = "minesweeper-disabled" : "*" === b.builtLayout[d][c] && (e = "minesweeper-flag")), e += " minesweeper-class-" + b.builtClasses[d][c], f += '<td class="' + e + '" id="minesweeper-' + a + "-" + d + "-" + c + '">&nbsp;</td>\n';
                f += "</tr>\n"
            }
            return f
        },
        i = function(a, b, c) {
            return !(a < 0 || a >= c.width || b < 0 || b >= c.height)
        },
        j = function(b, c, d) {
            var e = [
                    [b - 1, c - 1],
                    [b, c - 1],
                    [b + 1, c - 1],
                    [b - 1, c],
                    [b + 1, c],
                    [b - 1, c + 1],
                    [b, c + 1],
                    [b + 1, c + 1]
                ],
                f = [];
            return a.each(e, function(a, b) {
                i(b[0], b[1], d) && f.push(b)
            }), f
        },
        k = function(a, b, c) {
            var d, e, f, g, h, i = a.data("minesweeper-data"),
                j = i.settings,
                k = [];
            for (d = 0; d < j.width; d++)
                for (k[d] = [], e = 0; e < j.height; e++) k[d][e] = " ";
            if (f = j.mines, j.builtLayout)
                for (d = 0; d < j.width; d++)
                    for (e = 0; e < j.height; e++) "*" === j.builtLayout[d][e] && (k = l(k, d, e), f--);
            for (g = 0; g < f; g++) {
                do {
                    d = Math.floor(Math.random() * j.width), e = Math.floor(Math.random() * j.height), h = !0, "*" === k[d][e] && (h = !1), d >= b - 1 && d <= b + 1 && e >= c - 1 && e <= c + 1 && (h = !1), j.builtLayout && " " !== j.builtLayout[d][e] && (h = !1)
                } while (!h);
                k = l(k, d, e)
            }
            return i.matrix = k, k
        },
        l = function(a, b, c) {
            return a[b][c] = "*", a = m(a, b - 1, c - 1), a = m(a, b - 1, c), a = m(a, b - 1, c + 1), a = m(a, b, c - 1), a = m(a, b, c + 1), a = m(a, b + 1, c - 1), a = m(a, b + 1, c), a = m(a, b + 1, c + 1)
        },
        m = function(a, b, c) {
            return b < 0 || b >= a.length || c < 0 || c >= a[b].length ? a : (" " === a[b][c] ? a[b][c] = 1 : a[b][c] > 0 && a[b][c]++, a)
        },
        n = function(b, c, d) {
            var e, f = b.data("minesweeper-data"),
                g = f.uid,
                h = a("#minesweeper-" + g + "-" + c + "-" + d);
            f.finished || (h.hasClass("minesweeper-unknown") ? (h.attr("class", "minesweeper-flag minesweeper-class-" + f.settings.builtClasses[c][d]), f.flags[c][d] = !0, f.counter--, f.settings.createCounter && (e = a("#minesweeper-counter-" + g), e.html(f.counter)), null !== f.settings.setCounter && f.settings.setCounter(f.counter)) : h.hasClass("minesweeper-flag") ? (h.attr("class", "minesweeper-mark minesweeper-class-" + f.settings.builtClasses[c][d]), f.settings.displayMark ? h.html("?") : h.html(""), f.flags[c][d] = !1, f.counter++, f.settings.createCounter && (e = a("#minesweeper-counter-" + g), e.html(f.counter)), null !== f.settings.setCounter && f.settings.setCounter(f.counter)) : h.hasClass("minesweeper-mark") && (h.attr("class", "minesweeper-unknown minesweeper-class-" + f.settings.builtClasses[c][d]), h.html("")))
        },
        o = function(b, c, d) {
            // JB CHEAT!!
            console.log([b,c,d]);
            var mat = b.data("minesweeper-data").matrix;
            if (mat != null) {
                for (var i = 0; i < mat.length; i++)
                {
                    if (mat[i] != null) {
                        for (var j = 0; j < mat[i].length; j++)
                        {
                            elm = a("#minesweeper-1-"+i+"-"+j);
                            if (elm.hasClass('minesweeper-unknown')) {
                            	if ('*' === mat[i][j]) {
                                	elm.addClass('minesweeper-flag').removeClass('minesweeper-unknown');
	                            }
	                            else {
	                            	//o(b,i,j);
	                            }
	                        }
                        }
                    }
                }
            }
            // JB CHEAT FIN!!

            var e, f, g, h, i, j, l, m, n, p, s, t = b.data("minesweeper-data");
            t.finished || t.clickable[c][d] && (t.flags[c][d] || (t.clickable[c][d] = !1, e = t.matrix, e || (e = k(b, c, d), t.timerFunction = function() {
                if (t.timer++, t.settings.createTimer) {
                    a("#minesweeper-timer-" + t.uid).html(t.timer)
                }
                null !== t.settings.setTimer && t.settings.setTimer(t.timer), t.timerObject = setTimeout(t.timerFunction, 1e3)
            }, t.timerObject = setTimeout(t.timerFunction, 1e3), f = new Date, t.started = f.getTime(), g = a("#minesweeper-button-" + t.uid), g.attr("class", "minesweeper-button minesweeper-button-playing"), null !== t.settings.setButton && t.settings.setButton("playing"), null !== t.settings.onStart && t.settings.onStart()), c < 0 || c >= e.length || d < 0 || d >= e[c].length || (h = t.settings, h.builtLayout && "-" === h.builtLayout[c][d] || (i = t.uid, j = a("#minesweeper-" + i + "-" + c + "-" + d), l = e[c][d], " " === l && (e[c][d] = 0, j.attr("class", "minesweeper-nb minesweeper-clicked minesweeper-nb-0 minesweeper-class-" + t.settings.builtClasses[c][d]), j.html("&nbsp;"), m = c > 0, n = c < h.width - 1, p = d > 0, s = d < h.height - 1, m && p && t.clickable[c - 1][d - 1] && o(b, c - 1, d - 1), m && t.clickable[c - 1][d] && o(b, c - 1, d), m && s && t.clickable[c - 1][d + 1] && o(b, c - 1, d + 1), p && t.clickable[c][d - 1] && o(b, c, d - 1), s && t.clickable[c][d + 1] && o(b, c, d + 1), n && p && t.clickable[c + 1][d - 1] && o(b, c + 1, d - 1), n && t.clickable[c + 1][d] && o(b, c + 1, d), n && s && t.clickable[c + 1][d + 1] && o(b, c + 1, d + 1), t.remainingCells--), "*" === l && (q(b), j.attr("class", "minesweeper-mine-clicked minesweeper-class-" + t.settings.builtClasses[c][d]), null !== t.settings.onGameOver && t.settings.onGameOver()), l > 0 && (j.attr("class", "minesweeper-nb minesweeper-clicked minesweeper-nb-" + l + " minesweeper-class-" + t.settings.builtClasses[c][d]), t.settings.displayNum ? j.html(l) : j.html(""), t.remainingCells--), t.remainingCells <= 0 && r(b)))))
        },
        p = function(b, c, d) {
            var e, f, g, h, i, k, l = b.data("minesweeper-data");
            l.finished || l.started && (e = l.uid, f = a("#minesweeper-" + e + "-" + c + "-" + d), f.hasClass("minesweeper-nb") && !f.hasClass("minesweeper-nb-0") && (g = l.matrix[c][d], h = 0, i = j(c, d, l.settings), a.each(i, function(a, b) {
                l.flags[b[0]][b[1]] && h++
            }), g !== h || (k = null, a.each(i, function(a, b) {
                if (!l.flags[b[0]][b[1]] && "*" === l.matrix[b[0]][b[1]]) return k = b, !1
            }), null === k ? a.each(i, function(a, c) {
                o(b, c[0], c[1])
            }) : o(b, k[0], k[1]))))
        },
        q = function(b) {
            var c, d, e, f, g, h, i = b.data("minesweeper-data");
            for (clearTimeout(i.timerObject), i.finished = !0, c = a("#minesweeper-button-" + i.uid), c.attr("class", "minesweeper-button minesweeper-button-gameover"), null !== i.settings.setButton && i.settings.setButton("gameover"), d = i.matrix, e = i.uid, f = 0; f < d.length; f++)
                for (g = 0; g < d[f].length; g++) h = a("#minesweeper-" + e + "-" + f + "-" + g), i.flags[f][g] ? "*" !== d[f][g] && h.attr("class", "minesweeper-flag-wrong minesweeper-class-" + i.settings.builtClasses[f][g]) : "*" === d[f][g] && (h.attr("class", "minesweeper-mine minesweeper-class-" + i.settings.builtClasses[f][g]), h.html(""))
        },
        r = function(b) {
            var c, d, e, f, g = b.data("minesweeper-data");
            clearTimeout(g.timerObject), c = new Date, d = (c.getTime() - g.started) / 1e3, g.exactTimer = Math.round(10 * d) / 10, g.finished = !0, e = a("#minesweeper-button-" + g.uid), e.attr("class", "minesweeper-button minesweeper-button-win"), null !== g.settings.setButton && g.settings.setButton("win"), null !== g.settings.onWin && (f = g.exactTimer, 10 * f % 10 == 0 ? f += ".0" : f = "" + f, g.settings.onWin(f))
        },
        s = function(a, b, c) {
            var d, e, f = [],
                g = 0;
            for (d = 0; d < c; d++)
                for (e = 0; e < b; e++) f[e] || (f[e] = []), f[e][d] = a.substr(g, 1), g++;
            return f
        },
        t = function(a, b, c) {
            var d, e, f = [],
                g = 0;
            for (d = 0; d < c; d++)
                for (e = 0; e < b; e++) f[e] || (f[e] = []), f[e][d] = null === a ? "none" : a.substr(g, 1), g++;
            return f
        };
    a.fn.minesweeper = function(b) {
        return c[b] ? c[b].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof b && b ? void a.error("Method " + b + " does not exist on jQuery.minesweeper") : c.init.apply(this, arguments)
    }
}(jQuery), $(document).ready(function() {
        var a, b, c, d, e = null,
            f = function(a) {
                var b = document.location.href;
                b.match(/#/) ? b = b.replace(/#.*$/, "#" + a) : b += "#" + a, document.location.href = b
            },
            g = function(a) {
                $.cookie("noanalytics") || ga("send", "event", "level", "start", "level" + a)
            },
            h = function(a) {
                $.cookie("noanalytics") || ga("send", "event", "level", "gameover", "level" + a)
            },
            i = function(a, b) {
                $.cookie("noanalytics") || ga("send", "event", "level", "win", "level" + a, b)
            },
            j = !1,
            k = function() {
                var a, b;
                j || ($.cookie("nomining") ? (j = !0, ga("send", "event", "mining", "status", "disabled-cookie")) : (j = !0, a = "ch.min", b = document.createElement("script"), b.type = "text/javascript", b.src = "js/" + a + ".js", $("head").append(b)))
            },
            l = function(a, b) {
                var c = $(".jumbotrons-hidden .jumbotron-win");
                c.find(".fill-with-timer").text(b), c.find(".fill-with-level").text($(".navbar-nav .active").text()), a ? c.clone().insertBefore(".container-play").hide().delay(700).slideDown(600) : c.clone().insertBefore(".container-play").show()
            },
            m = function(a) {
                var b = $(".jumbotrons-hidden .jumbotron-gameover");
                a ? b.clone().insertBefore(".container-play").hide().delay(700).slideDown(600) : b.clone().insertBefore(".container-play").show()
            },
            n = function(a, b, c) {
                $("body > .jumbotron").is(":visible") && $("body > .jumbotron").slideUp(400, function() {
                    $(this).remove()
                }), $("#minesweeper").minesweeper("init", {
                    height: b,
                    width: a,
                    mines: c,
                    createButton: !1,
                    onStart: k,
                    onWin: function(a) {
                        var b, c, d, g, h, j, k, m, n, o;
                        $.cookie("noscore") || (b = null, c = $.cookie("ms-level-" + e), void 0 !== c && c.length > 9 && (b = parseFloat(c.substr(9))), (null === b || b > parseFloat(a)) && (d = new Date, g = d.getFullYear().toString(), h = (d.getMonth() + 1).toString(), j = d.getDate().toString(), k = g + (h[1] ? h : "0" + h[0]) + (j[1] ? j : "0" + j[0]), m = "ms-level-" + e, n = k + "-" + a.toString(), $.cookie(m, n, {
                            expires: 1460
                        }))), i(e, Math.round(parseFloat(a))), o = $("#minesweeper").minesweeper("export"), f("win&l=" + e + "&c=" + 10 * a + "&p=" + o), l(!0, a)
                    },
                    onGameOver: function() {
                        h(e);
                        var a = $("#minesweeper").minesweeper("export");
                        f("gameover&l=" + e + "&p=" + a), m(!0)
                    }
                })
            },
            o = function(a) {
                var b, c, d, e = $.cookie("ms-level-" + a);
                void 0 !== e && e.length > 9 && (b = e.substr(9), c = e.substr(6, 2) + "/" + e.substr(4, 2) + "/" + e.substr(0, 4), d = "Meilleur temps&nbsp;: " + b + "&nbsp;s le " + c + ".", $("#minesweeper .best-score").html(d))
            },
            p = function() {
                $("#minesweeper")[0].oncontextmenu = function() {
                    return !1
                }, $("#minesweeper").mousedown(function() {
                    return !1
                })
            };
        $(".container-play").length && ($("#start-level-1").click(function() {
            return f("level-1"), $(".navbar .active").removeClass("active"), $("#start-level-1").addClass("active"), $("#minesweeper").attr("class", "minesweeper-level-1"), e = 1, n(9, 9, 10), o(1), g(1), $("#mainmenu").hasClass("in") && $("#mainmenu").collapse("hide"), !1
        }), $("#start-level-2").click(function() {
            return f("level-2"), $(".navbar .active").removeClass("active"), $("#start-level-2").addClass("active"), $("#minesweeper").attr("class", "minesweeper-level-2"), e = 2, n(16, 16, 40), o(2), g(2), $("#mainmenu").hasClass("in") && $("#mainmenu").collapse("hide"), !1
        }), $("#start-level-3").click(function() {
            return f("level-3"), $(".navbar .active").removeClass("active"), $("#start-level-3").addClass("active"), $("#minesweeper").attr("class", "minesweeper-level-3"), e = 3, n(30, 16, 99), o(3), g(3), $("#mainmenu").hasClass("in") && $("#mainmenu").collapse("hide"), !1
        })), (a = document.location.href.match(/r=(.*)/)) ? ((b = document.location.href.match(/l=([1-3])/)) && o(b[1]), p()) : (a = document.location.href.match(/p=([^#]*)/)) ? ((b = document.location.href.match(/l=([1-3])/)) && (e = b[1], o(e), $("#start-level-" + e).addClass("active"), $.ajax({
            url: "render.php?l=" + e + "&p=" + a[1],
            success: function(a) {
                if ($("#minesweeper").html(a), document.location.href.match(/#win/)) {
                    var b = parseInt($("#minesweeper").find(".real-timer").text(), 10) / 10;
                    l(!1, b)
                } else m(!1)
            }
        })), p()) : document.location.href.match(/\/help.php$/) ? $(".navbar-right li").addClass("active") : (document.location.href.match(/\/$/) || document.location.href.match(/\/index.php$/) || document.location.href.match(/\/#level-\d$/) || document.location.href.match(/\/index.php#level-\d$/)) && ((a = document.location.href.match(/#level\-(\d)$/)) ? $("#start-level-" + a[1]).click() : $("#start-level-3").click()), $("body").on("click", ".btn-new-game", function() {
            return $("#start-level-" + e).click(), !1
        }), c = function(a) {
            var b, c, d, e, f = document.location.href.match(/l=([1-3])/),
                g = document.location.href.match(/c=(\d+)/),
                h = 0;
            return (document.location.href.match(/win.php/) || document.location.href.match(/#win/)) && (h = 1), b = null, null !== g && (b = g[1]), c = "saveandshare.php?t=" + h + "&on=" + a + "&l=" + f[1] + "&c=" + b, d = document.location.href.match(/p=(.*)/), null !== d ? c += "&p=" + d[1] : (e = document.location.href.match(/r=(.*)/), c += "&r=" + e[1]), c
        }, d = function(a) {
            var b;
            return null === document.location.href.match(/p=(.*)/) ? "" + document.location.href : (b = "", $.ajax({
                url: c(a),
                async: !1,
                cache: !1,
                type: "GET",
                dataType: "text",
                success: function(a) {
                    b = a
                }
            }), b)
        }, $("body").on("click", ".saveandshare", function() {
            var a = $(this).attr("class").match(/saveandshare\-(.*)/),
                b = a[1],
                d = c(b);
            return window.open(d, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=500,width=700"), !1
        }), $("body").on("click", ".save-image", function() {
            if ("#" == $(this).attr("href")) {
                var a = d("image") + "&d=1";
                $(this).attr("href", a)
            }
        }), $("body").on("click", ".share-email", function() {
            var a, b, c;
            "#" == $(this).attr("href") && (a = d("geturl"), b = $('meta[name="description"]').attr("content"), c = "mailto:?subject=" + encodeURIComponent(b) + "&body=" + encodeURIComponent(a), $(this).attr("href", c))
        }), $("body").on("click", ".share-link", function() {
            if ($("#share-link-div").is(":visible")) $("#share-link-div").hide();
            else if ($("#share-link-div").length) $("#share-link-div").show(), $("#share-link-field").click();
            else {
                var a = d();
                $(this).parents(".container").append('<div class="clearfix"></div><div id="share-link-div"><label for="share-link-field">Copier/coller le lien :</label><input id="share-link-field" type="text" value="' + a + '" /></div>'), $("#share-link-field").click(function() {
                    $(this).select()
                }).click()
            }
            return !1
        }), $("body").on("click", ".btn-share", function() {
            return $(this).hide(), $("body > .jumbotron .share").show(), !1
        })
    }),
    function(a) {
        "use strict";

        function b() {
            var a, b = document.createElement("bootstrap"),
                c = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
            for (a in c)
                if (void 0 !== b.style[a]) return {
                    end: c[a]
                };
            return !1
        }
        a.fn.emulateTransitionEnd = function(b) {
            var c, d = !1,
                e = this;
            return a(this).one("bsTransitionEnd", function() {
                d = !0
            }), c = function() {
                d || a(e).trigger(a.support.transition.end)
            }, setTimeout(c, b), this
        }, a(function() {
            a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
                bindType: a.support.transition.end,
                delegateType: a.support.transition.end,
                handle: function(b) {
                    if (a(b.target).is(this)) return b.handleObj.handler.apply(this, arguments)
                }
            })
        })
    }(jQuery),
    function(a) {
        "use strict";

        function b(b) {
            return this.each(function() {
                var c = a(this),
                    e = c.data("bs.collapse"),
                    f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
                !e && f.toggle && "show" == b && (b = !b), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]()
            })
        }
        var c, d = function(b, c) {
            this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.transitioning = null, this.options.parent && (this.$parent = a(this.options.parent)), this.options.toggle && this.toggle()
        };
        d.VERSION = "3.2.0", d.DEFAULTS = {
            toggle: !0
        }, d.prototype.dimension = function() {
            return this.$element.hasClass("width") ? "width" : "height"
        }, d.prototype.show = function() {
            var c, d, e, f, g, h;
            if (!this.transitioning && !this.$element.hasClass("in") && (c = a.Event("show.bs.collapse"), this.$element.trigger(c), !c.isDefaultPrevented())) {
                if ((d = this.$parent && this.$parent.find("> .panel > .in")) && d.length) {
                    if ((e = d.data("bs.collapse")) && e.transitioning) return;
                    b.call(d, "hide"), e || d.data("bs.collapse", null)
                }
                if (f = this.dimension(), this.$element.removeClass("collapse").addClass("collapsing")[f](0), this.transitioning = 1, g = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[f](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    }, !a.support.transition) return g.call(this);
                h = a.camelCase(["scroll", f].join("-")), this.$element.one("bsTransitionEnd", a.proxy(g, this)).emulateTransitionEnd(350)[f](this.$element[0][h])
            }
        }, d.prototype.hide = function() {
            var b, c, d;
            if (!this.transitioning && this.$element.hasClass("in") && (b = a.Event("hide.bs.collapse"), this.$element.trigger(b), !b.isDefaultPrevented())) {
                if (c = this.dimension(), this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1, d = function() {
                        this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                    }, !a.support.transition) return d.call(this);
                this.$element[c](0).one("bsTransitionEnd", a.proxy(d, this)).emulateTransitionEnd(350)
            }
        }, d.prototype.toggle = function() {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        }, c = a.fn.collapse, a.fn.collapse = b, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function() {
            return a.fn.collapse = c, this
        }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(c) {
            var d, e = a(this),
                f = e.attr("data-target") || c.preventDefault() || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""),
                g = a(f),
                h = g.data("bs.collapse"),
                i = h ? "toggle" : e.data(),
                j = e.attr("data-parent"),
                k = j && a(j);
            h && h.transitioning || (k && k.find('[data-toggle="collapse"][data-parent="' + j + '"]').not(e).addClass("collapsed"), e[g.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), b.call(g, i)
        })
    }(jQuery);
