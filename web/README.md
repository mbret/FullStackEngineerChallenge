# Web

### Technology and design choices

- I used react as main library. I m the most confortable with.
- Used `create-react-app` to quickly bootstrap a working base project.
- I have not used any complex state management library nor `useReducer`. The reason is because due to the limited time
and requirements I focused on having something working faster. I assumed the goal of this challenge wasn't to have a perfect state
management.
- Used `react-bootstrap` to have (sometime) something a little bit less ugly but really mainly to avoid doing css in order to be faster.
- Used `formik` to quickly have an interface to deal easily with form. I also initially wanted to do validation and more about the form (thus using a library)
but then due to time limit I had to drop the ideas.
- No Error catch mecanism for both api & web
- I went with a `folder-by-feature` approach to have an easier navigation through the code when looking for a feature related code.

### How to run

`yarn && yarn start`