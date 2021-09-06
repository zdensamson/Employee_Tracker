# Employee Tracker

## Description 

For this project I built out a content management system that allows a user to read existing records, create new records, & update records in an employee database.
Through command line prompts-- the user is able to select options that run MySQL queries in the background.

A video example can be found here: [Walkthrough](https://drive.google.com/file/d/1e_vzf_a7v8BwxV-7g2WKmrjIBIyIayWS/view)


## Installation
To install dependencies, run the following command:
```
npm install
```

## Utilized technologies 

This application was built using __JavaScript__.

In order to bring additional functionality to the project the following packages/technologies were implemented:
* Node.js
* MySQL2
* Inquirer
* cTable

All local data persistance and queries were handled in **MySQL**, while the **Inquirer** package was implemented to present the user with prompts (_questions_) that in-turn pinged the respective queries. 

## Challenges

This project really brought to light my current struggle (and lack of experience) with JavaScript's asynchronous behavior. 
While I have a relatively firm understanding of the problems that can arrise with asynchronous code in applications-- I still end up writing non-DRY code to circumvent these issues. 

I look forward to researching more into **promises** and **async/await** functionality in JS in order to write cleaner (more legible) and more efficient code. 

## License

Copyright (c) 2021 Zachary Dennis Samson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
