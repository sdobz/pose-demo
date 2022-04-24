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

- Authentication via firebase
- Storage in firestore

Initial impressions is that this represents over 8 hours of work to get in a polished state.

## Architecture

Built on top of firebase and react as it is what I am most familiar with. Single page app so that I do not have to think about servers and can use the react dev server.

Core libraries:

- Typescript - types are beautiful and fun. also make the computer do as much work verifying code as possible
- yarn - it's faster and the lockfile is more sane
- React - reactive design is amazing, of course everything should derive deterministically from easy to reason about state
- create react app - start fast
- React-router - familiar
- Material-ui - 12 columns pls, real projects should use all custom css but let's start simple

## File structure

Use standard `create-react-app`, attempt to use one file per feature with one "main" file tying it all together to make code review more obvious

## Design

Use material UI as it provides a 12 column layout and is widely used and is a google product and vifive seems to use google products (in the absence of strong technical requirements use whatever criteria reduces the solution space most rapidly)

## Running notes

No code is created in isolation, I am going to do whatever is most expedient. Unfortunately I have strong code opinions and will probably write an unfortunate amount of code myself. It's gotta be _beautiful_ yaknow

### Bootstrap

I know that there is a project bootstrap tool called `create-react-app` and I know there are tons of examples available. A google search for `create react app typescript react router material ui template` reveals a nice [example project](https://github.com/mui/material-ui/tree/master/examples/create-react-app-with-typescript) let's start with a copy of that

**First speedbump!**

Oh no my node is v14 yarn requires v16 and my brew install is broken. Fixfixfix, if this takes too long do not use yarn. While git is gitting use this opportunity to walk around and stretch. ~8min timebox. Whew issue sorted

`npm start` - this is taking an unfortunate amount of time. Gosh I dislike the node ecosystem, it is so chunky. Okay working!

### Publishing

Okay, let's **get it deployed**. The goal is a really ergonomic review experience, I've reviewed these projects myself and it puts me in a sour mood if it takes too much effort to see it. Goal: https://some-url.github.io/ and it _just works_

Okay, technical issue: github pages does not easily support routing. Yurk, okay I will not use any routing.

Following tutorial [here](https://medium.com/@itspaulolimahimself/deploying-a-react-js-spa-app-to-github-pages-58ddaa2897a3)

**second speedbump**

gh-pages isn't cooperating. timebox: 5 minutes. Why is it 404ing?

_aside_ - I am working on setting up my dev-loop of build to publish very early, this is a platform role and it's what I'm passionate about

Hmn, it looks like I need to do some settings stuff. let's see... [ah yep](https://github.com/sdobz/pose-demo/settings/pages)

> Note: It can take up to 10 minutes for changes to your site to publish after you push the changes to GitHub.

Okay patience.

### Feature 1: pose estimation

An example pose detection library was provided, let's get it embedded

Ugh wow this isn't going to be trival. First let's just copy the `src` folder into this repo, a quick `LICENSE` check indicates that I can copy thier code as long as I preserve the license. Adding a README and LICENSE to indicate this...

First a clean commit of vendored code so I can monitor the exact changes I make. Next copy all of their deps into our package. Unfortunately one of their dependencies is the `pose-detection` relative folder, let's see if it is on NPM otherwise this will get hairy. `@tensorflow-models/pose-detection` nice

`index.js` should show me how this app is embedded in an html page. Hmn, it just runs `app()` at the bottom so it's probably in `public/index.html`

EEEGAD I need auto formatting. I should never ever have to think about how code is formatted. Installing `prettier`...

Okay the demo requires some parameters that come in through the url, `type` and `model`

Let's mock them out and pass in as a function parameter rather than a urlparam

> `ReferenceError: dat is not defined`

Ah right there was some library embedded in index.html, let's see if I can pull it in. [`dat.gui@0.7.6`](https://github.com/dataarts/dat.gui) and [`statsjs@r16`](https://github.com/mrdoob/stats.js/) - can't find exact stats version so use `1.0.1`

A cleanup function was added so it didn't add redundant overlays during hot-reload operations

#### Cleaning up warnings

> three.module.js:49338 THREE.BufferGeometry: .addAttribute() has been renamed to .setAttribute().

This is irritating and spamming the console and is in a transitive dependency, let's downgrade three until it goes away. Using the url structure `https://github.com/mrdoob/three.js/blob/r113/src/Three.Legacy.js` we can keep changing the tag `r113` to binary search until `addAttribute` no longer appears. It is not present in `r109` and it is present in `r110` - thus let's downgrade to `0.109`

> ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it’s running React 17. Learn more: https://reactjs.org/link/switch-to-createroot

Additionally react seems to have changed their root mounting, fixing that warning too.

#### Deployment checking

Still not deployed, there is some issue with gh-pages setup. Ah! it appears to be trying to build it as jekyll, let's add a .nojekyll file and try again.

## Timing

This project is intended to take no more than 4 hours, though I care about quality and will take as long as I need to create a _working_ demonstration. Thus priorities are quality first, then time, then scope.

- `2022-04-22 - 15:00` - Requirements recieved
- `2022-04-24 - 12:15` - Planning begins (this doc)
- ` - 12:30` - `git init` and `npm` setup
- ` - 12:45` - Clone of example
- ` - 13:00` - clone complete, project bootstrapped let's get developing
- ` - 13:15` - Deployment (in)complete, skipping due to time box. first feature starting
- ` - 14:45` - Finished embedding pose demo, took 1.5 hrs (not surprising). second feature starting
