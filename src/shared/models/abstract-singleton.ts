// This has to be done with a function since static members cannot reference type parameters of the class.
export function Singleton<T>() {
  return class Singleton {
    private static _instance: T;
    public static get Instance(): T {
      return Singleton._instance;
    }

    protected constructor() {}

    public static getInstance(): T {
      if (!Singleton._instance) {
        Singleton._instance = new this() as T;
        const singletonName = (this._instance as Object).constructor.name;
        console.log(`${singletonName} singleton created.`);
        return Singleton._instance;
      }

      return this._instance;
    }

    public static exists(): boolean {
      return Singleton._instance !== undefined;
    }
  };
}
