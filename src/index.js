/**
 * index.js
 */

const self = {
  enableDiagnostics: false,
  jobs: {},
  isRunning: false,

  start: () => {
    if (!self.isRunning) {
      if (self.enableDiagnostics) {
        console.log('easy-cronjs: Starting all jobs');
      }

      self.isRunning = true;

      for (const jobName in self.jobs) {
        if (self.jobs[jobName].isEnabled) {
          if (self.enableDiagnostics) {
            console.log(`easy-cronjs: startjob "${jobName}" (interval=${self.jobs[jobName].interval})`);
          }

          self.tick(jobName);
        }
      }
    }
  },

  stop: () => {
    for (const jobName in self.jobs) {
      const job = self.jobs[jobName];

      if (job.isEnabled || job.timeout) {
        console.log(`easy-cronjs: stopjob ${jobName}`);
      }

      if (job.timeout) {
        clearTimeout(job.timeout);
        job.timeout = null;
      }
    }

    self.isRunning = false;
    console.log('easy-cronjs: stopped');
  },

  getJobCount: () => {
    return Object.keys(self.jobs).length;
  },

  addJob: (jobName, interval, callback, isEnabled = true) => {
    self.jobs[jobName] = {
      interval,
      callback,
      tickIndex: 0,
      isEnabled: isEnabled,
      timeout: null,
    };
  },

  enableJob: (jobName) => {
    if (jobName && self.jobs[jobName] !== 'undefined') {
      const job = self.jobs[jobName];

      job.isEnabled = true;

      if (self.isRunning && !job.timeout) {
        self.tick(jobName);
      }
    }
  },

  disableJob: (jobName) => {
    if (jobName && self.jobs[jobName] !== 'undefined') {
      const job = self.jobs[jobName];

      job.isEnabled = false;

      if (job.timeout) {
        clearTimeout(job.timeout);

        job.timeout = null;
      }
    }
  },

  tick: (jobName) => {
    if (jobName && self.jobs[jobName] !== 'undefined') {
      const job = self.jobs[jobName];

      if (self.enableDiagnostics) {
        console.log(`easy-cronjs: tickjob "${jobName}" (index=${job.tickIndex})`);
      }

      job.timeout = null;
      job.callback();
      ++job.tickIndex;

      if (self.isRunning && job.isEnabled) {
        // console.log( 'Setting timeout');

        job.timeout = setTimeout(() => {
          self.tick(jobName);
        }, job.interval);
      }
    }
  },
};

module.exports = self;
