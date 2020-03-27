import {Inject, Injectable} from "@nestjs/common";
import {Todo} from "../todo/todo.entity";
import {todoRepositoryToken} from "../todo/todo.providers";
import {Repository} from "typeorm";
import {v1} from "uuid";
import {
    PersistenceAdapter,
    EditsDTO,
} from "@w11k/diff-patch-sync/dist/core/diff-patch-sync-interfaces";
import {DiffPatchSyncServer} from "@w11k/diff-patch-sync/dist/server/diff-patch-sync-server";
import {shadowRepositoryToken} from "../shadow/shadow.providers";
import {Shadow} from "../shadow/shadow.entity";

@Injectable()
export class DiffPatchSyncService implements PersistenceAdapter<Todo> {

    server: DiffPatchSyncServer<Todo>;
    dataAdapter: PersistenceAdapter<Todo>;

    constructor(
        @Inject(todoRepositoryToken) private readonly todoRepository: Repository<Todo>,
        @Inject(shadowRepositoryToken) private readonly shadowRepository: Repository<Shadow>
    ) {

        this.dataAdapter = {
            saveItem: this.saveItem,
            deleteItem: this.deleteItem,
            updateItem: this.updateItem,
            findAllItems: this.findAllItems,
            saveShadow: this.saveShadow,
            deleteShadow: this.deleteShadow,
            updateShadow: this.updateShadow,
            findAllShadows: this.findAllShadows,
            findShadowById: this.findShadowById
        };

        this.server = new DiffPatchSyncServer(this.dataAdapter);
    }

    async handleClientMessage(clientMessage: EditsDTO): Promise<EditsDTO> {
        return await this.server.sync(clientMessage);
    }

    saveItem = async (item: Todo): Promise<any> =>{
        return await this.todoRepository.save(item);
    };

    saveShadow = async (shadow: Shadow): Promise<any> => {
        return await this.shadowRepository.save(shadow);
    };

    deleteItem = async (item: Todo): Promise<any> => {
        return await this.todoRepository.delete({id: item.id});
    };

    deleteShadow = async (shadow: Shadow): Promise<any> => {
        return await this.shadowRepository.delete({clientReplicaId: shadow.clientReplicaId});
    };

    findAllItems = async (): Promise<Todo[]> => {
        return await this.todoRepository.find();
    };

    findAllShadows = async (): Promise<Shadow[]> => {
        return await this.shadowRepository.find();
    };

    findShadowById = async (clientReplicaId: string): Promise<Shadow> => {
        return await this.shadowRepository.findOne({clientReplicaId})
    };

    updateItem = async (item: Todo): Promise<any> => {
        return await this.todoRepository.update({id: item.id}, item);
    };

    updateShadow = async (shadow: Shadow): Promise<any> => {
        return await this.shadowRepository.update({clientReplicaId: shadow.clientReplicaId}, shadow);
    };
}
