# Angular State Transitions

This project explores view state transitions for users with different security roles in an Angular v20 app. A demo of these transitions can be tested [here](https://mapteb.github.io/angular-state-transitions/).  

This app uses a new architecture by adding a [TransitionsHelper](https://github.com/mapteb/angular-state-transitions/blob/main/src/app/transitions-helper/transitions-helper.ts) which has the following features:<br>
1. Maintains data state across various view transitions,
2. Acts as a provider of data for the components and auth guards, and
3. Acts as a state transitions enabler.

Use of the TransitionsHelper which provides the following benefits:
1. Enables the components to be lightweight and be concerned only with getting the data and displaying the data.
2. Enables merging the ResolveFn functionality with the CanActivateFn reducing the amount of code to be written and tested.

## List of View Transitions

The following users and their roles are considered:
```
1. user/user with ROLE.USER role with access to /home/** pages
2. admin/admin with ROLE.ADMIN role with access to /home/** and /adminhome/** pages
3. guest/guest with ROLE.GUEST role with access to /home/page1 and /home/page2 and no access to /home/page3/** pages
4. Any other users name errors during login
```

Based on the above four user types, the following transitions can be tested in the [demo](https://mapteb.github.io/angular-state-transitions/) app:
```
1. With no user creds, accessing /home should transition to the /login view
2. With ROLE.USER creds, accessing /home should transition to the /home view
3. With ROLE.USER creds, should be able to transition to all the /home/** views except the /adminhome/** views
4. With ROLE.ADMIN creds, accessing /home should transition to the /home view containing a link to /adminhome view
5. With ROLE.ADMIN creds, should be able to transition to the /adminhome view and all the /home/** views
6. With ROLE.GUEST creds, should be able to transition to /home/page1 and /home/page2 and should not be able to view the page3/** links
7. With ROLE.GUEST creds, if the user tried to access /home/page3 or /home/page3/page4 or /home/page3/page5 manually then should be redirected to the /login page with a user not authorized for page3 message << This step will not work in the above demo due to the static file hosting nature of github pages but can be tested in localhost >> 
8. With username other than user|admin|guest submitting /login form should reload the /login view with an unknown user error message
9. With the user signed out, accessing the browser back button should stay back in the /login view
```

## Unit Testing

To run the unit test cases in localhost:

```
git clone https://github.com/mapteb/angular-state-transitions.git
cd angular-state-transtions
npm install

npm run test:ui
```

## e2e Testing

To run the playwright e2e tests in localhost:
```
1.0 npx install playwright

2.1 ng serve << to start a localhost:4200 server in one cmd pad >>
2.2 npx tsx e2e/setup/save-auth-state.ts << This is a one time run to save login creds to playwright/.auth/. Should be run in another cmd pad >>

3.1 stop the localhost:4200 server
3.2 npm run e2e 
```
