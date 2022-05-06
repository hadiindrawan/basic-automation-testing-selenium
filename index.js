require("chromedriver");
const {Builder, Browser, By, Key, Capabilities} = require('selenium-webdriver');

(function QATestLogin() {
    // Get the credentials from the JSON file
    let { email, password } = require("./credentials.json");
    let driver = new Builder().forBrowser(Browser.CHROME).withCapabilities(Capabilities.chrome()).build();

    // Step 1 - Opening page
    let Page = driver.get("https://www.psegameshop.com/")
    Page
        .then(function () {
            // Timeout to wait if connection is slow
            let LoadPageTimeOut = driver.manage().setTimeouts({
                    implicit: 3000,
                });
            return LoadPageTimeOut
        })
        .then(function() {
            // Step 2 - Clicking btn for showing the modal login
            let modalShow = driver.findElement(By.className("nav-top-link nav-top-not-logged-in is-small")).click()
            return modalShow
        })
        .then(function () {
            // Step 4 - Finding the email or username input
            let promiseUsernameBox = driver.findElement(By.id("username"));
            return promiseUsernameBox;
        })
        .then(function (usernameBox) {

            // Step 5 - Entering the username
            let promiseFillUsername =
                usernameBox.sendKeys(email);
            return promiseFillUsername;
        })
        .then(function () {
            console.log("%c Username or email entered successfully", "color:green");
            // Step 6 - Finding the password input
            let promisePasswordBox = driver.findElement(By.id("password"));
            return promisePasswordBox;
        })
        .then(function (passwordBox) {

            // Step 7 - Entering the password
            let promiseFillPassword =
                passwordBox.sendKeys(password);
            return promiseFillPassword;
        })
        .then(function () {
            console.log("%c Password entered successfully", "color:green");
            
            // Step 8 - Finding the Sign In button
            let promiseSignInBtn = driver.findElement(
                By.className("woocommerce-button button woocommerce-form-login__submit")
            );
            return promiseSignInBtn;
        })
        .then(function (signInBtn) {

            // Step 7 - Clicking the Sign In button
            let promiseClickSignIn = signInBtn.click();
            return promiseClickSignIn;
        })
        .then(function () {
            // Timeout to wait if connection is slow
            let LoadPageTimeOut = driver.manage().setTimeouts({
                    implicit: 3000,
                });
            return LoadPageTimeOut
        })
        .then(function () {
            // Step 8 - Check in the page has error message
            let errorMsg = driver.findElement(
                By.className("woocommerce-error message-wrapper")
            )
            return errorMsg
        })
        .then(function(errorMsg) {
            if (errorMsg.isDisplayed()) {
                console.log("%c Unauthorized!", "color:red");
            } else {
                console.log("%c Successfully signed in psegameshop!", "color:green");
            }
        })
        .catch(function (err) {
            console.log("Error ", err, " occurred!");
        })
})();

