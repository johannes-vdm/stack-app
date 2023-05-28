# Stack App

## Run using 

```git clone https://github.com/johannes-vdm/stack-app .```

```npm install```

```npm run dev```

### Issues encountered:
Rate limiting (bypassed using data.json), should really be provided using a proxy in the backend. 

Use npm with webpack / any other packager you are comfortable with as we are looking for your React skills as well as coding quality.We suggest using CRA (Create React App) as your baseline web application.

```
vite was rather used, as this is a more modern solution.
```

- [x] Application details: At a high level your application will fetch a list of StackOverflow users and display the list on the screen.

- [x]  It must compile without errors -  if there are any potential compilation issues highlight them in your documentation.
- [x] When the app is launched, the user should be able to see a list of the top 20 StackOverflow users.
- [x] Each list item should contain user's profile image, name and reputation
- [x] If the server is unavailable (e.g. offline), the user should see a list of empty states with an error message.
- [ ] Have cells be expandable (upon tapping the cell), with additional options to 'follow' and 'block' a user
Follow/block functionality should just be locally simulated, i.e. no actual API call should be made. The meaning of following and blocking is explained in the points below
Users that are followed should show an indicator in the main part of the list item
Users that are blocked should show in a disabled greyed-out list item; 

- [?] tapping on the item should not open the details view

- [x] Include the 'unfollow' option in the view when a user is followed
Write unit tests wherever you see fit
Emphasize testing and architecture
- [x] Written in either Javascript or Typescript (preferred)
- [x] It should be designed such that the code can bridge to Native
Explain in a few sentences the design decisions you took developing the above app, and describe anything that you were unable to do due to the time constraint
 

Key Requirements: Your solution must meet the following requirements:

- [x] A readme.md in the root of the project with clear instructions on installing and running the application.

- [x] Use react 17 >
- [ ] Provide some baseline unit tests
Any additional documentation where you believe is required for the application.
- [x] If your project is web-based, please ensure that it is responsive

Please indicate roughly how much time you spent on this challenge in the following categories: (this doesn’t have to be accurate, rough estimations are fine) 
- Review
- Design
- Implementation
- Testing
- Documentation
- Optional Bonus Points

- [ ] Generated JSDocument using your favorite documentation tool.
- [x] Add filtering / search input that filters the list of results from the API call.
- [x] Implement a caching strategy.
- [x] Add paging
Other Information: