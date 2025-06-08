/**
 * This scipt animates grid section (.whiskful-grid, .museum-grid and .gamehub-grid)
 * so that images "drop in" one by one, followed by the color palette stacking up.
 * It uses IntersectionObserver to detect when the grid is in view.
 */

// Select all grids that should be animated
const grids = document.querySelectorAll(
  ".whiskful-grid, .museum-grid, .gamehub-grid"
);

// Loop through each grid section found on the page
grids.forEach(grid => {
  // Determine which type of grid this is, so we can use the correct selectors
  const isWhiskful = grid.classList.contains("whiskful-grid");
  const isMuseum = grid.classList.contains("museum-grid");
  const isGamehub = grid.classList.contains("gamehub-grid");

  // Find the color palette inside the grid
  const palette = grid.querySelector(".color-palette");

  // Prepare an array of images in the order they should animate (bottom to top)
  let images = [];
  if (isWhiskful) {
    images = [
      grid.querySelector(".whiskful-pic-2"),
      grid.querySelector(".whiskful-logo"),
      grid.querySelector(".whiskful-pic-1")
    ];
  } else if (isMuseum) {
    images = [
      grid.querySelector(".museum-pic-2"),
      grid.querySelector(".museum-logo"),
      grid.querySelector(".museum-pic-1")
    ];
  } else if (isGamehub) {
    images = [
      grid.querySelector(".gamehub-pic-2"),
      grid.querySelector(".gamehub-logo"),
      grid.querySelector(".gamehub-pic-1")
    ];
  }
  // Remove any nulls in case an image is missing
  images = images.filter(Boolean);

  // Set up the IntersectionObserver to watch for when the grid comes into view
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate each image with a staggered delay (like tetris blocks dropping)
          images.forEach((img, i) => {
            setTimeout(() => {
              img.classList.add("visible");
            }, i * 300);
          });
          // Animate the color palette after all image have appeared
          setTimeout(() => {
            if (palette) {
              palette.classList.add("visible");
            }
          }, images.length * 300 + 200); // 200ms extra after last image
          // Stop observing once animation has started
          observer.disconnect();
        }
      });
    },
    { threshold: 0.5 } // Trigger when 50% of the grid is
  );

  // Start observing this grid
  observer.observe(grid);
});
