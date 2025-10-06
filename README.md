# Angular State Transitions

This project explores view state transitions for users with different security roles in Angular v20. A demo of these transitions can be tested [here](https://mapteb.github.io/angular-state-transitions/).  


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
7. With ROLE.GUEST creds, if the user tried to access /home/page3 or /home/page3/page4 or /home/page3/page5 directly then should be redirected to the /login page with a user not authorized for page3 message 
8. With username other than user|admin|guest submitting /login form should reload the /login view with an unknown user error message
9. With the user signed out, accessing the browser back button should stay back in the /login view
```

## Unit Testing

To run the unit test cases in localhost:

```
git clone https://github.com/mapteb/angular-state-transitions.git
cd angular-state-transtions
npm install

npm run test
```

## e2e Testing

To run the playwright e2e tests in localhost:
```
npx install playwright
npx tsx e2e/setup/save-auth-state.ts << one time run to save login creds to playwright/.auth/ >>
npm run e2e
```
