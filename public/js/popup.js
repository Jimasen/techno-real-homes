window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        if (!localStorage.getItem("trh_approval")) {
            const approve = confirm("Do you allow Techno Real Homes to send you details?");
            if (approve) {
                localStorage.setItem("trh_approval", "yes");
                alert("✅ Thank you! We will send updates.");
            } else {
                localStorage.setItem("trh_approval", "no");
            }
        }
    }, 2000);
});
