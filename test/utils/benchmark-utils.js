const BenchmarkUtils = {
  async getRuntime(fn) {
    const start = Date.now();
    await fn();
    return Date.now() - start;
  },
};

module.exports = BenchmarkUtils;
