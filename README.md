# Sendit Courier

Sendit Courier provides courier delivery services that enable customers to send parcels from the comfort of their homes.

## Hosted Link

You can access the live application at [Sendit Courier](https://senditkenya.vercel.app).

## GitHub Repository

The source code for this project is available on GitHub: [Sendit Courier Repository](https://github.com/Donvine254/sendit-client).

## Features

- Same Day Delivery within Nairobi
- Item Tracking
- Door Delivery
- Fresh Guarantee
- Professional Customer Service

## Technologies Used

- **Next.js 15.1.4**: React framework for server-side rendering and static site generation. This site uses the default configuration with Typescript, Tailwind CSS, ShadCN UI, eslint and Alias Imports.
- **Kinde Auth**: Authentication and authorization.
- **Prisma**: ORM for database management.
- **Invoice Generator**: Service for generating invoices.
- **Google OAuth**: Sending emails via GMAIL. Alternatively you can create an application specific password but this increases the risk of emails being marked as spam automatically.

## Environment Variables

The following environment variables are required for the project:

```js
DATABASE_URL = "";
POSTGRES_URL_NON_POOLING = "";
INVOICE_GENERATOR_API_KEY = "";
// get api key at https://invoice-generator.com/developers
STRIPE_SECRET_KEY = "";
KINDE_CLIENT_ID = "";
KINDE_CLIENT_SECRET = "";
KINDE_ISSUER_URL = "";
KINDE_SITE_URL = "";
KINDE_POST_LOGOUT_REDIRECT_URL = "http://localhost:3000";
KINDE_POST_LOGIN_REDIRECT_URL = "http://localhost:3000";
KINDE_DOMAIN = "https:<Your-Domain>.kinde.com";
KINDE_MANAGEMENT_CLIENT_ID = "";
KINDE_MANAGEMENT_CLIENT_SECRET = "";
```

## License

This project is free to use.

## Getting Started

To get started with the project, clone the repository and install the dependencies:

```bash
git clone https://github.com/Donvine254/sendit-client.git
cd sendit-client
npm install
```

Run the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
