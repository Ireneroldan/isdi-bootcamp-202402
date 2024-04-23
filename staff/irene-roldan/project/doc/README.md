# Tasking app

## Intro 
Tasking is a project management tool that uses virtual boards to organize tasks and collaborate with teams. 


![](https://media.giphy.com/media/Dwv8Wl7vI1JUuOektL/giphy.gif?cid=790b76115hl50akmlugqmo6tvxbbsi9mjff9h09fp6azdiw9&ep=v1_gifs_search&rid=giphy.gif&ct=g) 


## Functional


### UI Design
[Figma](https://www.figma.com/file/eu5ckftACDFTGujr1UL9lF/Proyecto-isdi?type=design&mode=design&t=wiiC8brQOOJODEYf-0)

## Technical description
- Create task lists
- Create new boards
- Share the boards with other users
- Assign team members to tasks
- Track task progress with percentage
- Change the states of tasks to to-do, doing, review and done


v0.1
- Chat with team users 
- Design in Dark mode and Light mode
- Search and filtering tasks
- Add tags to tasks
- Add to calendar dates or events
- Add comments 
- Register a task worktime 
- Custom the avatar 

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
- id (required)
- name (string, required)
- last Name(string, required)
- email (string, required)
- password (string, required)
- avatar (string, required)

Board
- id(required)
- name(string, required)
- assigned task id()
- assigned user id()

Task
- id(required)
- name(string, required)
- description(string, required)
- state (string, required)
- assigned user id
- id board 

