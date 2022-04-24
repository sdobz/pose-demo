## Pose estimation Demo Project

Hello code reviewers! This project is intended to show my coding style and process, as well as to prove that I am able to take high level requirements and translate them into code. This document serves a linear stream of consciousness log describing my thought process.

## Requirements

Requirements were transmitted via email as a gdoc and include 6 main features and two technical requirements. I have prioritizerd them, features will be cut from the bottom if time requires:

1. Skeletal drawing
2. See list of exercises
3. Selection of exercise
4. User autentication
5. Storage of exercise results
6. Pose detection

Technical requiremetns:

* Authentication via firebase
* Storage in firestore

Initial impressions is that this represents over 8 hours of work to get in a polished state.

## Architecture

Built on top of firebase and react as it is what I am most familiar with. Single page app so that I do not have to think about servers and can use the react dev server.

Core libraries:
* Typescript - types are beautiful and fun. also make the computer do as much work verifying code as possible
* yarn - it's faster and the lockfile is more sane
* React - reactive design is amazing, of course everything should derive deterministically from easy to reason about state
* create react app - start fast
* React-router - familiar
* Material-ui - 12 columns pls, real projects should use all custom css but let's start simple

## File structure

Use standard `create-react-app`, attempt to use one file per feature with one "main" file tying it all together to make code review more obvious

## Design

Use material UI as it provides a 12 column layout and is widely used and is a google product and vifive seems to use google products (in the absence of strong technical requirements use whatever criteria reduces the solution space most rapidly)

## Running notes

No code is created in isolation, I am going to do whatever is most expedient. Unfortunately I have strong code opinions and will probably write an unfortunate amount of code myself. It's gotta be *beautiful* yaknow

### Bootstrap

I know that there is a project bootstrap tool called `create-react-app` and I know there are tons of examples available. A google search for `create react app typescript react router material ui template` reveals a nice [example project](https://github.com/mui/material-ui/tree/master/examples/create-react-app-with-typescript) let's start with a copy of that

**First speedbump!**

Oh no my node is v14 yarn requires v16 and my brew install is broken. Fixfixfix, if this takes too long do not use yarn. While git is gitting use this opportunity to walk around and stretch. ~8min timebox. Whew issue sorted

`npm start` - this is taking an unfortunate amount of time. Gosh I dislike the node ecosystem, it is so chunky. Okay working!

### Publishing

Okay, let's **get it deployed**. The goal is a really ergonomic review experience, I've reviewed these projects myself and it puts me in a sour mood if it takes too much effort to see it. Goal: https://some-url.github.io/ and it *just works*

Okay, technical issue: github pages does not easily support routing. Yurk, okay I will not use any routing.

Following tutorial [here](https://medium.com/@itspaulolimahimself/deploying-a-react-js-spa-app-to-github-pages-58ddaa2897a3)

**second speedbump**

gh-pages isn't cooperating. timebox: 5 minutes. Why is it 404ing?

*aside* - I am working on setting up my dev-loop of build to publish very early, this is a platform role and it's what I'm passionate about

Hmn, it looks like I need to do some settings stuff. let's see... [ah yep](https://github.com/sdobz/pose-demo/settings/pages)

> Note: It can take up to 10 minutes for changes to your site to publish after you push the changes to GitHub.

Okay patience.

### Feature 1: pose estimation

An example pose detection library was provided, let's get it embedded

Ugh wow this isn't going to be trival. First let's just copy the `src` folder into this repo, a quick `LICENSE` check indicates that I can copy thier code as long as I preserve the license. Adding a README and LICENSE to indicate this...



## Timing

This project is intended to take no more than 4 hours, though I care about quality and will take as long as I need to create a *working* demonstration. Thus priorities are quality first, then time, then scope.

* `2022-04-22 - 15:00` - Requirements recieved
* `2022-04-24 - 12:15` - Planning begins (this doc)
* `           - 12:30` - `git init` and `npm` setup
* `           - 12:45` - Clone of example
* `           - 13:00` - clone complete, project bootstrapped let's get developing
* `           - 13:15` - Deployment complete, first feature starting