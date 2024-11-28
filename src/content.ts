// This content script will only run on Perplexity AI
import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://www.perplexity.ai/*"]
}

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
  try {
    // Start observing DOM changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    // Initial cleanup
    removeShoppingElements()
  } catch (error) {
    console.error("Failed to initialize extension:", error)
  }
}

export {} 