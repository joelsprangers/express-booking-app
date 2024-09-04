import express from "express";
import "dotenv/config";
import * as Sentry from "@sentry/node";

// import Routes
import loginRouter from "./routes/login.js";
import usersRouter from "./routes/users.js";
import amenitiesRouter from "./routes/amenities.js";
import bookingsRouter from "./routes/bookings.js";
import hostsRouter from "./routes/hosts.js";
import propertiesRouter from "./routes/properties.js";
import reviewsRouter from "./routes/reviews.js";

// import Middleware
import log from "./middleware/logMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

Sentry;
Sentry.init({
  dsn: "https:process.env.SENTRY_DSN.ingest.sentry.io/xxxxxx" /* Add you own sentry.io dsn here */,
  integrations: [
    //enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    //enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    //Automatically instrument Node.js libraries and frameworks
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context, so that all
// transactions/spans/breadcrumbs are isolated across requests
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// Global middleware
app.use(express.json());
app.use(log);

// Routes
app.use("/users", usersRouter);
app.use("/amenities", amenitiesRouter);
app.use("/bookings", bookingsRouter);
app.use("/hosts", hostsRouter);
app.use("/properties", propertiesRouter);
app.use("/reviews", reviewsRouter);

// Login
app.use("/login", loginRouter);

// Sentry error tracer
app.use(Sentry.Handlers.errorHandler());

// Error handling
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
