# OAuth 

```text

OAuth for user authentication
    user
        person who uses the web application
            through the client application
    client application
        wants to
            access resource server
                perform actions on resource
                    on behalf of resource owner
        interfaces
            user
    resource owner
        owns
            web application
                resource server
                    HTTP server
                        POV of this mind map
                        hosts(verb)
                            resource
                                protected
                        handles
                            requests for access to resource
                        asks
                            user for consent
                                to share their data to web application
                                                └─ stored inside OAuth provider's database
        can granting access to protected resource
    OAuth provider
        authorization server
            knows resource owner
            owns user's information
                identity data
                    email
                    name
                    profile image
                    ...
                can share to resource owner
            can authorize client to access resource 

```

