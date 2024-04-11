document.addEventListener("DOMContentLoaded", function() {
    const taxForm = document.getElementById("taxForm");
    const modal = document.getElementById("modal");
    const spanClose = document.getElementsByClassName("close")[0];

    const showErrorIcon = (inputId) => {
        const errorIcon = document.getElementById(inputId + "Error");
        errorIcon.style.display = "inline-block";
    };

    const hideErrorIcon = (inputId) => {
        const errorIcon = document.getElementById(inputId + "Error");
        errorIcon.style.display = "none";
    };

    const calculateTax = (age, income, extraIncome, deductions) => {
        let tax = 0;
        const totalIncome = income + extraIncome - deductions;
        
        if (totalIncome > 800000) {
            if (age === "<40") {
                tax = 0.3 * (totalIncome - 800000);
            } else if (age === "≥ 40 &lt; 60") {
                tax = 0.4 * (totalIncome - 800000);
            } else if (age === "≥ 60") {
                tax = 0.1 * (totalIncome - 800000);
            }
        }

        return tax.toFixed(2);
    };

    taxForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const age = document.getElementById("age").value;
        const income = parseFloat(document.getElementById("income").value);
        const extraIncome = parseFloat(document.getElementById("extraIncome").value);
        const deductions = parseFloat(document.getElementById("deductions").value);

        if (age === "") {
            showErrorIcon("age");
            return;
        } else {
            hideErrorIcon("age");
        }

        if (isNaN(income)) {
            showErrorIcon("income");
            return;
        } else {
            hideErrorIcon("income");
        }

        if (isNaN(extraIncome)) {
            showErrorIcon("extraIncome");
            return;
        } else {
            hideErrorIcon("extraIncome");
        }

        if (isNaN(deductions)) {
            showErrorIcon("deductions");
            return;
        } else {
            hideErrorIcon("deductions");
        }

        const taxAmount = calculateTax(age, income, extraIncome, deductions);

        const taxDetails = `Tax Amount: ${taxAmount} Lakhs`;

        document.getElementById("taxDetails").innerText = taxDetails;
        modal.style.display = "block";
    });

    spanClose.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
});
