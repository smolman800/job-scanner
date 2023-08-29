import { Injectable } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';

export abstract class IdGenerator {
  abstract generate(): string;
}

@Injectable()
export class UUIDGeneratorService implements IdGenerator {
  generate(): string {
    return uuidv4();
  }
}
