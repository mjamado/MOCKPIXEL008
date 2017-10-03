# Mercedes-Benz Pixels Camp Challenge

## Project name

mysmart

![logo](/screenshots/4lB02BJh.png)

## Team members

  - Carlos Martins
    - [carlosmartins8@gmail.com](mailto:carlosmartins8@gmail.com)
    - [@kill_master](https://twitter.com/kill_master)
  - Marco Amado
    - [mjamado@dreamsincode.com](mailto:mjamado@dreamsincode.com)
    - [@mjamado](https://twitter.com/mjamado)
  - Joana Rijo
    - [joanarijodesign@gmail.com](mailto:joanarijodesign@gmail.com)
    - [@joanarijo](https://twitter.com/joanarijo)
  - Afonso Muralha
    - [afonsomuralha@gmail.com](mailto:afonsomuralha@gmail.com)
    - [@af0nsus](https://twitter.com/af0nsus)

## Project Description

The **smart** is an object of desire for the GenY (Millenials) and GenZ (iGeneration). It's a statement that differentiates them, automobile-wise, from the sedans and hatchbacks of GenX, let alone baby boomers. And, at the end of the day, it doesn't hurt that it's a Mercedes, either.

Given the highly connected status of those generations, it struck us as odd that the **smart** doesn't have an app, where drivers could check on the status and location of their car.

Given the opportunity by the provided API, we've set ourselves on building a multiplatform dashboard to control and oversee your **smart**.

With our app you'll be able to:

- check the current status of your car (locked/open doors, battery, fuel level, etc);
- interact with your car (lock and unlock your car, turn on the lights, etc);
- find your car;
- prevent your car from being taken, by automatically imobilizing it and notifying you if it moves beyond a predefined virtual fence;
- vast range of features not on display at time of presentation due to current API constraints;

Made as a building block for our vision of a more practical, connected, and simpler way to interact with your car.

## How to build and run the project.

The app needs [node.js](https://nodejs.org/en/) (current version, v8+, is recommended) and [yarn](https://yarnpkg.com/en/docs/install) to be installed.

On the project folder, run `yarn install`. It should install all the dependencies. After that, `yarn start` should start the server and automatically open a browser on [http://localhost:3000](http://localhost:3000) (it may take a while on the first time). From there, you can explore the app directly from the browser, with or without mobile emulation, or point a mobile device to the IP (and port 3000) of the computer running the server.

On a mobile device, you can "Add to homescreen" for a more immersive experience. Given the constraints of the environment where the app is running (non-SSL localhost), the installed webapp might not work exactly as we intended. See below for other constraints and notes.

# Screenshots
![Status page](/screenshots/evfmbkg.jpg)
![Status page with open door](/screenshots/RFYLKFt.jpg)
![Map page](/screenshots/0phjIYP.png)
![Secure parking](/screenshots/sxL7J2S.jpg)

## Improvements and other ideas

Because of the constraints inherent to an hackathon and it's limited time, a lot of... err... *liberties*... were taken on the development of this webapp. To that contributed the fact that the API wasn't working on the first night, which put even more pressure on the deadline.

- The app is horizontally responsive, but not vertically - we were testing on a rather large smartphone and only noticed that the height was going to be a problem too late;
- The notification of out-of-fence status is hit-and-miss, to say the least. It was done with a service worker, but not in the way service workers are intended to function. The proper way was to use push notifications, but we didn't had the time to configure a push notification service, set our server code to send data to that service, which would then push it to the webapp;
- On that note, API access was naively done: we're fetching status and location every half a second. Honestly, we should've been banned from the API for doing that. We should've ping the `events` endpoint instead and act accordingly. Again, the hackathon time constraints contributed for this bad practice;
- On bad practices, don't run `yarn test`, `yarn lint` or any other of the analysis commands - it was not on our list of concerns. Our only concern was that it worked;
- We had a list of features that we would like the API to have. We understand that this API was made for a specific service (car2go), but we're wishing a *fashion* car like the **smart** eventually has access to a more fullblown API. Following are a list of feature we would've liked to see:
  - The range of the car;
  - Average full consumption;
  - Climate control;
  - Radio/Media dashboard control;
  - Vehicle instrumentation panel mirroring;
  - Integration with webservices (or allow developers to do the integration), such as IFTTT;
  - Integration with smart devices and homes (eg. NEST);

## Feedback

The Mercedes stand was an hotspot during the entire event. The **smart** was fun to fiddle with, and the sports convertible was an eye candy for everybody.

The team was always available, highly approachable and knowledgable. The problems we've encountered were always addressed swiftly and correctly, even with further explanations when none was due. For instance, when the API crashed during the first night, it was brought back online on the following morning, and it was explained and even shown to us the amount of load the API was under. They had no obligation to do so, but the extra mile was appreciated.
