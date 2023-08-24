type VendorProps = {
  id: string;
  name: string;
  url: string;
};

export class Vendor {
  private props: VendorProps;

  constructor(props: VendorProps) {
    this.props = props;
  }

  static create(props: Omit<VendorProps, 'id'>, id: string): Vendor {
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
