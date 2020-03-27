import {createMockRepository} from '../../util/create-mock-repository';

export const TODO_REPOSITORY_TOKEN = 'EXPENSE_REPOSITORY_TOKEN';


// sqljs approach here: https://github.com/typeorm/typeorm/issues/1267

export const todoMockRepository = {
    provide: TODO_REPOSITORY_TOKEN,
    useFactory: () => {
        return createMockRepository();
    },
    inject: [],
};
