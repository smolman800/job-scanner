import { Vendor, VendorId, VendorProps } from './vendor.entity';

function createVendorProps(overrideProps?: Partial<VendorProps>): VendorProps {
  return {
    id: VendorId.JOBSDB,
    name: 'JobsDB',
    url: 'https://th.jobsdb.com/th',
    ...overrideProps,
  };
}

describe('Vendor', () => {
  test('create should throw error if name is empty', () => {
    const props = createVendorProps({
      name: '',
    });
    expect(() => Vendor.create(props, props.id)).toThrow(
      'name cannot be empty',
    );
  });

  test('create should throw error if url is empty', () => {
    const props = createVendorProps({
      url: '',
    });
    expect(() => Vendor.create(props, props.id)).toThrow('url cannot be empty');
  });

  test('create should return an instance of Vendor', () => {
    const props = createVendorProps();
    const vendor = Vendor.create(props, props.id);
    expect(vendor).toBeInstanceOf(Vendor);
  });

  test('hydrate should return an instance of Vendor', () => {
    const vendor = Vendor.hydrate(createVendorProps());
    expect(vendor).toBeInstanceOf(Vendor);
  });

  test('serialize should return props', () => {
    const props = createVendorProps();
    const vendor = Vendor.hydrate(props);
    expect(vendor.serialize()).toEqual(props);
  });
});
