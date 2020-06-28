//  CHSKIP0 - mostly used for dev options
//  CHSKIP1 - Cookies functions
//  CHSKIP2 - window.onload function
//  CHSKIP3 - toggle spells on and off and checks if selected < 2
//  CHSKIP4 - submit active spells and change to next with innerHTML then builds the site with the selected
//  CHSKIP5 - get the new html and sets events on classes and ids
//  CHSKIP6 - get lane function
//  CHSKIP7 - setting function and cookie add
//  CHSKIP8 - toggles the cds reduction
//  CHSKIP9 - get the cooldown of spells (only flash at the moment)
//  CHSKIP10 - starttimer controller

let oldactives = [];
let lanesubmit = [];
let newhtml;
let i1 = 0;
let i2 = 0;
let skip = false;
let domain = location.host + location.pathname;
let cdr;
let newcdr;
let value;
let gametime;
let activecache = 0;

//  CHSKIP0
//-------
let dev = true;

function skipselect() {
    lanesubmit = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1];
    skip = true;
    submit(lanesubmit);
}

//  CHSKIP1
//-------
function createCookie(key, value, date) {
    let expiration = new Date(date).toUTCString();
    let cookie =
        escape(key) + "=" + escape(value) + ";expires=" + expiration + ";";
    document.cookie = cookie;
}

function readCookie(name) {
    let key = name + "=";
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === " ") {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(key) === 0) {
            return cookie.substring(key.length, cookie.length);
        }
    }
    return null;
}

function checkifcookieispresent() {
    let str = readCookie(domain);
    if (str == null) {
        let arr = ["false", "false", "false"];
        createCookie(domain, arr, Date.UTC(newcookiedate()));
    }
}

function newcookiedate() {
    let d = new Date();
    let date = d.getUTCDate();
    let month = d.getUTCMonth() + 1;
    let year = d.getUTCFullYear() + 1;
    let dateStr = Date.UTC(year, month, date);
    return dateStr;
}

function readcookies() {
    let str = readCookie(domain);
    let arr = [];
    let res = str.split("%2C");
    arr = res;
    return arr;
}

//  CHSKIP2
//-------
window.onload = function () {
    checkifcookieispresent();
    document.querySelectorAll(".spellselect").forEach(img => img.addEventListener("click", toggle, false));
    document.getElementsByClassName("submit")[0].addEventListener("click", submit, false);
    if (dev == true) {
        $(
            '<input type="image" class="skip" id="skip" src="assets/ui/Skip.png">'
        ).insertAfter(".submit");
        document.getElementsByClassName("skip")[0].addEventListener("click", skipselect, false);
    }
};

//  CHSKIP3
//-------
function toggle() {
    function checkactives(a1) {
        let activesnmb = 0;
        let searchfor = "active";
        for (let i = 0; i < a1.length; i++) {
            let selector = a1[i].classList;
            let actives = selector.contains(searchfor);
            if (actives == true) {
                activesnmb++;
            }
        }
        return activesnmb;
    }

    if (
        checkactives(
            document.getElementById("selectionimgs").querySelectorAll(".spellselect")
        ) < 2
    ) {
        if (oldactives[0] != this.id) {
            this.classList.toggle("active");
            oldactives.push(this.id);
            this.style.filter = "saturate(100%)";
        } else {
            oldactives.shift();
            this.classList.toggle("active");
            this.style.filter = "saturate(0%)";
        }
    } else {
        let getspells = document.getElementsByClassName("spellselect");
        if (oldactives[0] == this.id) {
            getspells[oldactives[0]].classList.toggle("active");
            this.style.filter = "saturate(100%)";
            oldactives.shift();
        }

        if (oldactives[1] == this.id) {
            getspells[oldactives[1]].classList.toggle("active");
            this.style.filter = "saturate(0%)";
            oldactives.pop();
        }

        if (
            oldactives[0] != this.id &&
            oldactives[1] != this.id &&
            oldactives.length != 1
        ) {
            getspells[oldactives[0]].classList.toggle("active");
            getspells[oldactives[0]].style.filter = "saturate(0%)";
            getspells[this.id].classList.toggle("active");
            getspells[this.id].style.filter = "saturate(100%)";
            oldactives.shift();
            oldactives.push(this.id);
        }
    }
}

//  CHSKIP4
//-------
async function submit(g2) {
    if (skip == false || skip == undefined) {
        if (oldactives.length != 2) {
            alert(
                "Please select two spells. " +
                "Currently Selected: " +
                oldactives.length +
                " of 2"
            );
        } else {
            lanesubmit.push(oldactives[0]);
            lanesubmit.push(oldactives[1]);
            let getspells = document.getElementsByClassName("spellselect");
            getspells[oldactives[0]].style.filter = "saturate(0%)";
            getspells[oldactives[1]].style.filter = "saturate(0%)";
        }
    } else if (skip == true) {
        lanesubmit = g2;
    }
    switch (lanesubmit.length) {
        case 2:
            document.getElementById("heading").children[0].innerHTML =
                '<img src="assets/laneicons/Jungle_icon.png" draggable="false" class="laneicon" id="s0" width="50" height="50"/>Jungle';
            document.getElementsByClassName("spellselect")[oldactives[0]].classList.toggle("active");
            document.getElementsByClassName("spellselect")[oldactives[1]].classList.toggle("active");
            oldactives = [];
            break;
        case 4:
            document.getElementById("heading").children[0].innerHTML =
                '<img src="assets/laneicons/Middle_icon.png" draggable="false" class="laneicon" id="s0" width="50" height="50"/>Midlane';
            document.getElementsByClassName("spellselect")[oldactives[0]].classList.toggle("active");
            document.getElementsByClassName("spellselect")[oldactives[1]].classList.toggle("active");
            oldactives = [];
            break;
        case 6:
            document.getElementById("heading").children[0].innerHTML =
                '<img src="assets/laneicons/Bottom_icon.png" draggable="false" class="laneicon" id="s0" width="50" height="50"/>Botlane';
            document.getElementsByClassName("spellselect")[oldactives[0]].classList.toggle("active");
            document.getElementsByClassName("spellselect")[oldactives[1]].classList.toggle("active");
            oldactives = [];
            break;
        case 8:
            document.getElementById("heading").children[0].innerHTML =
                '<img src="assets/laneicons/Support_icon.png" draggable="false" class="laneicon" id="s0" width="50" height="50"/>Support';
            document.getElementsByClassName("spellselect")[oldactives[0]].classList.toggle("active");
            document.getElementsByClassName("spellselect")[oldactives[1]].classList.toggle("active");
            oldactives = [];
            break;
        case 10:
            let json = fetch("summoners.json")
                .then(response => response.json())
                .then(json => {
                    function buildhtml(num, check) {
                        let A1;
                        let A1alt;
                        let B1;
                        let C1;
                        let C2;
                        let D1;
                        let D2;
                        switch (num) {
                            case 0:
                                A1 = "Toplane";
                                A1alt =
                                    '<img src="assets/laneicons/Top_icon.png" draggable="false" class="laneicon" id="s0" width="50" height="50"/>';
                                B1 = "top";
                                C1 = i1;
                                C2 = i1 + 1;
                                D1 = i2;
                                D2 = i2 + 1;
                                break;
                            case 1:
                                A1 = "Jungle";
                                A1alt =
                                    '<img src="assets/laneicons/Jungle_icon.png" draggable="false" class="laneicon" id="s0" width="50" height="50"/>';
                                B1 = "jungle";
                                C1 = i1;
                                C2 = i1 + 1;
                                D1 = i2;
                                D2 = i2 + 1;
                                break;
                            case 2:
                                A1 = "Midlane";
                                A1alt =
                                    '<img src="assets/laneicons/Middle_icon.png" draggable="false" class="laneicon" id="s0" width="50" height="50"/>';
                                B1 = "mid";
                                C1 = i1;
                                C2 = i1 + 1;
                                D1 = i2;
                                D2 = i2 + 1;
                                break;
                            case 3:
                                A1 = "Botlane";
                                A1alt =
                                    '<img src="assets/laneicons/Bottom_icon.png" draggable="false" class="laneicon" id="s0" width="50" height="50"/>';
                                B1 = "bot";
                                C1 = i1;
                                C2 = i1 + 1;
                                D1 = i2;
                                D2 = i2 + 1;
                                break;
                            case 4:
                                A1 = "Support";
                                A1alt =
                                    '<img src="assets/laneicons/Support_icon.png" draggable="false" class="laneicon" id="s0" width="50" height="50"/>';
                                B1 = "support";
                                C1 = i1;
                                C2 = i1 + 1;
                                D1 = i2;
                                D2 = i2 + 1;
                                break;
                        }
                        let H1 =
                            '<div id="' +
                            B1 +
                            '"><h1>' +
                            A1 +
                            '</h1><div id="' +
                            B1 +
                            'spells" class="sums">';
                        let H1alt =
                            '<div id="' +
                            B1 +
                            '"><h1>' +
                            A1alt +
                            '</h1><div id="' +
                            B1 +
                            'spells" class="sums">';
                        let H2 =
                            '<img src="' +
                            json.spells[lanesubmit[D1]].url +
                            '"draggable="false" id="' +
                            C1 +
                            '" class="spell ' +
                            json.spells[lanesubmit[D1]].name +
                            " " +
                            B1 +
                            '" active="false"/><img src="' +
                            json.spells[lanesubmit[D2]].url +
                            '"draggable="false" id="' +
                            C2 +
                            '" class="spell ' +
                            json.spells[lanesubmit[D2]].name +
                            " " +
                            B1 +
                            '" active="false"/></div>';
                        let H3 =
                            '<p id="' +
                            B1 +
                            'timer"><span class="timer" style="text-align: center; display: inline-block; min-width: 30px;">Up!</span><span class="timer" style="text-align: center; display: inline-block; min-width: 30px;">Up!</span></p><div class="cdr" id="' +
                            B1 +
                            'cdr" value="1"><img src="' +
                            json.misc[0].url +
                            '"draggable="false"class="boots"active="false"onclick="cdrToggle(0,' +
                            "'" +
                            B1 +
                            "'" +
                            ')"/><img src="' +
                            json.misc[1].url +
                            '"draggable="false"class="mastery"active="false"onclick="cdrToggle(1,' +
                            "'" +
                            B1 +
                            "'" +
                            ')"/></div></div>';
                        i1 = i1 + 2;
                        i2 = i2 + 2;
                        if (check == true) {
                            return H1alt + H2 + H3;
                        } else {
                            return H1 + H2 + H3;
                        }
                    }

                    let htmltester = readcookies();
                    let check;
                    if (htmltester[0] == "true") {
                        check = true;
                    } else {
                        check = false;
                    }

                    let start = '<div class="main">';

                    function settingspop() {
                        let A1 =
                            '<input type="image" class="settings" id="settings" href="#test-popup" src="assets/ui/LeagueClientRoundSettings.png"><div id="test-popup" class="white-popup mfp-hide"<h1>Settings</h1><fieldset style="border:0;">';
                        let A2;
                        if (htmltester[0] == "true") {
                            A2 =
                                '<p><input type="checkbox" id="texttoicons" class="check_box" checked><label for="texttoicons"></label><label for="name">Use Lane Icons</label></p>';
                        } else {
                            A2 =
                                '<p><input type="checkbox" id="texttoicons" class="check_box"><label for="texttoicons"></label><label for="name">Use Lane Icons</label></p>';
                        }
                        let A3;
                        if (htmltester[1] == "true") {
                            A3 =
                                '<p><input type="checkbox" id="cdtominsec" class="check_box" checked><label for="cdtominsec"></label><label for="name">Use Min:Sec for Cooldowns</label></p>';
                        } else {
                            A3 =
                                '<p><input type="checkbox" id="cdtominsec" class="check_box"><label for="cdtominsec"></label><label for="name">Use Min:Sec for Cooldowns</label></p>';
                        }
                        let A4;
                        if (htmltester[2] == "true") {
                            A4 =
                                '<p><input type="checkbox" id="onlyactivecds" class="check_box" checked><label for="onlyactivecds"></label><label for="name">Only Copy Flashes on Cooldown</label></p>';
                        } else {
                            A4 =
                                '<p><input type="checkbox" id="onlyactivecds" class="check_box"><label for="onlyactivecds"></label><label for="name">Only Copy Flashes on Cooldown</label></p>';
                        }
                        let A5 = '</div><div class="lanecont">';
                        return A1 + A2 + A3 + A4 + A5;
                    }

                    let end =
                        '<br><div class="startdiv"><input type="image" class="starttimer" id="starttimer" src="assets/ui/ClientStart.png"></div><p id="gametimer" class="gametimer"></p><br><input type="image" class="copycds" id="copycds" src="assets/ui/LeagueClientButton.png"><input type="text" id="copyfield" name="copyfield"></div></div>';

                    newhtml =
                        start +
                        settingspop() +
                        buildhtml(0, check) +
                        buildhtml(1, check) +
                        buildhtml(2, check) +
                        buildhtml(3, check) +
                        buildhtml(4, check) +
                        end;
                    loadandbug((document.body.innerHTML = newhtml));
                });
            break;
    }
}

//  CHSKIP5
//-------
async function loadandbug(kys) {
    await kys;
    document.querySelectorAll(".spell").forEach(btn => btn.addEventListener("click", startTimer, false));
    document.getElementById("gametimer").innerHTML = "00:00";
    document.getElementsByClassName("starttimer")[0].addEventListener("click", startgame, false);
    document.getElementsByClassName("copycds")[0].addEventListener("click", getcdstocopy, false);
    document.getElementById("copyfield").readOnly = true;
    document.getElementById("copyfield").onclick = function () {
        this.select();
        document.execCommand("copy");
    };
    $(".settings").magnificPopup({
        type: "inline",
        midClick: true,
        callbacks: {
            open: function () {
                document.getElementsByClassName("mfp-close")[0].innerText = "";
                document.getElementsByClassName("mfp-close")[0].classList.add("closebuttonpop");
            },
            close: function () {
                changesettings();
            }
        }
    });
}

//  CHSKIP6
//-------
function getLane(wanted) {
    let sel = "#" + `${wanted}`;
    return document.querySelector(sel);
}

//  CHSKIP7
//-------
async function changesettings() {
    if (document.getElementById("texttoicons").checked == true) {
        document.getElementById("top").children[0].innerHTML =
            '<img src="assets/laneicons/Top_icon.png" draggable="false" class="laneicon" id="s0" width="50" height="50"/>';
        document.getElementById("jungle").children[0].innerHTML =
            '<img src="assets/laneicons/Jungle_icon.png" draggable="false" class="laneicon" id="s0" width="50" height="50"/>';
        document.getElementById("mid").children[0].innerHTML =
            '<img src="assets/laneicons/Middle_icon.png" draggable="false" class="laneicon" id="s0" width="50" height="50"/>';
        document.getElementById("bot").children[0].innerHTML =
            '<img src="assets/laneicons/Bottom_icon.png" draggable="false" class="laneicon" id="s0" width="50" height="50"/>';
        document.getElementById("support").children[0].innerHTML =
            '<img src="assets/laneicons/Support_icon.png" draggable="false" class="laneicon" id="s0" width="50" height="50"/>';
        let check = readcookies();
        check[0] = "true";
        createCookie(domain, check, Date.UTC(newcookiedate()));
    } else if (document.getElementById("texttoicons").checked == false) {
        document.getElementById("top").children[0].innerHTML = "Toplane";
        document.getElementById("jungle").children[0].innerHTML = "Jungle";
        document.getElementById("mid").children[0].innerHTML = "Midlane";
        document.getElementById("bot").children[0].innerHTML = "Botlane";
        document.getElementById("support").children[0].innerHTML = "Support";
        let check = readcookies();
        check[0] = "false";
        createCookie(domain, check, Date.UTC(newcookiedate()));
    }

    if (document.getElementById("onlyactivecds").checked == true) {
        let check = readcookies();
        check[2] = "true";
        createCookie(domain, check, Date.UTC(newcookiedate()));
    } else {
        let check = readcookies();
        check[2] = "false";
        createCookie(domain, check, Date.UTC(newcookiedate()));
    }
    if (document.getElementById("cdtominsec").checked == true) {
        let check = readcookies();
        check[1] = "true";
        createCookie(domain, check, Date.UTC(newcookiedate()));
    } else {
        let check = readcookies();
        check[1] = "false";
        createCookie(domain, check, Date.UTC(newcookiedate()));
    }
}

function startgame() {
    document.getElementsByClassName("starttimer")[0].classList.add("pressed");

    let interval = 1000;
    let expected = Date.now() + interval;
    let start = Date.now();
    if (activecache == 0) {
        document.getElementById("gametimer").classList.toggle("active");
        activecache = 1;
    }
    setTimeout(step, interval);

    function step() {
        let dt = Date.now() - expected;
        if (dt > interval) {
            return console.log("Shits fucking fucked mate");
        }

        let current = Date.now();
        let diff = current - start;
        let ttlsecs = diff / 1000;
        let ttlmins = ttlsecs / 60;
        let secs = Math.floor(ttlsecs % 60);
        let mins = Math.floor(ttlmins % 60);
        secs >= 10 ? (secs = secs) : (secs = "0" + secs);
        mins >= 10 ? (mins = mins) : (mins = "0" + mins);
        let gametimestring = mins + ":" + secs;
        document.getElementById("gametimer").innerHTML = gametimestring;
        expected += interval;
        setTimeout(step, Math.max(0, interval - dt));
    }
}

//  CHSKIP8
//-------
function getcdstocopy() {
    let copyarr = [];
    if (document.getElementsByClassName("flash").length != 0) {
        let flashes = document.getElementsByClassName("flash");
        for (let i = 0; i < flashes.length; i++) {
            let lanes = document.getElementsByClassName("spell")[flashes[i].id]
                .classList[2];
            lanes = lanes.charAt(0).toUpperCase() + lanes.slice(1);
            let timercaches = document.getElementsByClassName("timer")[flashes[i].id];
            if (activecache == 1) {
                let timer = document.getElementById("gametimer").innerHTML;
                if (timercaches.innerHTML != "Up!") {
                    function timeconvert(a1) {
                        let searchfor = ":";
                        let timesearchfor = a1.search(searchfor);
                        if (timesearchfor == -1) {
                            let a2 = parseInt(a1);
                            return a2;
                        } else {
                            let res = a1.split(":");
                            let b1 = parseInt(res[0]);
                            let b2 = parseInt(res[1]);
                            let newtimer = Math.floor(b1 * 60 + b2);
                            return newtimer;
                        }
                    }

                    function converttime(a1, a2) {
                        let newseconds = Math.floor(a1 + a2);
                        let minutes = Math.floor(newseconds / 60);
                        let seconds = newseconds - minutes * 60;
                        seconds >= 10 ? (seconds = seconds) : (seconds = "0" + seconds);
                        minutes >= 10 ? (minutes = minutes) : (minutes = "0" + minutes);
                        return minutes + ":" + seconds;
                    }
                    copyarr.push(
                        lanes +
                        ": " +
                        converttime(
                            timeconvert(timercaches.innerHTML),
                            timeconvert(timer)
                        )
                    );
                } else {
                    if (document.getElementById("onlyactivecds").checked == true) {} else {
                        copyarr.push(lanes + ": " + timercaches.innerHTML);
                    }
                }
            } else {
                return alert("Please start the game first!");
            }
        }
        if (copyarr.length != 0) {
            document.getElementById("copyfield").value = copyarr.join(" ");
        }

        function copylole() {
            document.getElementById("copyfield").select();
            document.execCommand("copy");
        }
        copylole();
    } else {
        document.getElementById("copyfield").value = "There is no Flash spell.";
    }
}

//  CHSKIP9
//-------
function cdrToggle(ver, lane) {
    let boots = getLane(lane).getElementsByClassName("boots")[0];
    let mastery = getLane(lane).getElementsByClassName("mastery")[0];
    cdr = getLane(lane).getElementsByClassName("cdr")[0];
    value = Number(cdr.getAttributeNode("value").nodeValue);

    switch (ver) {
        case 0:
            if (boots.getAttributeNode("active").nodeValue == "true") {
                newcdr = newcdr + 0.1;
                cdr.setAttribute("value", newcdr);
                boots.classList.toggle("active");
                boots.setAttribute("active", false);
            } else if (boots.getAttributeNode("active").nodeValue == "false") {
                newcdr = value - 0.1;
                boots.classList.toggle("active");
                cdr.setAttribute("value", newcdr);
                boots.setAttribute("active", true);
            }
            break;
        case 1:
            if (mastery.getAttributeNode("active").nodeValue == "true") {
                newcdr = newcdr + 0.05;
                cdr.setAttribute("value", newcdr);
                mastery.classList.toggle("active");
                mastery.setAttribute("active", false);
            } else if (mastery.getAttributeNode("active").nodeValue == "false") {
                newcdr = value - 0.05;
                cdr.setAttribute("value", newcdr);
                mastery.classList.toggle("active");
                mastery.setAttribute("active", true);
            }
            break;
    }
}

//  CHSKIP10
//-------
function startTimer() {
    if (activecache == 1) {
        let json1 = fetch("./summoners.json")
            .then(response => response.json())
            .then(json1 => {
                let x = this.id;
                let timer = document.getElementsByClassName("timer")[x];
                let spell = document.getElementsByClassName("spell")[x];
                let cdrval = Number(
                    getLane(document.querySelectorAll(".spell")[x].classList[2]).getElementsByClassName("cdr")[0].getAttributeNode("value").nodeValue
                );
                let spellinfo = json1.spells.find(
                    record => record.name === spell.classList[1]
                );
                let time = spellinfo.cd * cdrval;

                if (spell.getAttributeNode("active").nodeValue == "false") {
                    spell.classList.toggle("active");
                    if (document.getElementById("cdtominsec").checked == true) {
                        let firstframe = time.toFixed(0);
                        firstframe = firstframe < 10 ? "0" + firstframe : firstframe;
                        let t1 = Math.floor(firstframe / 60);
                        let t2 = firstframe - t1 * 60;
                        t2 >= 10 ? (t2 = t2) : (t2 = "0" + t2);
                        t1 >= 10 ? (t1 = t1) : (t1 = "0" + t1);
                        timer.textContent = t1 + ":" + t2;
                    } else {
                        let firstframe = time.toFixed(0);
                        firstframe = firstframe < 10 ? "0" + firstframe : firstframe;
                        timer.textContent = firstframe;
                    }
                    let toggle = "on"
                    startloop(time, timer, spell, x, toggle);
                    spell.setAttribute("active", true);
                } else if (spell.getAttributeNode("active").nodeValue == "true") {
                    let toggle = "off"
                    startloop(time, timer, spell, x, toggle)
                }
            });
    } else {
        return alert("Please start the game first!");
    }
}
let looptimer;
let myIntervals = {};

function startloop(time, timer, spell, x, toggle) {
    if (toggle == "on") {
        looptimer = setInterval(timerloop, 1000);
        myIntervals[x] = looptimer
    } else if (toggle == "off") {
        clearInterval(myIntervals[x]);
        spell.classList.toggle("active");
        timer.textContent = "Up!";
        spell.setAttribute("active", false);
    }

    function timerloop() {
        let seconds = time - 1;
        seconds =
            seconds < 10 ? "0" + Math.floor(seconds) : Math.floor(seconds);
        if (document.getElementById("cdtominsec").checked == true) {
            let minutes = Math.floor(seconds / 60);
            let schmeconds = seconds - minutes * 60;
            schmeconds >= 10 ?
                (schmeconds = schmeconds) :
                (schmeconds = "0" + schmeconds);
            minutes >= 10 ? (minutes = minutes) : (minutes = "0" + minutes);
            timer.textContent = minutes + ":" + schmeconds;
        } else {
            timer.textContent = seconds;
        }

        if (--time <= 0) {
            spell.classList.toggle("active");
            timer.textContent = "Up!";
            clearInterval(myIntervals[x]);
            spell.setAttribute("active", false);
            return;
        }
    }
}