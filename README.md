Poller-Bears
============

Survery Gorilla Group Challenge - Brit, Erin, Jordan and Zohar

MVP:
---

* A user can login to create a survey
* A user does not need to login to take an existing survey
* A user can take multiple surveys
* A survey has multiple questions on it
* A question has multiple answers (let's say 5)
* A user can choose one answer per question
* A user can view the results of that survey (other people's answers) AFTER submitting their own answers
* The homepage will display the user signin/login buttons, and a list of links to all available surveys.
* Clicking on a link takes the user to a survery/:id page in order to take the survery
* Clicking a submit button on the bottom of the survey will EITHER direct the user to a new page with the results of said survery (/survey/:id/results) OR will stay on the same page and use JS/jQuery to reveal a hidden list of results. 



Photos:
--------

![Schema for Databases](https://trello-attachments.s3.amazonaws.com/532c7daa1adf51ee58b7aabd/532c7e58c2ef61a71944e1b9/1632x1224/be34276f05b06c40e171ace42a2ee6c4/photo_2.JPG)

![Wireframe for views](https://trello-attachments.s3.amazonaws.com/532c7daa1adf51ee58b7aabd/532c7e9412021ec6656303d4/1632x1224/7719b0e3735c54342d36b201c275db93/photo_1.JPG)


Trello:
-------
![Poller Bears' Tasks](https://trello.com/b/y05YFCNA/poller-bears)

Git Aggreement:
--------------
* Each team will create their own branches to work from.
* The Front-End team will merge the Back-End team's pull requests and vice versa

Git Workflow:
------------
1. git pull origin master
2. git co -b feature_name
3. work on your branch
4. co to master branch (on your local machine)
5. pull origin master (just in case it changed) and merge into local master branch
6. co to your feature branch
7. git merge master into your feature branch (on your local machine)
8. git push origin feature_branch
9. issue pull request
10. other team reviews pull request and merges into master
