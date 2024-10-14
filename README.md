# easy-cronjs

A simple tool for running multiple periodic tasks at regular intervals.

There's a global start/stop and jobs can be started/stopped individually too.

## Installation

```bash
npm install @headwall/easy-cronjs
```

## Usage

```javascript
const cron = require('@headwall/easy-cronjs');

// Enable diagnostics (optional).
// cron.enableDiagnostics = true;
// Do something every 1000ms (one second interval)

cron.addJob('My Cron Job', 1000, () => {
	console.log('tick');
});

// Start easy-cronjs
cron.start();

//
// Your application logic...
//

// Stop easy-cronjs
cron.stop();

// All done
console.log('end');
```
## Other useful bits

```javascript
// Disable an individual job by name.
cron.disableJob('My Cron Job');


// Enable an individual job by name.
cron.enableJob('My Cron Job');


// How many jobs are currently managed?
console.log(cron.getJobCount());
```

## Scripts

```bash
# Run tests
npm run test

# Build a distribution zip
npm run build

# Clean all builds
npm run clean
```
