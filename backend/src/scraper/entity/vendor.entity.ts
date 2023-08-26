type VendorProps = {
  id: VendorId;
  name: string;
  url: string;
};

export enum VendorId {
  JOBSDB = 'jobsdb',
}

export class Vendor {
  private props: VendorProps;

  constructor(props: VendorProps) {
    this.props = props;
  }

  static create(props: Omit<VendorProps, 'id'>, id: VendorId): Vendor {
    return new Vendor({
      ...props,
      id,
    });
  }

  static hydrate(props: VendorProps): Vendor {
    return new Vendor(props);
  }

  serialize(): VendorProps {
    return this.props;
  }

  get id(): string {
    return this.props.id;
  }
}
