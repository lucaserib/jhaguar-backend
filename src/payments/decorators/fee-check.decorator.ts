import { SetMetadata } from '@nestjs/common';

export const RequiresFeeCheck = () => SetMetadata('requiresFeeCheck', true);
