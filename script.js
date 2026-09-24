const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const message = document.getElementById("message");

const successScreen =
    document.getElementById("successScreen");

const closeBtn =
    document.getElementById("closeBtn");

const toast =
    document.getElementById("toast");

const floatingHearts =
    document.getElementById("floatingHearts");


/* =====================================================
   STATE
===================================================== */

let noClicks = 0;

let yesScale = 1;


/* =====================================================
   MESSAGES
===================================================== */

const messages = [

    "wach nti mt2ka asiman🥺",

    "n9dr n3tik 7ayat zwina 💗",

    "righ 3tini forsa nrj3o asiman", 

    "nsay db lmadi kolchi db tbdl🌸",

    "n9dro n3icho 7ayat zwina " ,

    "ila tsa7bna ana wyak radi ndiro group ana onti ohfsa o youssef🤍"
];


/* =====================================================
   NO BUTTON
===================================================== */

noBtn.addEventListener("click", () => {

    noClicks++;

    changeMessage(
        messages[
            Math.min(
                noClicks - 1,
                messages.length - 1
            )
        ]
    );


    /*
     * تكبير تدريجي لزر نعم
     */

    yesScale =
        Math.min(
            1 + noClicks * 0.12,
            1.65
        );

    yesBtn.style.transform =
        `scale(${yesScale})`;


    /*
     * اهتزاز خفيف على الهاتف
     */

    if (
        navigator.vibrate &&
        noClicks < 5
    ) {
        navigator.vibrate(25);
    }


    /*
     * بعد عدة محاولات
     */

    if (noClicks === 6) {

        showToast(
            "مهما كان اختيارك، أتمنى لكِ السعادة 🤍"
        );

        noBtn.textContent =
            "laaaa sf😅";
    }
});


/* =====================================================
   YES BUTTON
===================================================== */

yesBtn.addEventListener("click", () => {

    openSuccess();

});


/* =====================================================
   OPEN SUCCESS
===================================================== */

function openSuccess() {

    successScreen.classList.add("show");

    successScreen.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";


    if (navigator.vibrate) {
        navigator.vibrate([
            30,
            50,
            30
        ]);
    }


    createExplosion();

}


/* =====================================================
   CLOSE
===================================================== */

closeBtn.addEventListener("click", () => {

    successScreen.classList.remove("show");

    successScreen.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "hidden";

});


/* =====================================================
   MESSAGE ANIMATION
===================================================== */

function changeMessage(text) {

    message.classList.add("change");

    setTimeout(() => {

        message.textContent = text;

        message.classList.remove("change");

    }, 180);

}


/* =====================================================
   TOAST
===================================================== */

let toastTimer;

function showToast(text) {

    toast.textContent = text;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);
}


/* =====================================================
   FLOATING HEART GENERATOR
===================================================== */

const heartTypes = [
    "❤️",
    "💗",
    "💕",
    "💖",
    "🤍",
    "✨"
];


function createFloatingHeart() {

    const heart =
        document.createElement("div");

    heart.className =
        "floating-heart";

    heart.textContent =
        heartTypes[
            Math.floor(
                Math.random() *
                heartTypes.length
            )
        ];


    heart.style.left =
        Math.random() * 100 + "%";


    heart.style.fontSize =
        (12 + Math.random() * 20) + "px";


    const duration =
        8 + Math.random() * 8;

    heart.style.animationDuration =
        duration + "s";


    heart.style.animationDelay =
        Math.random() * 2 + "s";


    floatingHearts.appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, (duration + 3) * 1000);
}


/*
 * البداية
 */

for (let i = 0; i < 10; i++) {

    setTimeout(
        createFloatingHeart,
        i * 500
    );

}


/*
 * استمرار القلوب
 */

setInterval(
    createFloatingHeart,
    900
);


/* =====================================================
   HEART EXPLOSION
===================================================== */

function createExplosion() {

    const emojis = [
        "❤️",
        "💗",
        "💕",
        "💖",
        "✨",
        "🤍"
    ];


    for (let i = 0; i < 45; i++) {

        const heart =
            document.createElement("div");

        heart.textContent =
            emojis[
                Math.floor(
                    Math.random() *
                    emojis.length
                )
            ];


        heart.style.position =
            "fixed";

        heart.style.zIndex =
            "500";

        heart.style.left =
            "50%";

        heart.style.top =
            "50%";

        heart.style.pointerEvents =
            "none";

        heart.style.fontSize =
            (14 + Math.random() * 25) + "px";


        const angle =
            Math.random() *
            Math.PI *
            2;

        const distance =
            100 +
            Math.random() * 260;


        const x =
            Math.cos(angle) *
            distance;

        const y =
            Math.sin(angle) *
            distance;


        heart.animate(

            [
                {
                    transform:
                        "translate(-50%, -50%) scale(0)",

                    opacity: 1
                },

                {
                    transform:
                        `translate(
                            calc(-50% + ${x}px),
                            calc(-50% + ${y}px)
                        )
                        scale(1.2)`,

                    opacity: 1,

                    offset: .55
                },

                {
                    transform:
                        `translate(
                            calc(-50% + ${x * 1.3}px),
                            calc(-50% + ${y * 1.3}px)
                        )
                        scale(.4)
                        rotate(360deg)`,

                    opacity: 0
                }
            ],

            {
                duration:
                    1200 +
                    Math.random() * 1000,

                easing:
                    "cubic-bezier(.2,.8,.2,1)"
            }

        );


        document.body.appendChild(heart);


        setTimeout(() => {

            heart.remove();

        }, 2500);
    }
}


/* =====================================================
   PREVENT ACCIDENTAL ZOOM ON DOUBLE TAP
===================================================== */

let lastTouchEnd = 0;

document.addEventListener(
    "touchend",
    event => {

        const now =
            Date.now();

        if (
            now - lastTouchEnd <= 300
        ) {

            event.preventDefault();

        }

        lastTouchEnd =
            now;

    },
    {
        passive: false
    }
);