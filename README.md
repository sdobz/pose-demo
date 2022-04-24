## Vifive Demo Project

Hello code reviewers! This project is intended to show my coding style and process, as well as to prove that I am able to take high level requirements and translate them into code. This document serves a linear stream of consciousness log describing my thought process.

## Requirements

[Requirements](https://docs.google.com/document/d/1aT1fkeq2yLHYxrjT63eofueMc0Rbv6Y4tUDibxEeg38/edit) were transmitted via email as a gdoc and include 6 main features and two technical requirements. I have prioritizerd them, features will be cut from the bottom if time requires:

1. Skeletal drawing
2. See list of exercises
3. Selection of exercise
4. User autentication
5. Storage of exercise results
6. Pose detection

Technical requiremetns:

* Authentication via firebase
* Storage in firestore

## Architecture

Built on top of firebase and react as it is what I am most familiar with. Single page app so that I do not have to think about servers and can use the react dev server.

Core libraries:
* Typescript
* React
* create react app
* React-router
* Material-ui

## File structure

Use standard `create-react-app`, attempt to use one file per feature with one "main" file tying it all together to make code review more obvious

## Design

Use material UI as it provides a 12 column layout and is widely used and is a google product and vifive seems to use google products (in the absence of strong technical requirements use whatever criteria reduces the solution space most rapidly)

## Resources

No code is created in isolation, I am going to do whatever is most expedient. Unfortunately I have strong code opinions and will probably write an unfortunate amount of code myself. It's gotta be *beautiful* yaknow



## Timing

This project is intended to take no more than 4 hours, though I care about quality and will take as long as I need to create a *working* demonstration. Thus priorities are quality first, then time, then scope.

* `2022-04-22 - 15:00` - Requirements recieved
* `2022-04-24 - 12:15` - Planning begins (this doc)
* `           - 12:30` - `git init` and `npm` setup