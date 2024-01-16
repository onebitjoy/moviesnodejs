Technologies:
- Node.js
- Express.js
- Mongoose
- MongoDB
- 

Models:
- Movie
- Director
- Actor
- Genre

Functionality:
- Filtering
- Sorting
- Pagination
- Limited Fields
- Invalid Route Handling
- Error Handling for the entire application (currently working)

## Security Measures:

### 1 - Compromised Database

 *Mitigation:* bcryptjs with sha256

### 2 - Brute Force Attacks

*Mitigation:*

1 - Use express-rate-limit(rate limiting for maximum attempts)

2 - Bcryptjs hashing latency

### 3- Cross-Site Scripting(XSS) attacks:

*Mitigation*:

1 - Store JWT in HTTPOnly cookies, use Secure and SameSite policies(yet to consider)

2 - Sanitize User Inputs

3 - Set special HTTP Header(using helmet)

### 4 - Denial of Service Attack

*Mitigation:*

1 - Implement Rate Limiting

2 - Limiting payload weight

3 - Avoid Invasive Regular Expressions

### 5 - Query Injection

*Mitigation:*

1 - Use Defined Schema

2 - Sanitize user inputs

### Miscellaneous:

1 - Always HTTPS

2 - Create random password reset token with expiry dates

3 - Deny access to JWT after password change

4 - Don't commit sensitive config data to git(use .gitignore)

5 - Don't send error details to clients(use Custom Error)

6 - Prevent CSRF(using csurf)

7 - Confirm email address after account is created

8 - Keep user logged in with refresh tokens

9 - Implement two-factor authencation

10 - Prevent parametric pollution causing uncaught exceptions 