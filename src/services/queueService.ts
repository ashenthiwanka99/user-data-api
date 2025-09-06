import Queue from 'bull';

class SimpleQueue {
  private pending: Map<string, Promise<any>> = new Map();

  async process<T>(key: string, processor: () => Promise<T>): Promise<T> {
    if (this.pending.has(key)) {
      return this.pending.get(key) as Promise<T>;
    }

    const promise = processor().finally(() => {
      this.pending.delete(key);
    });

    this.pending.set(key, promise);
    return promise;
  }
}

export default new SimpleQueue();