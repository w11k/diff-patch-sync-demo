import {Body, Controller, Patch} from '@nestjs/common';
import {DiffPatchSyncService} from "./diff-patch-sync.service";
import {ApiOperation, ApiOkResponse, ApiNotFoundResponse} from '@nestjs/swagger';
import {EditsDTODto} from "./editMessage.dto";

@Controller('sync')
export class DiffPatchSyncController {

    constructor(private diffSyncService: DiffPatchSyncService) {
    }

    @Patch()
    @ApiOperation({title: 'Update records by diffing and patching'})
    @ApiOkResponse({description: 'apply changes to the main entity and the related shadows.', type: EditsDTODto})
    @ApiNotFoundResponse({description: `Couldn't find record.`})
    async syncData(@Body() clientMessage: EditsDTODto) {
        return await this.diffSyncService.handleClientMessage(clientMessage);
    }
}
