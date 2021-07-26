import {
  container,
  DependencyContainer,
  inject,
  injectable,
  InjectionToken,
} from 'tsyringe';

export const Service = injectable;
export const Inject = inject;

export class ServiceLocator {
  private constructor(private readonly container: DependencyContainer) {}

  static createNew(): ServiceLocator {
    return new ServiceLocator(container);
  }

  get<T>(token: InjectionToken<T>): T {
    return this.container.resolve(token);
  }

  set<T>(token: InjectionToken<T>, value: T): void {
    this.container.register(token, { useValue: value });
  }

  child(): ServiceLocator {
    return new ServiceLocator(this.container.createChildContainer());
  }
}
