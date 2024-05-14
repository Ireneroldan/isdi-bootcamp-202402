# Tasking app

## Intro 
Tasking is a project management tool that uses virtual boards to organize tasks and collaborate with teams. 


![](https://media.giphy.com/media/Dwv8Wl7vI1JUuOektL/giphy.gif?cid=790b76115hl50akmlugqmo6tvxbbsi9mjff9h09fp6azdiw9&ep=v1_gifs_search&rid=giphy.gif&ct=g) 


## Functional


### UI Design
[Figma](https://www.figma.com/file/eu5ckftACDFTGujr1UL9lF/Proyecto-isdi?type=design&mode=design&t=wiiC8brQOOJODEYf-0)

## Use Cases
- List boards (created by, or assigned to)
- Create new board 
- Delete a board (only if no asigned users)
- Share a board with other user
- Create a task (in board) 
- Delete a task (from board)
- Change task status (todo, doing, review, done)
- Archive task 

v0.1
- Assign team members to tasks(via id)
- Chat with team users 
- Design in Dark mode and Light mode
- Search and filtering tasks
- Add tags to tasks
- Add to calendar dates or events
- Add comments 
- Register a task worktime 
- Custom the avatar 
- Track task progress with percentage
- Choose dark mode

## Technical Description

### Modules

- api (server logic)
- app (client interface)
- com

### Technologies

- Typescript
- Vite
- React
- Express.js
- Node
- Tailwindcss
- Mongoose

### Data model

User
- id (auto, required)
- name (string, required)
- surname (string, required)
- email (string, required)
- password (string, required)
- avatar (string, required)

Board
- id (auto, required)
- owner (User.id, required)
- name (string, required)
- assignees ([User.id], optional)
- creationDate (Date, required)

Task
- id (auto, required)
- board (Board.id, required)
- author (User.id, required)
- status (string, required, enum: todo|doing|review|done)
- name (string, required)
- description (string, required)
- assignees ([User.id], optional)
- creationDate (Date, required)