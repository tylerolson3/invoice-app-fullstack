
# About the Project
This project was a solo challenge from [Frontend Mentor](https://www.frontendmentor.io/challenges/invoice-app-i7KaLTQjl) where the objective was to use the

The Challenge:

- Build out this invoicing application and get it looking as close to the design as possible, including responsive-design elements
- See hover states for all interactive elements on the page
- Receive form validations when trying to create/edit an invoice
- Save draft invoices, and mark pending invoices as paid, & filter by status (draft/pending/paid)
- Create a full-stack application with CRUD functionality

https://invoice-tyler.netlify.app/

![goodGifInvoiceApp](https://user-images.githubusercontent.com/67395239/155815402-46a14480-cf80-43b9-b6e2-8829a4509e40.gif)



## How It's Made:

**Tech used:** 
- React 
- React Hook Form (validation library)
- Material UI
- PostgreSQL
- NodeJS

This is was my first full-stack app that I deployed myself (using heroku and netlify), and to say a learned A LOT would be an understatement.  From getting comfortable with errors messages that took ALL DAY to resolve, to simply getting better at googling for answers when stuck, I'm much more confident in my coding abilities having completed this project.  Also, I repeatedly saw the value of simply taking a break can sometimes have when your stuck. 


## Lessons Learned:

- My date-picker set the value as a Date Object, and then I had to convert it to 'YYYY-MM-DD' format before sending the form to the DB.
- Convert Date Object to local time zone to avoid to avoid OB1 errors
- How to convert data once received from the API. For example, I received a date as '2021-10-07' but had to display it as '7 Oct 2021'
- Dynamically render a component based on other inputs.  For example, the 'Total Price' display on the form would change whenever the user entered a different input for item price OR item quantity.
- Different display text based on screen size.  For example, the 'New Invoice' button would simplay say 'New' on mobile screens.
- Dynamically render buttons based on status.  For example, the 'Delete' and 'Edit' buttons would not be display on invoices where status = 'paid'
- Generate a random alpha-numeric ID each time a new form was created
- horizontal scroll on mobile

No matter what your experience level, being an engineer means continuously learning. Every time you build something you always have those *whoa this is awesome* or *fuck yeah I did it!* moments. This is where you should share those moments! Recruiters and interviewers love to see that you're self-aware and passionate about growing.


## Optimizations
*(optional)*

How to immeditaley display user edits on the form with refreshing the page
- Inititally, when the user edits the input form, 
![edit_change_example](https://user-images.githubusercontent.com/67395239/155897144-dd5c9566-80a8-412a-9654-f41f2a451663.gif)


You don't have to include this section but interviewers *love* that you can not only deliver a final product that looks great but also functions efficiently. Did you write something then refactor it later and the result was 5x faster than the original implementation? Did you cache your assets? Things that you write in this section are **GREAT** to bring up in interviews and you can use this section as reference when studying for technical interviews!
