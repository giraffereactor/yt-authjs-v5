== PART 1 ==

[X] Create Next.js App WITH CLI
[X] Clean up files
[X] Install shadcn/ui
[X] Create Navbar
[X] Install shadcn button, form, input
[X] Create signup page
[X] Install valibot
[X] Create signup validator
[X] Create signup form
[X] Create signup server action
[X] Handle errors
[X] Hash password
[X] Create signin page
[X] Create signin validator
[X] Create signin form
[X] Create signin server action

== PART 2 ==

[X] Install prettier plugin tailwindcss
[X] Install Drizzle ORM / Drizzle Kit
[X] Create Drizzle Config
[X] Create Drizzle Schema
[X] Install Auth.js
[X] Update drizzle schema (password, role, email uniqueness)
[X] Setup Postgres with NeonDB
[X] Create helper scripts
[X] Show how to view data (drizzle studio, neon console)
[X] Create drizzle singleton
[X] Signup our first user
[X] Handle email conflicts
[X] Create success message

== PART 3 ==

[X] Redirect Links
[X] Setup AuthJS config
[X] Auth Secret, Auth Url
[X] Partial Signin - Parse Credentials
[X] User Queries
[X] `server-only` package
[X] Partial Signin - Log User
[X] Complete Signin
[X] Error Handling
[X] Create /profile
[X] Redirect to /profile
[X] Session info server side (auth function)
[X] Display information as table
[X] Create signout button
[X] Signout action
[X] Discussion: Next.js Client vs Server Components
[X] Navbar Links
[X] Session server side in NavbarLinks
[X] Session client side in NavbarLinks
[X] Session Provider
[X] Route Handlers
[X] Full Signin Signout flow

== PART 4 ==

[X] Setup Google OAuth
[X] Install Simple Icons
[X] Create OAuth Signin Buttons
[X] Test Google SignIn
[X] Setup Github OAuth
[X] Test Github SignIn
[X] Drizzle Adapter

Drizzle Adapter Source Code
https://github.com/nextauthjs/next-auth/blob/main/packages/adapter-drizzle/src/lib/pg.ts

[X] AuthJS Callbacks
[X] Extend Session Information
[X] Extend Typescript Types
[X] Update Drizzle Adapter
[X] `@auth/core`
[X] AuthJS Events

== PART 5 ==

[X] Working with user from database instead of session
[X] Updating the session (schema, server action)
[X] JWT Callback (trigger)
[X] Verify With SignIn Callback

_CASE 1_
If I made an account with an OAuth Provider (Google or Github)
AND I am **LOGGED OUT**
I cannot login with the other OAuth Provider that has the same EMAIL

e.g. Create account with Github for email `giraffereactor@gmail.com`
THEN I cannot login with Google for email `giraffereactor@gmail.com`

BECAUSE of `allowDangerousEmailAccountLinking = false`

_CASE 2_
If I made an account with OAuth Provider (Google or Github)
AND I am **LOGGED OUT**
I cannot login with the Credentials Provider that has the same EMAIL

e.g. Create account with Github for email `giraffereactor@gmail.com`
THEN I cannot login with Credentials for email `giraffereactor@gmail.com`

BECAUSE in `auth.ts` my `authorize` has the statement `if (!user.password) return null`
AND accounts created with OAuth Providers have no password.

[X] Custom Errors
[X] allowDangerousEmailAccountLinking

We will set `allowDangerousEmailAccountLinking = true`

**NOW - IF WE ARE LOGGED OUT**
if we make an acc with credentials -> we can link google and/or github to that same email
if we make an acc with google -> we can link github to that same email
if we make an acc with github -> we can link google to that same email

[X] DISCUSSION about **LOGGED IN** and account linking
[X] Protect Pages With Auth
[X] Authorized Callback
[X] Protect Pages With Middleware
[X] The Problem With The Crypto Module
[X] The `auth.config.ts` File

== PART 6 ==

[X] User Roles
[X] How to create an admin user
[X] Option 1 - The process.env method
[X] Option 2 - The process.env method (extended)
[X] Option 3 - Manually edit in SQL Console
[X] Option 4 - Create Admin Email Table
(continue from here)
[X] Option 5 - ADMIN Dashboard
[X] Email Verification Checkbox
[X] Email Verification Action
[X] Role Change Select
[X] Role Change Action
[X] Discussion - Don't allow admins to edit each other

[X] Email Time - Nodemailer
[X] Google Cloud Console
[X] OAuth Playground
[X] Setup Transporter (Nodemailer Instance)
[X] Verification Token Action
[X] Discussion Delete Verification Tokens **
[X] Auth Config Deny Email Verification
[X] Forgot Password UI
[X] Forgot Password Action (deter OAauth)
[X] Reset Password Form
[X] Reverify in Server Action
[X] Again with **

Extensions:

TRY THESE

1. delete user (as an admin)
2. manage verification tokens (delete them as needed)
3. add update to user.images
4. add another OAuth provider
5. add a third role
