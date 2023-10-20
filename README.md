# SENDIT
![alt text](https://res.cloudinary.com/dipkbpinx/image/upload/v1697745132/sendit-homepage_smjdfj.jpg) 

## Project Description
Sendit is a courier services provider based in Kenya that offers reliable and efficient delivery services. The company charges parcel delivery rates based on weight of the parcel, but also charges more for highly valuable parcels. Sendit aims to simplify the process of sending and receiving parcels and cargo through reliable pickup and drop services that ensure riders take orders from the customer preferred pickup location and drop it to any preferred delivery location. The project can be used in conjuction with the ruby on rails API 

## Backend Link

**[sendit-backend](https://github.com/Donvine254/sendit-backend)** 

You will need to ensure the backend is running before locally running the application. 

Alternatively, you can view the deployed sites below
## Deployed Site
=> Frontend 

***[senditcourrier.vercel.app](https://senditcourrier.vercel.app)***

=> Backend api

***[sendit.up.railway.app](https://sendit.up.railway.app)*** 

## TECHNOLOGIES USED
This app is bootstraped using NextJs, which means that most components are server side rendered and console messages might not appear on the browser console. Additionaly, you will need to create API keys for other services detailed below:
* **Next.js**
* **Daisy UI**
* **Tailwind CSS**
* **Axios**
* **React Emails**
* **Nodemailer - requires an API key**
* **Kinde Auth - requires an API key**
* **Google Maps- requires an API key**
* **Upload Thing - requires an API key**
## Getting Started
This is a private repository but if you are granted access, fork and clone this repo and then run the development server

*Create a **.env.local** file at the outermost directory and paste your API keys.* 

Sample API keys include:

**Kinde for login and authentication -https://kinde.com/**
* KINDE_CLIENT_ID=
* KINDE_CLIENT_SECRET=
* KINDE_ISSUER_URL=
* KINDE_SITE_URL=http://localhost:3000
* KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
* KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard 

**Google maps key, get the key by visiting https://console.cloud.google.com**
* NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
#OAUTH for sending emails to the user
* NEXT_PUBLIC_PASSWORD=
* NEXT_PUBLIC_EMAIL=
* NEXT_PUBLIC_OAUTH_CLIENT_ID=
* NEXT_PUBLIC_OAUTH_CLIENT_SECRET=
* NEXT_PUBLIC_OAUTH_REFRESH_TOKEN=
* NEXT_PUBLIC_OAUTH_ACCESS_TOKEN=

**Uploadthing for storing PDF files - https://uploadthing.com/dashboard**
* UPLOADTHING_SECRET=
* UPLOADTHING_APP_ID=

***To start development server, run***
```js
npm install
npm run dev
# or
yarn dev
# or
pnpm dev
#or 
bun run next
```
