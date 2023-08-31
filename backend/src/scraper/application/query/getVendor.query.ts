import { QueryHandler } from '@nestjs/cqrs';
import { GetVendorResponseDto, VendorRepository } from '../interface';

export class GetVendorQuery {
  constructor(public readonly id: string[]) {}
}

@QueryHandler(GetVendorQuery)
export class GetVendorHandler {
  constructor(private readonly vendorRepository: VendorRepository) {}

  async execute({ id }: GetVendorQuery): Promise<GetVendorResponseDto[]> {
    const vendors = await this.vendorRepository.getMany(id);
    return vendors.map((vendor) => vendor.serialize());
  }
}
