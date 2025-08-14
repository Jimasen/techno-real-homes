// main.js - Clean & Professional Version

// Wait until the DOM is fully loaded
window.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('approval-popup');
    const footerDot = document.getElementById('footerDot');
    const footerInfo = document.getElementById('footerInfo');

    // Show popup only if user hasn't approved or denied before
    if (!localStorage.getItem('approvalGiven')) {
        popup.style.display = 'flex';
    }

    // Footer info toggle
    if (footerDot && footerInfo) {
        footerDot.addEventListener('click', () => {
            footerInfo.classList.toggle('visible');
        });
    }
});

// Approve button click
function approveDetails() {
    localStorage.setItem('approvalGiven', 'yes');
    closeApprovalPopup();
}

// Deny button click
function denyDetails() {
    localStorage.setItem('approvalGiven', 'no');
    closeApprovalPopup();
}

// Close the popup
function closeApprovalPopup() {
    const popup = document.getElementById('approval-popup');
    if (popup) {
        popup.style.display = 'none';
    }
}

// Export functions to global scope so HTML buttons can call them
window.approveDetails = approveDetails;
window.denyDetails = denyDetails;
