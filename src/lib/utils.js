/**
 * Formats a date to a readable string
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string (e.g., "January 1, 2025")
 */
export function formatDate(date) {
    if (!date) return '';
    
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  /**
   * Truncates text to a specified length and adds ellipsis
   * @param {string} text - The text to truncate
   * @param {number} maxLength - Maximum length before truncation
   * @returns {string} Truncated text with ellipsis if needed
   */
  export function truncateText(text, maxLength = 150) {
    if (!text || text.length <= maxLength) return text;
    
    return text.slice(0, maxLength).trim() + '...';
  }
  
  /**
   * Generates a simple slug from a string
   * @param {string} text - Text to convert to slug
   * @returns {string} URL-friendly slug
   */
  export function generateSlug(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Remove consecutive hyphens
      .trim();
  }
  
  /**
   * Scrolls to an element with smooth behavior
   * @param {string} id - Element ID to scroll to
   * @param {number} offset - Offset from the top in pixels
   */
  export function scrollToElement(id, offset = 80) {
    const element = document.getElementById(id);
    
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
      
      window.scrollTo({
        top,
        behavior: 'smooth'
      });
    }
  }
  
  /**
   * Handles API fetch errors
   * @param {Response} response - Fetch response object
   * @returns {Promise} The JSON response or throws an error
   */
  export async function handleApiResponse(response) {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error || `Error: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }
    
    return response.json();
  }
  
  /**
   * Debounce function to limit how often a function is called
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} Debounced function
   */
  export function debounce(func, wait = 300) {
    let timeout;
    
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }