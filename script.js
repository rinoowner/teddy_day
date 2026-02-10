document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(TextPlugin);

    // Initial Animations
    const tl = gsap.timeline();

    // Video Entrance Animation
    tl.from("#hero-teddy", {
        duration: 1.5,
        opacity: 0,
        y: 50,
        ease: "power2.out"
    });

    // Text Animation
    tl.to("#title-text", {
        duration: 2.5,
        text: "Happy Teddy Day My Love ❤️",
        ease: "power1.in",
        delay: 0.5
    });

    tl.to("#subtitle-text", {
        duration: 2,
        text: "This teddy is a small symbol of my big love for you",
        ease: "power1.in"
    });

    // Card Fade In
    gsap.to(".message-card", {
        scrollTrigger: ".message-card", // Simple trigger if needed, or just delay
        delay: 4,
        duration: 1.5,
        y: 0,
        opacity: 1,
        ease: "power2.out"
    });

    // Music Control
    const musicBtn = document.getElementById("music-btn");
    const bgMusic = document.getElementById("bg-music");
    let isPlaying = false;

    musicBtn.addEventListener("click", () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.innerHTML = "Your Song 🎵";
        } else {
            bgMusic.play().catch(e => console.log("Audio play failed:", e));
            musicBtn.innerHTML = "Pause ⏸️";
        }
        isPlaying = !isPlaying;
    });

    // Interactive Floating Hearts (Click anywhere)
    document.addEventListener("click", (e) => {
        // Avoid spawning hearts when clicking buttons
        if (e.target.tagName === 'BUTTON' || e.target.closest('button') || e.target.closest('.modal-content')) return;

        createFloatingHeart(e.clientX, e.clientY);
    });

    function createFloatingHeart(x, y) {
        const heart = document.createElement("div");
        heart.classList.add("floating-heart");
        heart.innerHTML = "❤️";
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.fontSize = `${Math.random() * 20 + 20}px`;
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 4000);
    }

    // Falling Rose Petals
    setInterval(() => {
        const petal = document.createElement("div");
        petal.classList.add("rose-petal");
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.animationDuration = `${Math.random() * 3 + 3}s`;
        petal.style.top = "-20px";
        document.body.appendChild(petal);

        setTimeout(() => {
            petal.remove();
        }, 6000);
    }, 2000); // Add a petal every 2 seconds

    // Teddy Interactions
    const teddy = document.getElementById("hero-teddy");
    teddy.addEventListener("click", () => {
        gsap.to(teddy, {
            scale: 1.2,
            duration: 0.2,
            yoyo: true,
            repeat: 1
        });

        // Burst of hearts
        for (let i = 0; i < 5; i++) {
            createFloatingHeart(
                teddy.getBoundingClientRect().left + Math.random() * 200,
                teddy.getBoundingClientRect().top + Math.random() * 200
            );
        }
    });

    // Surprise Modal
    const modal = document.getElementById("surprise-modal");
    const surpriseBtn = document.getElementById("surprise-btn");
    const closeBtn = document.getElementsByClassName("close-modal")[0];

    surpriseBtn.addEventListener("click", () => {
        modal.style.display = "flex";
        // Confetti or extra hearts inside modal
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createFloatingHeart(window.innerWidth / 2 + (Math.random() * 200 - 100), window.innerHeight / 2 + (Math.random() * 200 - 100));
            }, i * 100);
        }
    });

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    });

    // Theme Toggle
    const themeToggle = document.getElementById("theme-toggle");
    let isDark = false;

    themeToggle.addEventListener("click", () => {
        isDark = !isDark;
        document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
        themeToggle.innerHTML = isDark ? "☀️" : "🌙";
    });
});
