import {ApiModelProperty} from '@nestjs/swagger';
import {Edit, EditsDTO} from "@w11k/diff-patch-sync/dist/core/diff-patch-sync-interfaces";

export class EditsDTODto implements EditsDTO {
    @ApiModelProperty() readonly clientReplicaId: string;
    @ApiModelProperty() readonly edits: Edit[];
    @ApiModelProperty() readonly localVersion: number;
    @ApiModelProperty() readonly remoteVersion: number;
}
