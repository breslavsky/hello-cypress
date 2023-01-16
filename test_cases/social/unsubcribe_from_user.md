Unsubscribe to user test case

# It should do unsubscribe from user:

## Before

1. Open https://demo.realworld.io/
2. Repeat steps 2-9 from [login user](/test_cases/login_user.md)
3. Url should be `/#/` — main page

## Checking for a subscribtion

4.  In feed toggle menu should be active **Your Feed**
5.  Your Feed contains text "No articles are here... yet"?
    * No, go to step 14.
    * Yes, continue.

## Subscribe to user by following him

6. Click **Global Feed** in feed toggle menu
7. List should have 10 article cards
8. Select first article
9. Click buttun **Follow**
10. Confirm that the button text changes to **Unfollow**

## Check user in your subscription list

11. Click **Home**
12. In feed toggle menu should be active **Your Feed**
13. Check `{authorFollowed}` should be visible

## Unsubscribe from user by unfollowing him

14. Select first article    
15. Click button **Unfollow**
16. Confirm that the button text changes to **Follow**
17. Click **Home**
18. In feed toggle menu should be active **Your Feed**
19. Check that your subscription list does not contain `{authorUnfollowed}`

## Where:

- `{authorFollow}` — subscribed author
- `{authorUnfollow}` - unsubscribed author
