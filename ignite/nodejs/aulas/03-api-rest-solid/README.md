# App

GymPass style app.

## FRs (Functional Requirements) - Features of the application.

- [x] It must be possible to register
- [x] It must be possible to autenticate
- [x] It must be possible to get the profile of a logged user
- [ ] It must be possible to get the number of check-ins made by the logged user
- [ ] It must be possible the user search for nearby gyms
- [ ] It must be possible the user search for gyms by name
- [x] It must be possible the user to check-in at the gym
- [ ] It must be possible to validate the user check-in
- [ ] It must be possible to register a gym

## BRs (Business rules) - The business rule always is associated a functional requirement because there are path that each function requirement can take.

- [x] The user cannot register with a duplicate email
- [x] The user cannot do two check-ins in the same day
- [ ] The user cannot do check-in if he is not near the gym
- [ ] Check-in can only be validated up to 20 minutes after creation
- [ ] Check-in can only be validated for administrators
- [ ] Gym only be register for the administrators

## NFRs (Not Functional Requirements) - Its the tecnical part (Exp: what database can we use...)

- [x] The user password needs to be encrypted
- [x] The applications data need to persist in a PostgreSQL database
- [ ] The entire data list needs to be paginated with 20 items per page
- [ ] User must be identified with a JWT(Json Web Token)

## Notes

#### "Controller" 
    is a class that handles HTTP requests and responses in web applications
#### "Services" 
    is a basic functionality of the app, for example: creating a user (the user can be created via http or other events...)
#### "Repository Pattern"
     A design pattern that abstracts data access, separating the data layer from business logic for better maintainability and testability.

### SOLID
    S
    O
    L
    I
    D - Dependency Inversion Principle

## Some commands for DEV

npm i prisma -D (prisma develop dependency)
npm i @prisma/client (prisma prod dependency - used for get acces to DB)

npx prisma init - create te prisma schema folder
npx prisma generate - generate type of prisma schema (node_modules/prisma/index.d.ts - create type and mehtods about prisma schema)

docker compose up -d (start containers)
docker compose down (delete the containers and datas)
docker compose stop (stop containers)

