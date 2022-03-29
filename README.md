
# About the Project

The Challenge:

- Build out this invoicing application and get it looking as close to the Figma design as possible, including responsive-design elements
- See hover states for all interactive elements on the page
- Receive form validations when trying to create/edit an invoice
- Save draft invoices, and mark pending invoices as paid, & filter by status (draft/pending/paid)
- Create a full-stack application with CRUD functionality

https://invoice-now.netlify.app/

![updated-invoices-gif](https://user-images.githubusercontent.com/67395239/156457538-df0ef74f-23d7-4eca-b83e-a420a5719fcc.gif)


<!-- ![goodGifInvoiceApp](https://user-images.githubusercontent.com/67395239/155815402-46a14480-cf80-43b9-b6e2-8829a4509e40.gif) -->



## How It's Made:

**Tech used:** 
- React 
- React Hook Form (validation library)
- Material UI
- PostgreSQL
- NodeJS
- backend deployed on Heroku

## Skills Used:

- Implemented a git branching workflow of using feature branches to merge updates into the main branch of the deployed app
- Convert Date Object from date-picker component to local time zone to avoid OB1 errors, & save the value in 'YYYY-MM-DD' format
- How to convert data once received from the API. For example, I received a date as '2021-10-07' but had to display it as '7 Oct 2021'
- Dynamically render a component based on other inputs.  For example, the 'Total Price' display on the form would change whenever the user entered a different input for item price OR item quantity.
- Different display text based on screen size.  For example, the 'New Invoice' button would simply say 'New' on mobile screens.
- Generate a random alpha-numeric ID each time a new form was created
- Dynamically render buttons based on status.  For example, the 'Delete' and 'Edit' buttons would not display on invoices where status = 'paid'
- Removing horizontal scroll on phone/tablet display in order to improve the UX
- Using different naming-convention styles (snake-case vs camelCase) when data goes between frontend and backend.

## Lessons Learned

### Make it work, then make it good
- For awhile on projects, I was caught up on making my first iteration the best.  Then I realized that simply isn't how coding works, allowing myself permission to make mistakes and have sub-optimal code while I get everything working has allowed me to code more efficiently knowing I will go back and make the code better on future iterations.

### The importance of initially selecting the correct NPM package in order to save yourself time down the road
-  This project required form-validation which I had zero previous experience using.  I initially chose to use formik over react-hook-form since it had more weekly downloads on npm.  I read the docs and started implementing formik into my project, only to then realize formik wasn't going to work for me (formik maintains state on the DOM rather than with React.)  If I had just read the docs a little more thoroughly before deciding on a form-validation library and not over-emphasizing the importance of npm weekly download count, I probably would have decided to use react-hook-form from the onset.  And thus, save myself A LOT of time.

