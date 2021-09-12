import { ServiceLocator } from './ServiceLocator';

class ServiceA {}

class ServiceB {
  constructor(private readonly someValue: number) {}
}

describe('utils/ServiceLocator', () => {
  it('should correctly set and get services', () => {
    const serviceLocator = ServiceLocator.createNew();

    serviceLocator.set(ServiceA, new ServiceA());
    const serviceA = serviceLocator.get(ServiceA);

    expect(serviceA).toBeDefined();
  });

  it('should correctly set and get services from child instance', () => {
    const serviceLocator = ServiceLocator.createNew();

    serviceLocator.set(ServiceA, new ServiceA());
    const childServiceLocator = serviceLocator.child();
    const serviceA = childServiceLocator.get(ServiceA);

    expect(serviceA).toBeDefined();
  });

  it('should throw if a requested service is not present and cannot be auto-instantiated', () => {
    const serviceLocator = ServiceLocator.createNew();

    expect(() => {
      serviceLocator.get(ServiceB);
    }).toThrowError('TypeInfo not known for "ServiceB"');
  });
});
