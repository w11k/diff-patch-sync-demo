import {NotFoundException} from '@nestjs/common';

export function throwNotFoundForNil<T>(object: T | null | undefined) {
  if (object === null || object === undefined) {
    throw NotFoundException;
  }

}
