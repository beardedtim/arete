# arete

> User Microservice for Data, Authentication, and Authorization

# Overview

## Name

[Some minor Greek God](https://en.wikipedia.org/wiki/Arete#Personification)

## Domains

This houses all of our business logic and is exposed via `ctx.useCases.DomainName`

## Routes

This houses all of our HTTP/RESTful interfaces. It is file-based routing.

#### Keys and Query Arguments

Any route that returns a user can be given a `keys` query argument, which can be an array of
strings that represent the keys on the user objec that you want to return. You CANNOT return
the `password` field.

When you query `GET /api/users`, along with `keys` you can send

- `limit`: the max amount of records to retrieve
- `offset`: the amount of records to skip
- `sort_ord`: `DESC` or `ASC`. Defaults to `DESC`
- `sort_col`: the column to on. Defaults to `last_updated`

## Authentication

Once a user is created in the system, you can authenticate them for a request by making
a `POST` request with a JSON body of `{ email, password }`. This will

1. Create a JWT of the user
2. Return a body of `{ data: <token> }`
3. Set a cookie for later use

All incoming requests check for the cookie or for the `Authorization: Bearer <token>` header.

JWTs have a default time to live of 1hr from signing. You can change this by changing the `env`
`JWT_TTL`.

## Authorization

_**TODO**_

