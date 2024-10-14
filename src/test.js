/**
 * test.js
 */
const cron = require('./index');

/**
 * Enable diagnostic output from easy-cronjs.
 */
cron.enableDiagnostics = true;

const counts = {
  halfSecond: { actual: 0, required: 8 },
  oneSecond: { actual: 0, required: 4 },
  twoSeconds: { actual: 0, required: 2 },
};

/**
 * Some test jobs.
 */
cron.addJob('Half Second', 500, () => {
  ++counts.halfSecond.actual;
});

cron.addJob('One Second', 1000, () => {
  ++counts.oneSecond.actual;
});

cron.addJob('Two Seconds', 2000, () => {
  ++counts.twoSeconds.actual;
});

/**
 * Run the actual tests.
 */
new Promise((resolve, reject) => {
  cron.disableJob('Half Second');
  cron.start();
  setTimeout(resolve, 4000);
})
  .then(() => {
    cron.disableJob('One Second');
    cron.disableJob('Two Seconds');
    cron.enableJob('Half Second');
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        cron.stop();
        resolve();
      }, 4000);
    });
  })
  .then(() => {
    console.log(`${counts.halfSecond.actual == counts.halfSecond.required ? '✅' : '🟥'} Every half-second: ${counts.halfSecond.actual} of ${counts.halfSecond.required}`);
    console.log(`${counts.oneSecond.actual == counts.oneSecond.required ? '✅' : '🟥'} Every second: ${counts.oneSecond.actual} of ${counts.oneSecond.required}`);
    console.log(`${counts.twoSeconds.actual == counts.twoSeconds.required ? '✅' : '🟥'} Every other second: ${counts.twoSeconds.actual} of ${counts.twoSeconds.required}`);
    console.log('End tests');
  });
