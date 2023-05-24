Vue.component("ui-color", {
    template: `<div class="ui-color-box">
        <b :style="{background:value}" @click="select = !select"></b>
        <div class="ui-shadow"  v-if="select" @click.self="select = false"></div>
        <div class="color-list" v-if="select">
            <span v-for="color in colors" :key="color" :style="{background:color}" :data-active="color === value" @click="chose(color)"></span>
        </div>
    </div>`,
    data() {
        return {
            select: !1
        }
    },
    props: {
        value: String,
        colors: Array
    },
    methods: {
        chose(e) {
            this.select = !1,
            this.$emit("input", e)
        }
    }
}),
Vue.component("ui-font-switch", {
    template: '<b class="ui-font-switch-box" :data-checked="value" @click.prevent.stop="_switch"><slot></slot></b>',
    props: {
        value: Boolean
    },
    methods: {
        _switch() {
            this.$el.focus(),
            this.$emit("input", !this.value)
        }
    }
}),
Vue.component("ui-switch", {
    template: `<span class="ui-switch-box" :data-checked="value" @click="_switch">
        <a class="switch" :style="{color}">
            <i class="slider"></i>
        </a>
        <span><slot></slot></span>
    </span>`,
    props: {
        value: Boolean,
        color: String
    },
    methods: {
        _switch() {
            this.$emit("input", !this.value)
        }
    }
}),
Vue.component("ui-dialog", {
    template: `<div class="ui-shadow" @click.self="close">
        <div class="ui-dialog-box" :style="{width}">
            <div class="head">
                <h3 v-if="title">{{title}}</h3>
                <a class="close" @click="close"></a>
            </div>
            <div class="body">
                <slot></slot>
            </div>
        </div>
    </div>`,
    props: {
        title: String,
        width: String
    },
    methods: {
        close() {
            document.removeEventListener("keydown", this.keydown),
            this.$emit("close")
        },
        keydown(e) {
            27 === e.keyCode && this.close()
        }
    },
    mounted() {
        document.addEventListener("keydown", this.keydown)
    }
}),
Vue.component("ui-radio-group", {
    template: `<span class="ui-radio-group-box">
        <a v-for="item in options" @click="set(item.value)" :data-checked="item.value === value">{{item.text}}</a>
</span>`,
    props: {
        value: [String, Number],
        options: Array
    },
    methods: {
        set(e) {
            this.$emit("input", e)
        }
    }
}),
(e=>{
    const l = /windows/i.test(navigator.userAgent);
    e.component("canvas-text", {
        template: "<canvas></canvas>",
        data() {
            return {}
        },
        props: {
            config: Object
        },
        methods: {
            reDraw() {
                if (this.config) {
                    var t = this.config
                      , a = t.text || t.placeholder;
                    if (a) {
                        const i = this.$el
                          , r = i.getContext("2d");
                        X.text.setCtxConfig(r, t);
                        var d = r.measureText(a)
                          , c = d.width + 2 * X.text.padding
                          , d = (d.fontBoundingBoxDescent,
                        d.fontBoundingBoxAscent,
                        X.text.padding,
                        X.text.height + 2 * X.text.padding)
                          , c = Math.max(X.text.minWidth, c)
                          , c = (i.width = c,
                        i.height = d,
                        r.clearRect(0, 0, c, d),
                        X.text.setCtxConfig(r, t),
                        X.text.padding);
                        let e = d / 2;
                        l && (e += 4),
                        this.config.shadow && r.strokeText(a, c, e),
                        r.fillText(a, c, e)
                    }
                }
            }
        },
        mounted() {
            this.reDraw()
        },
        watch: {
            config: {
                handler(e, t) {
                    this.reDraw()
                },
                deep: !0
            }
        }
    })
}
)(Vue);
let host;
const U = (e,t="bg")=>{
    let a = new FormData;
    a.append("file", e);
    t = `{unix}-${t}-` + e.name.toLowerCase();
    return a.append("path", t),
    a.append("folder", "neta"),
    host && fetch(host + "api/upload/image", {
        method: "POST",
        mode: "cors",
        body: a
    }),
    e
}
;
let X = {
    forStep: function(t, a, d) {
        if (!t || !t.length)
            return d();
        t = Array.prototype.slice.call(t);
        let c = -1
          , i = t.length
          , r = ()=>{
            var e;
            ++c === i ? d && d() : (e = t[c],
            a.apply(t, [e, r, c]))
        }
        ;
        r()
    }
};
const mode = "lite";
X.uploadImage = e=>{
    if (e && e.file) {
        var t = e.file;
        let d = e.onupdated;
        if (/^image\//.test(t.type)) {
            let e = new FileReader;
            e.onload = e=>{
                let t = e.target.result
                  , a = new Image;
                a.onload = e=>{
                    d({
                        "image-url": t,
                        "image-width": a.naturalWidth,
                        "image-height": a.naturalHeight
                    })
                }
                ,
                a.src = t
            }
            ,
            e.readAsDataURL(t)
        }
    }
}
,
X.file = {},
X.file.form = document.createElement("form"),
X.file.input = document.createElement("input"),
X.file.input.type = "file",
X.file.form.appendChild(X.file.input),
X.chooseImageAndUploadToUpyun = t=>{
    const a = e=>{
        X.uploadImage({
            ...t,
            file: e
        })
    }
    ;
    X.chooseImage(e=>{
        if (U(e, t.folder),
        !t.maxWidth)
            return a(e);
        X.resizeImageFile2Blob({
            file: e,
            ...t,
            onOver: a
        })
    }
    )
}
,
X.resizeImageFile2Blob = ({file: r, maxWidth: l=800, onOver: o, type: s="image/jpeg"})=>{
    if (!r)
        return o();
    let e = new FileReader;
    e.onload = e=>{
        e = e.target.result;
        let i = new Image;
        i.onload = e=>{
            var t = i.naturalWidth
              , a = i.naturalHeight;
            const d = document.createElement("canvas");
            if (t < l)
                return o(r);
            a *= l / t,
            t = l,
            d.width = t,
            d.height = a;
            const c = d.getContext("2d");
            c.drawImage(i, 0, 0, t, a),
            d.toBlob(o, s, .8)
        }
        ,
        i.src = e
    }
    ,
    e.readAsDataURL(r)
}
,
X.chooseImage = t=>{
    X.file.form.reset(),
    X.file.input.multiple = !1,
    X.file.input.onchange = ()=>{
        var e = X.file.input.files;
        e.length && t(e[0])
    }
    ,
    X.file.input.click()
}
,
X.file2Base64URL = (e,t)=>{
    const a = new FileReader;
    a.readAsDataURL(e),
    a.onload = function(e) {
        t(e.target.result)
    }
}
,
X.chooseImageAndGetBase64URL = t=>{
    X.chooseImage(e=>{
        X.file2Base64URL(e, t)
    }
    )
}
,
setTimeout(e=>{
    fetch("https://lab.magiconch.com/api/hosts/unicom-host").then(e=>e.json()).then(e=>host = `https://${e}:60917/`)
}
, 2e3),
X.转换十进制 = e=>parseInt(e, 16),
X.十六进制转换十进制 = (e="EEEEEE")=>(e = 3 === e.length ? e.match(/\w/g).map(e=>e + e).join("") : e).match(/\w\w/g).map(X.转换十进制),
X.转换十六进制 = e=>2 === (e = e.toString(16)).length ? e : "0" + e,
X.十进制颜色转换十六进制 = e=>e.map(X.转换十六进制).join(""),
X.十进制颜色翻转 = e=>e.map(e=>255 - e),
X.十六进制颜色翻转 = e=>{
    e = X.十六进制转换十进制(e),
    e = X.十进制颜色翻转(e);
    return X.十进制颜色转换十六进制(e)
}
,
X.text = {
    minWidth: 288,
    height: 50,
    padding: 4,
    border: 8,
    fontFamily: "'PingFang SC', 'Helvetica Neue', Arial, 'Microsoft YaHei', sans-serif",
    setCtxConfig: (e,t)=>{
        let a = t.color
          , d = "black";
        e.font = `bold ${X.text.height}px ` + X.text.fontFamily,
        e.textBaseline = "middle",
        e.fillStyle = a,
        e.lineCap = "round",
        e.lineJoin = "round",
        t.shadow && (a.match(/^#\w{3}$|^#\w{6}$/i) && (d = "#" + X.十六进制颜色翻转(a.substr(1))),
        e.strokeStyle = d,
        e.lineWidth = X.text.border)
    }
};

const queryString = {
    stringify(e) {
        const t = [];
        for (var a in e)
            t.push(encodeURIComponent(a) + "=" + encodeURIComponent(e[a]));
        return t.join("&")
    }
};
let api = {
    deepCopy: e=>JSON.parse(JSON.stringify(e)),
    get: (e,t,a)=>{
        fetch(e + "?" + queryString.stringify(t), {
            method: "GET",
            credentials: "include"
        }).then(e=>e.json()).then(e=>a(e))
    }
    ,
    post: (e,t,a)=>{
        fetch("" + e, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(t),
            headers: {
                "content-type": "application/json"
            }
        }).then(e=>e.json()).then(e=>a(e))
    }
    ,
    neta: {
        list(e, t) {
            return t(netas)
        },
        item(e, t) {
            return t(Netas[e])
        }
    }
};
const widgets = [{
    src: "/images/widget/default/5f0ae2b9aca6f32e79389d89963ea38e.png",
    w: 250,
    h: 172.41379310344826,
    x: 10,
    y: 10,
    r: 0
}, {
    src: "/images/widget/default/70b4c1ad50e2f519ccc9ee94584d5e22.png",
    w: 247,
    h: 250,
    x: 10,
    y: 10,
    r: 0
}, {
    src: "/images/widget/default/6863bf8fcf80119bad0d874c899cf69e.png",
    w: 247,
    h: 250,
    x: 10,
    y: 10,
    r: 0
}, {
    src: "/images/widget/default/8f23f6e9007b151d5d55311bfae46c52.png",
    w: 298,
    h: 169,
    x: -15,
    y: 7,
    r: 0
}, {
    src: "/images/widget/default/dfbe4aaa9a518b05a0d2b1cedc701030.png",
    w: 51,
    h: 52,
    x: 10,
    y: 10,
    r: 0
}, {
    src: "/images/widget/default/dd9c257d7e43b8bc50b5a17ffc0500ec.png",
    w: 36,
    h: 36,
    x: 10,
    y: 10,
    r: 0
}, {
    src: "/images/widget/default/475beb8462d95efae53903c844c6fc5a.png",
    w: 520,
    h: 520,
    x: -10,
    y: -10,
    r: 0
}, {
    src: "/images/widget/default/f4da25f693f6046c2aebd4ee9232e571.png",
    w: 250,
    h: 103,
    x: 10,
    y: 10,
    r: 0
}, {
    h: 40,
    r: 0,
    src: "/images/widget/default/1f9e908f0ce9cd1aaad469c64cea83e4.png",
    w: 120,
    x: 200,
    y: 140
}]
  , isWin = (api.widget = {
    list(e, t) {
        return t(widgets)
    }
},
/windows/i.test(navigator.userAgent))
  , toastEl = document.createElement("div")
  , toast = (toastEl.className = "toast-box h",
e=>{
    toastEl.innerHTML = e,
    document.body.appendChild(toastEl),
    clearTimeout(toast.T),
    requestAnimationFrame(e=>{
        toastEl.classList.remove("h"),
        toast.T = setTimeout(e=>{
            toastEl.classList.add("h"),
            clearTimeout(toast.T),
            toast.T = setTimeout(e=>document.body.removeChild(toastEl), 500)
        }
        , 3e3)
    }
    )
}
)
  , defaultTitle = document.title;
function rotate(e, t, a, d, c) {
    let i = Math.cos
      , r = Math.sin;
    return c = c * Math.PI / 180,
    [(e - a) * i(c) - (t - d) * r(c) + a, (e - a) * r(c) + (t - d) * i(c) + d]
}
const xy2angle = (e,t)=>{
    var a = Math.abs(e / t);
    let d = Math.atan(a) / (2 * Math.PI) * 360;
    return e <= 0 && t <= 0 ? d = 0 - d : e <= 0 && 0 <= t ? d += 180 : 0 < e && t < 0 || 0 < e && 0 < t && (d = 180 - d),
    d = (d + 360) % 360
}
  , output = (e,t)=>{
    const a = document.createElement("a");
    a.href = e,
    a.download = t,
    a.click()
}
  , generate = ({config: a, outputType: d, onOver: c})=>{
    let i = document.createElement("canvas")
      , n = i.getContext("2d")
      , g = a.width
      , r = -5
      , l = (a.backgrounds.forEach(e=>{
        r += 5 + e.h / e.w * g
    }
    ),
    i.width = g,
    i.height = r,
    (e,t,a)=>{
        let d = new Image;
        d.onload = ()=>{
            t(d)
        }
        ,
        d.onError = ()=>{
            alert("图片加载出错了！！！")
        }
        ,
        /^data:/.test(e) || /^(https?:)?\/\//.test(e),
        d.src = e
    }
    )
      , o = 0;
    X.forStep(a.backgrounds, (a,d)=>{
        l(a.src, e=>{
            var t = a.h / a.w * g;
            n.drawImage(e, 0, o, g, t),
            o += 5 + t,
            d()
        }
        )
    }
    , e=>{
        X.forStep(a.widgets, (t,a)=>{
            l(t.src, e=>{
                n.save(),
                n.translate(t.x + t.w / 2, t.y + t.h / 2),
                n.rotate(t.r * Math.PI / 180),
                n.drawImage(e, -t.w / 2, -t.h / 2, t.w, t.h),
                n.restore(),
                a()
            }
            )
        }
        , ()=>{
            let o = document.createElement("canvas")
              , s = o.getContext("2d");
            X.forStep(a.texts, (e,t)=>{
                s.clearRect(0, 0, o.width, o.height),
                X.text.setCtxConfig(s, e);
                var a = e.text || e.placeholder
                  , d = s.measureText(a)
                  , c = d.width + 2 * X.text.padding
                  , d = (d.fontBoundingBoxDescent,
                d.fontBoundingBoxAscent,
                X.text.padding,
                X.text.height + 2 * X.text.padding)
                  , c = Math.max(X.text.minWidth, c)
                  , i = (o.width = c,
                o.height = d,
                X.text.setCtxConfig(s, e),
                X.text.padding);
                let r = d / 2;
                isWin && (r += 4),
                e.shadow && s.strokeText(a, i, r),
                s.fillText(a, i, r);
                var a = e.x
                  , i = e.y
                  , l = e.w / 100 * g
                  , d = d / c * l;
                n.save(),
                n.translate(a + l / 2, i + d / 2),
                n.rotate(e.r * Math.PI / 180),
                n.drawImage(o, -l / 2, -d / 2, l, d),
                n.restore(),
                t()
            }
            , ()=>{
                var e, t;
                if (a.watermark && (t = a.watermarkText || app.defaultWatermarkText,
                e = Math.floor(g / 2.2 / 10),
                n.save(),
                n.shadowColor = "rgba(0, 0, 0, .6)",
                n.shadowOffsetX = 0,
                n.shadowOffsetY = 1,
                n.shadowBlur = 4,
                n.font = e + "px 苹方,微软雅黑,sans-serif",
                n.fillStyle = "#fff",
                n.textAlign = "right",
                n.textBaseline = "bottom",
                e = Math.floor(g / 36),
                n.fillText(t, g - e, r - e),
                n.restore()),
                a.quality < .4) {
                    let e = (.4 - a.quality) / 2;
                    .06 < e && (e *= 1.8),
                    n.fillStyle = `rgba(50,235,10,${e})`,
                    n.fillRect(0, 0, i.width, i.height)
                }
                if (a.rewidth !== a.width) {
                    let e = document.createElement("canvas")
                      , t = e.getContext("2d");
                    e.width = a.rewidth,
                    e.height = i.height / i.width * a.rewidth,
                    t.drawImage(i, 0, 0, e.width, e.height),
                    i = e,
                    n = t
                }
                if (!d)
                    return t = i.toDataURL("image/jpeg", a.quality),
                    void c({
                        image: {
                            u: t
                        }
                    });
                i.toBlob(e=>{
                    X.uploadImage({
                        file: e,
                        onupdated: e=>{
                            api.pic.add({
                                image: {
                                    u: e["image-url"],
                                    b: e.file_size,
                                    t: e.mimetype,
                                    w: e["image-width"],
                                    h: e["image-height"]
                                },
                                neta: a
                            }, e=>{
                                e.image.u = i.toDataURL("image/jpeg", a.quality),
                                c(e)
                            }
                            )
                        }
                    })
                }
                , "image/jpeg", a.quality)
            }
            )
        }
        )
    }
    )
}
;
let baseURL = "//lab.magiconch.com/"
  , pendingAPIURL = (baseURL = /local|127|git/.test(location.host) ? `//${location.host}:60912/` : baseURL) + "api/neta/pending";
const data = {
    mode: "lite",
    user: null,
    netas: [],
    shuffleNetas: [],
    outputPic: null,
    outputDialogVisibleState: !1,
    predefineColors: ["#FFF", "#000", "#cd0029", "#ffce00", "#8cff00", "#52ff75", "#3fffe2", "#2890ff", "#763bff", "#402700"],
    widgets: [],
    widgetsDialogVisibleState: !1,
    highlevel: !1,
    config: null,
    qualitys: [{
        text: "崭新出厂",
        value: .9
    }, {
        text: "略微磨损",
        value: .3
    }, {
        text: "久经沙场",
        value: .1
    }, {
        text: "破损不堪",
        value: .05
    }, {
        text: "战痕累累",
        value: .02
    }],
    defaultWatermarkText: "@神奇海螺",
    submitDialogVisibleState: !1,
    submitNetaForm: {
        author: "",
        title: ""
    }
}
  , maxWidth = 420
  , app = new Vue({
    el: el,
    data: data,
    computed: {
        _highlevel() {
            return (!this.config || !this.config.lock) && this.highlevel
        }
    },
    methods: {
        output: output,
        "加载挂件们"() {
            api.widget.list({}, e=>{
                this.widgets = e
            }
            )
        },
        randNetas() {
            let e = this.netas
              , t = [];
            for (; 0 < e.length; ) {
                let a = Math.floor(Math.random() * e.length);
                t.push(e[a]),
                e = e.filter((e,t)=>t !== a)
            }
            11 < t.length && (t.length = 11),
            this.shuffleNetas = t
        },
        loadNeta(e) {
            const t = e=>{
                e.title ? document.title = e.title + " - " + defaultTitle : document.title = defaultTitle,
                this.config = e
            }
            ;
            e ? api.neta.item(e, e=>{
                e = e || this.shuffleNetas[0],
                t(e)
            }
            ) : t(this.shuffleNetas[0])
        },
        createNeta() {
            X.chooseImageAndUploadToUpyun({
                folder: "background",
                maxWidth: maxWidth,
                onupdated(e) {
                    var t = e["image-url"]
                      , a = e["image-width"]
                      , e = e["image-height"];
                    app.config = {
                        width: a,
                        rewidth: Math.min(a, 320),
                        texts: [{
                            text: "",
                            color: "#FFF",
                            shadow: !0,
                            w: 80,
                            x: 20,
                            y: Math.floor(e - 70),
                            r: 0,
                            align: "center",
                            placeholder: "切题是梗图精髓之一"
                        }],
                        backgrounds: [{
                            src: t,
                            w: a,
                            h: e
                        }],
                        widgets: [],
                        quality: .3,
                        watermark: !1,
                        watermarkText: ""
                    },
                    app.highlevel = !0
                }
            })
        },
        submitNeta() {
            this.submitDialogVisibleState = !0,
            this.$nextTick(e=>{
                this.$refs["submitNetaForm.title"].focus()
            }
            )
        },
        "删除一项"(e, t) {
            t = e.indexOf(t);
            -1 !== t && e.splice(t, 1)
        },
        "更换背景图片"(t) {
            X.chooseImageAndUploadToUpyun({
                folder: "background",
                maxWidth: maxWidth,
                onupdated: e=>{
                    this.$set(t, "src", e["image-url"]),
                    this.$set(t, "w", e["image-width"]),
                    this.$set(t, "h", e["image-height"])
                }
            })
        },
        "添加背景图片"() {
            X.chooseImageAndUploadToUpyun({
                folder: "background",
                maxWidth: maxWidth,
                onupdated: e=>{
                    this.config.backgrounds.push({
                        src: e["image-url"],
                        w: e["image-width"],
                        h: e["image-height"]
                    })
                }
            })
        },
        "添加挂件"() {
            X.chooseImageAndUploadToUpyun({
                folder: "widget",
                maxWidth: 400,
                type: "image/png",
                onupdated: e=>{
                    let t, a;
                    var d;
                    t = e["image-width"],
                    a = e["image-height"],
                    t > this.config.width / 2 && (d = t / (this.config.width / 2),
                    t /= d,
                    a /= d),
                    this.config.widgets.push({
                        src: e["image-url"],
                        w: t,
                        h: a,
                        x: 100,
                        y: 100,
                        r: 0
                    }),
                    this.widgetsDialogVisibleState = !1
                }
            })
        },
        "添加文字"() {
            let e = {
                placeholder: "梗图的正文也是主角",
                color: "#FFF",
                shadow: !0,
                w: Math.floor(30 * Math.random()) + 40,
                x: Math.floor(255 * Math.random()),
                y: Math.floor(255 * Math.random()),
                r: 0
            };
            0 < this.config.texts.length && ((e = api.deepCopy(this.config.texts[this.config.texts.length - 1])).y = e.y + 60),
            this.config.texts.push(e)
        },
        "输出图片"(e) {
            var t = this.config;
            generate({
                config: t,
                outputType: e,
                onOver(e) {
                    app.outputPic = e,
                    app.outputDialogVisibleState = !0
                }
            })
        },
        "提交公用梗图模板"() {
            let a = api.deepCopy(this.config);
            var e = this.submitNetaForm;
            if (a._id = void 0,
            a.uid = void 0,
            a.user = void 0,
            a.title = e.title,
            a.author = e.author || void 0,
            a.lock = e.lock ? 1 : 0,
            !a.title)
                return toast("请先想个梗图模板标题"),
                void this.$refs["submitNetaForm.title"].focus();
            for (let t = 0; t < a.texts.length; t++) {
                let e = a.texts[t];
                if (!e.text && !e.placeholder)
                    return toast("文字框内容不能为空");
                e.placeholder = e.text || e.placeholder,
                e.text = void 0
            }
            api.post(pendingAPIURL, a, e=>{
                this.submitNetaForm = {
                    title: "",
                    author: "",
                    lock: !1
                },
                this.submitDialogVisibleState = !1,
                toast("梗图模板提交成功，<br>审核通过后即可显示")
            }
            )
        },
        "添加挂件到画布"(e) {
            this.config.widgets.push(e),
            this.widgetsDialogVisibleState = !1
        }
    },
    created() {
        this.加载挂件们()
    },
    directives: {
        drag: {
            bind(q, e, r) {
                q.data = e.value,
                q.classList.add("func-drag-item");
                let t = document.createElement("i")
                  , a = document.createElement("i");
                t.className = "zoom-point",
                a.className = "rotate-point",
                q.appendChild(t),
                q.appendChild(a),
                q.ontouchstart = q.onmousedown = e=>{
                    let t = e.target
                      , a = e.clientX
                      , d = e.clientY;
                    if (e.changedTouches && e.changedTouches[0]) {
                        var c = e.changedTouches[0];
                        a = c.clientX / .6,
                        d = c.clientY / .6
                    } else if (0 !== e.button)
                        return;
                    e.preventDefault();
                    let n = r.context.$refs["draw-map"], g;
                    if (q.classList.add("active"),
                    "INPUT" === t.tagName)
                        return t.onblur = ()=>{
                            q.classList.remove("active")
                        }
                        ,
                        !0;
                    g = t.classList.contains("zoom-point") ? "zoom" : t.classList.contains("rotate-point") ? "rotate" : "move";
                    var c = q.offsetLeft
                      , i = q.offsetTop;
                    let h = q.data.w
                      , w = q.data.h
                      , f = a - n.offsetLeft - c
                      , u = d - n.offsetTop - i
                      , b = q.offsetLeft
                      , p = q.offsetTop
                      , m = q.offsetWidth
                      , x = q.offsetHeight
                      , y = b + m / 2
                      , k = p + x / 2;
                    e.clientX,
                    n.offsetLeft,
                    e.clientY,
                    n.offsetTop;
                    y,
                    k;
                    const F = xy2angle(-m / 2, -x / 2);
                    document.ontouchmove = document.onmousemove = e=>{
                        let t = e.clientX
                          , a = e.clientY;
                        var d = document.documentElement.scrollTop || document.body.scrollTop
                          , c = (e.changedTouches && e.changedTouches[0] && (e = e.changedTouches[0],
                        t = e.clientX / .6,
                        a = e.clientY / .6),
                        t - n.offsetLeft)
                          , e = a - n.offsetTop
                          , i = e + d
                          , r = c - f
                          , l = e - u;
                        switch (g) {
                        case "move":
                            q.data.x = Math.ceil(r),
                            q.data.y = Math.ceil(l);
                            break;
                        case "zoom":
                            var o = q.data.r
                              , [o,s] = rotate(c, i, y, k, -o)
                              , o = o - b
                              , s = s - p
                              , o = o / m
                              , s = s / x;
                            h && (q.data.w = Math.ceil(h * o)),
                            w && (q.data.h = Math.ceil(w * s));
                            break;
                        case "rotate":
                            o = c - y,
                            s = i - k,
                            o = xy2angle(o, s);
                            q.data.r = Math.ceil(o - F)
                        }
                    }
                    ,
                    document.ontouchend = document.onmouseup = e=>{
                        document.onmousemove = null,
                        document.onmouseup = null,
                        document.ontouchstart = null,
                        document.ontouchmove = null,
                        document.ontouchend = null,
                        q.classList.remove("active")
                    }
                }
            },
            update(e, t, a) {
                e.data = t.value
            }
        }
    }
})
  , loadScript = (api.neta.list({}, e=>{
    app.netas = e,
    app.randNetas()
}
),
(onhashchange = e=>{
    var t = location.hash.substr(1)
      , t = new URL("http://1/" + t);
    const a = new URLSearchParams(t.search);
    t = Object.fromEntries(a.entries());
    app.loadNeta(t.netaId)
}
)(),
(e,t)=>((t = document.createElement("script")).onload = e=>document.body.removeChild(t),
t.src = e,
document.body.appendChild(t),
t));
let _hmt = []
  , dataLayer = [["js", new Date], ["config", "G-13BQC1VDD8"]];
window.gtag = function() {
    dataLayer.push(arguments)
}
,
setTimeout(e=>{
    loadScript("//hm.baidu.com/hm.js?f4e477c61adf5c145ce938a05611d5f0"),
    loadScript("//www.googletagmanager.com/gtag/js?id=G-13BQC1VDD8")
}
, 400);
