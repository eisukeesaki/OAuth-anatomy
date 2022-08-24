# OAuth Anatomy

This project demonstrates the internal workings of the OAuth flow. It implements the behaviors of both the OAuth client and the OAuth provider.

## Apps in this repository

### `OAuthProviderApp/`

This is the OAuth provider. When started, it will listen to port `5000` for HTTP requests.

### `OAuthApp/`

This is the OAuth client. When started, it will listen to port `4000` for HTTP requests.

### Pre-registered credentials

Use the following credentials to sign in at the `OAuthProviderApp`'s login page (``http://localhost:5000/login``).

#### username

`myusername`

#### password

`mypassword`

## Installation

1. clone repository on your local machine
2. `cd` into `OAuthApp/`
3. run `npm install`
4. `cd` into `OAuthProviderApp/`
5. run `npm install`

## Usage

1. run `node OAuthApp/server.js`
2. run `node OAuthProviderApp/server.js`
3. access `http://localhost:4000` in web browser
4. when redirected to the `OAuthProviderApp`'s login page, enter the pre-registered user credentials
5. when redirected to the consent page, accept the consent form
6. when redirected back to the `OAuthApp`, confirm that you are presented with protected resource
