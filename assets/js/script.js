


// we make sure the JavaScript file loads after our HTML by using a function test if the HTML is loaded

function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
      // call on next available tick
      setTimeout(fn, 1);
  } else {
      document.addEventListener("DOMContentLoaded", fn);
  }
}   



docReady(function() {

    // path

    function handleScroll() {
      let scrollPosition = window.scrollY;
      let maxScroll = window.innerHeight; // 100vh
      let path = document.querySelector(".path");
      let bg = document.querySelector(".background");
    
      // Map scroll position to stroke-dashoffset (0 to 3000)
      let offset = Math.min(3000, Math.max(0, (scrollPosition / maxScroll) * 3000));
      if (path) path.style.strokeDashoffset = offset;
    
      // Map scroll position to background opacity (1 to 0)
      let delayFactor = 0.75; // 25% delay before background starts fading
      let normalizedScroll = (scrollPosition / maxScroll - delayFactor) / (1 - delayFactor);
      let opacity = Math.max(0, 1 - Math.max(0, normalizedScroll));
      if (bg) bg.style.opacity = opacity;
    }
    
    document.addEventListener("scroll", handleScroll);
    window.addEventListener("load", handleScroll); // 👈 ensures correct state on refresh
    // menu

    const menuButton = document.querySelector(".menu-button");
    const nav = document.querySelector("nav");
  
    menuButton.addEventListener("click", function () {
      nav.classList.toggle("active");
    });

    document.addEventListener("click", function (event) {
        if (!nav.contains(event.target) && !menuButton.contains(event.target)) {
          nav.classList.remove("active");
        }
      });

// images

    const containers = document.querySelectorAll(".container");

containers.forEach((container) => {
    const thumbnails = container.querySelectorAll(".thumbnail");
    const figures = container.querySelectorAll(".viewer figure"); // Restrict selection to figures inside the viewer

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", function () {
            const targetFigure = figures[index]; // Ensure the target figure is inside the viewer
            if (!targetFigure) return;

            // Toggle visibility only inside the viewer
            if (targetFigure.classList.contains("show")) {
                targetFigure.classList.remove("show");
            } else {
                figures.forEach(figure => figure.classList.remove("show"));
                targetFigure.classList.add("show");
            }
        });
    });

    // Handle close button clicks
    const closeButtons = container.querySelectorAll(".viewer .close-button");
    closeButtons.forEach((button) => {
        button.addEventListener("click", function (e) {
            e.stopPropagation(); // Prevent bubbling
            button.closest("figure").classList.remove("show");
        });
    });

    // Handle clickable text references
    const clickables = document.querySelectorAll(".clickable");
    clickables.forEach(clickable => {
        clickable.addEventListener("click", function () {
            const figureNumber = this.getAttribute("data-figure");
            const targetFigure = document.querySelector(`.viewer #imageFigure${figureNumber}`); // Restrict selection to viewer

            if (targetFigure) {
                if (targetFigure.classList.contains("show")) {
                    targetFigure.classList.remove("show");
                } else {
                    document.querySelectorAll(".viewer figure").forEach(fig => fig.classList.remove("show"));
                    targetFigure.classList.add("show");
                }
            }
        });
    });
});


// footnotes


// const footnoteRefs = document.querySelectorAll(".footnote-ref");

//   footnoteRefs.forEach((ref) => {
//     ref.style.cursor = "pointer"; 

//     ref.addEventListener("click", function (event) {
//       event.preventDefault();

//       const existingTooltip = ref.querySelector(".footnote-tooltip");


//       document.querySelectorAll(".footnote-tooltip").forEach((tooltip) => {
//         tooltip.remove();
//       });
//       document.querySelectorAll(".footnote-ref").forEach((ref) => {
//         ref.classList.remove("active");
//       });

//       if (!existingTooltip) {

//         const footnoteId = ref.getAttribute("href").substring(1);
//         const footnoteElem = document.querySelector(`#${footnoteId} p`);

//         if (footnoteElem) {
//           let tooltip = document.createElement("span");
//           tooltip.className = "footnote-tooltip";
    
//           tooltip.innerHTML = footnoteElem.innerHTML.trim(); 
//           ref.appendChild(tooltip);
//           ref.classList.add("active");
//         }
//       }
//     });
//   });


//   document.addEventListener("click", function (event) {
//     if (!event.target.closest(".footnote-ref") && !event.target.closest(".footnote-tooltip")) {
//       document.querySelectorAll(".footnote-tooltip").forEach((tooltip) => tooltip.remove());
//       document.querySelectorAll(".footnote-ref").forEach((ref) => ref.classList.remove("active"));
//     }
//   });

// Handle clicks on footnote references
document.querySelectorAll(".footnote-ref").forEach(function (ref) {
  ref.addEventListener("click", function (event) {
    let allFootnotes = document.querySelectorAll(".ol-footnotes li");

    // Reset all footnotes: remove highlight and dim them
    allFootnotes.forEach(function (footnote) {
      footnote.classList.remove("highlighted-footnote");
      footnote.classList.add("dimmed-footnote");
    });

    // Get the corresponding footnote ID
    let footnoteId = this.getAttribute("href").substring(1);
    let footnoteElement = document.getElementById(footnoteId);

    // Highlight the selected footnote and remove dimming
    if (footnoteElement) {
      footnoteElement.classList.add("highlighted-footnote");
      footnoteElement.classList.remove("dimmed-footnote");

      // Smooth scroll to the footnote
      footnoteElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
});

// Handle clicks on footnote backlinks
document.querySelectorAll(".footnote-back").forEach(function (backlink) {
  backlink.addEventListener("click", function () {
    // Reset all footnotes
    document.querySelectorAll(".ol-footnotes li").forEach(function (footnote) {
      footnote.classList.remove("highlighted-footnote", "dimmed-footnote");
    });
  });
});


// heading
const isTouch =
'ontouchstart' in window ||
navigator.maxTouchPoints > 0 ||
window.matchMedia('(hover: none)').matches;

if (isTouch) {
document.querySelectorAll('.chapter-title').forEach(title => {
  title.addEventListener('click', () => {
    title.querySelectorAll('.legible').forEach(el => {
      el.classList.toggle('visible');
    });
  });
});
}

console.log('window.matchMedia("(hover: none)").matches:', window.matchMedia('(hover: none)').matches);
console.log('ontouchstart in window:', 'ontouchstart' in window);
console.log('navigator.maxTouchPoints:', navigator.maxTouchPoints);



});


