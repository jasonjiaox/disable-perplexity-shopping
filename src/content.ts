function removeShoppingElements() {
  // Remove shopping section
  const shoppingSection = document.querySelector('div[class*="isolate flex flex-col gap-md"]')
  if (shoppingSection) {
    shoppingSection.remove()
  }

  // Remove "Related Products" section 
  const relatedProducts = document.querySelector('div[class*="Related Products"]')
  if (relatedProducts) {
    relatedProducts.parentElement?.parentElement?.remove()
  }

  // Remove product cards
  const productCards = document.querySelectorAll('div[class*="group/card flex flex-col rounded-lg"]')
  productCards.forEach(card => card.remove())
}

// Initialize observer to handle dynamically loaded content
const observer = new MutationObserver((mutations) => {
  mutations.forEach(() => {
    removeShoppingElements()
  })
})

// Wait for DOM to be ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeExtension)
} else {
  initializeExtension()
}

function initializeExtension() {
  // Start observing DOM changes
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })

  // Initial cleanup
  removeShoppingElements()
}

export {} 