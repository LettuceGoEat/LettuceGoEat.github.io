# LettuceGoEat.github.io

README file that briefly describes the code, e.g., main JavaScript file, or where main feature implementations are, etc. Several lines are enough.

There are no main Javascript files. Instead we made a modulorised architecture where each page has its own .js file. However, we have firebaseInit.js and base.html which implements the basic functionalities of our page (cookies, firebase...) and are therefore imported by all other html files (firebaseInit.js uses base.html).

Main functionalities and locations:


  <b>login.js:</b>
The login page manages users entry into the application. It also verifies the user identity. Users are kept in the database.

<b>signup_1.js and signup_2.js</b>
The signin page and also the profile page (signup_2). Manages the user profiles, the user provide his information on his type of vegetarian and can modify it afterwards if needed.


<b>schedule.js</b>
The schedule is the main application page where the user can see what dinners he has schedule and leave or access the chat of any of them.


<b>findgroup.js</b>
The find group page let's the user find and join group. The meals are filtered by default by his preferences but he can modify them to suit his current needs and he can also filter by day or meal time. Dinners he can not access (already joined or conflicting time with joined dinners) are not shown. 

<b>creategroup.js</b>
The create group page let's the user create his own dinner with specific criterias which others can see.

<b>chat.js</b>
Any chat's dinner can be accessed from the schedule while viewing the corresponding dinner. The chat let's the user speak with any group members and share information. He can also see the information of his group members.

<b>firebaseInit.js</b>
This is the base js for all pages. It initialises the firebase, cookies and also creates the header which contains three icons. These icons correspond to the three main pages: schedule, joingroup and profile. The user can navigate between them by clicking on the corresponding icon.







