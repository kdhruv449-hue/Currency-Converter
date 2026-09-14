const BASE_URL =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


// Get dropdowns
const dropdowns =
    document.querySelectorAll(".dropdown select");


// Get button
const btn =
    document.querySelector("button");


// Get From currency
const fromCurr =
    document.querySelector("select[name='from']");


// Get To currency
const toCurr =
    document.querySelector("select[name='to']");


// Add currencies to dropdowns
for (let select of dropdowns) {

    for (let currCode in countryList) {

        let newOption =
            document.createElement("option");


        newOption.innerText = currCode;

        newOption.value = currCode;


        // Default FROM = USD
        if (
            select.name === "from" &&
            currCode === "USD"
        ) {

            newOption.selected = true;

        }


        // Default TO = INR
        else if (
            select.name === "to" &&
            currCode === "INR"
        ) {

            newOption.selected = true;

        }


        select.append(newOption);
    }


    // Change flag
    select.addEventListener("change", (evt) => {

        updateFlag(evt.target);

    });

}



// Update flag function
const updateFlag = (element) => {

    let currCode =
        element.value;


    let countryCode =
        countryList[currCode];


    let newSrc =
        `https://flagsapi.com/${countryCode}/flat/64.png`;


    let img =
        element.parentElement.querySelector("img");


    img.src = newSrc;

};



// Button click
btn.addEventListener("click", async (evt) => {

    evt.preventDefault();


    // Get amount
    let amount =
        document.querySelector(".amount_input");


    let amtVal =
        amount.value;


    // Check amount
    if (
        amtVal === "" ||
        amtVal < 1
    ) {

        amtVal = 1;

        amount.value = "1";

    }


    // Get currencies
    let from =
        fromCurr.value.toLowerCase();


    let to =
        toCurr.value.toLowerCase();


    // Same currency
    if (from === to) {

        let msg =
            document.querySelector(".msg");


        msg.innerText =
            `1 ${fromCurr.value} = 1 ${toCurr.value}
${amtVal} ${fromCurr.value} = ${amtVal} ${toCurr.value}`;

        return;
    }


    // API URL
    const URL =
        `${BASE_URL}/${from}.json`;


    try {

        // Fetch API
        let response =
            await fetch(URL);


        // Check response
        if (!response.ok) {

            throw new Error(
                `HTTP error: ${response.status}`
            );

        }


        // Convert to JSON
        let data =
            await response.json();


        console.log(data);


        // Get exchange rate
        let rate =
            data[from][to];


        // Calculate
        let finalAmount =
            amtVal * rate;


        // Message section
        let msg =
            document.querySelector(".msg");


        // Display result
        msg.innerText =
            `1 ${fromCurr.value} = ${rate.toFixed(2)} ${toCurr.value}
${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;

    }

    catch (error) {

        console.log(error);


        let msg =
            document.querySelector(".msg");


        msg.innerText =
            "Unable to get exchange rate.";

    }

});