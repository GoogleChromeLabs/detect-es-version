const BenchmarkUtils = {
  async getAsyncRuntime(fn) {
    const start = Date.now();
    await fn();
    return Date.now() - start;
  },

  getRuntime(fn) {
    const start = Date.now();
    fn();
    return Date.now() - start;
  },
};

module.exports = BenchmarkUtils;
