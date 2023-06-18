# Trello-Clone
This is a trello clone.

Answer to the given questions,

Scenario 1:
If a user can create and edit stages for a particular board. For example instead of Open > In Progress > Done if they want the stages of their task board to be Read > Working > Reviewing > Completed:
We can add a new column to our board table as 'Stages' where we will be storing the expexted the stages given by the user.
API Endpoints: we need to update the API endpoint to include the "Stages" parameter, allowing the user to specify the stages for the board.
Update the API endpoint to enable the user to modify the existing stages for a board.

Scenario 2: 
If users can comment on tasks:
Create a new table to store comments. This table should have columns such as CommentID, TaskID (foreign key), UserID (to associate the commenter), CommentText, CreatedAt, etc.
API Endpoint:
We need to create new api endpoint to handle the creation of comments. It may include parameters like "TaskID" and "CommentText".
For editing the comments that should include parameters like "CommentID" and "CommentText".

Scenario 3: 
How will you do error handling?
a. Validate Input: Perform input validation on the server-side to ensure the stages provided by the user are valid and properly formatted.
b. Error Messages: Return meaningful error messages in case of validation failures or other issues, helping the user understand what went wrong.
c. Status Codes: Use appropriate HTTP status codes (e.g., 400 for bad requests, 404 for not found) to indicate the status of the API response.
d. Exception Handling: Implement proper exception handling on the server-side to catch and handle any unexpected errors gracefully.
e. Logging: Implement logging mechanisms to capture and record any errors or exceptions for debugging and analysis purposes.
