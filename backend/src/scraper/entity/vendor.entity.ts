import { AggregateRoot } from '@nestjs/cqrs';

export type VendorProps = {
  id: VendorId;
  name: string;
  url: string;
};

export enum VendorId {
  JOBSDB = 'jobsdb',
  BLOGNONE = 'blognone',
}

export class Vendor extends AggregateRoot {
  private props: VendorProps;

  constructor(props: VendorProps) {
    super();
    this.validateName(props.name);
    this.validateUrl(props.url);
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

  private validateName(name: string): void {
    if (name === '') {
      throw new Error('name cannot be empty');
    }
  }

  private validateUrl(url: string): void {
    if (url === '') {
      throw new Error('url cannot be empty');
    }
  }

  serialize(): VendorProps {
    return this.props;
  }

  get id(): string {
    return this.props.id;
  }
}
