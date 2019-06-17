/* globals gauge*/
"use strict";
const { openBrowser, goto, textBox, inputField, write, click, clear, contains, link, emulateDevice, button, text, closeBrowser, $ } = require('taiko');
const assert = require("assert");

beforeSuite(async () => {
    await openBrowser({ args: [
        '--disable-gpu',
         '--disable-dev-shm-usage',
         '--disable-setuid-sandbox',
         '--no-first-run',
         '--no-sandbox',
         '--no-zygote']})
    await emulateDevice('iPhone X');
});

afterSuite(async () => {
    await closeBrowser();
});

step("Given I am on <url> page", async (url) => {
    await goto(url);
});

step("When I expand the search textbox", async () => {
    await click($(`._3qY5-OR`))
});

step("When I search for <searchTerm>", async (searchTerm) => {
    await write(searchTerm,inputField({'placeholder':'Type game name or provider...'}));
});

step("When I select <option> game", async (option) => {
    await click (option);
    await click("Single Player");
});

step("When I login as <username> and <password>", async(username,password) => {
    await write(username,textBox({"id":"userId"}));
    await write(password,inputField({"id":"password"}));
    await click(button({"type":"submit"}));
});

step("Then <errorMessage> is displayed", async(errorMessage) => {
	await text(errorMessage).exists();
});
