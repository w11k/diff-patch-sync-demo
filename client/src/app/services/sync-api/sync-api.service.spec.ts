// import {TestBed} from '@angular/core/testing';
// import {SyncApiService} from './diff-patch-sync-api-service';
// import {ApiService} from "../http-api/api.service";
// import {DIFF_SYNC_MOCK_DATA_CLIENT} from "./diff-patch-sync.mock";
// import {SyncApiServiceMock} from "./diff-patch-sync-api-mock.service";
// import {LoggerConfig, NGXLogger, NGXLoggerHttpService, NGXMapperService} from "ngx-logger";
// import {HttpBackend} from "@angular/common/http";
// import {Observable, of} from "rxjs";
// import {Delta} from "jsondiffpatch";
// import {Todo} from "../../todo/todo";
//
// describe('SyncApiService', () => {
//   let service: SyncApiService;
//   let getDiffDataFromServer: Observable<Delta>;
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [],
//       declarations: [],
//       providers: [
//         SyncApiService,
//         SyncApiServiceMock,
//         {
//           provide: ApiService, useValue: {
//             updateDiff: jasmine.createSpy('updateDiff').and.callFake(() => getDiffDataFromServer),
//           }
//         },
//         NGXLogger,
//         NGXMapperService,
//         HttpBackend,
//         NGXLoggerHttpService,
//         LoggerConfig,
//       ],
//     });
//
//     service = TestBed.get(SyncApiService);
//     service.todos.push(...JSON.parse(JSON.stringify(DIFF_SYNC_MOCK_DATA_CLIENT.todos)));
//     service.clientShadow.push(...JSON.parse(JSON.stringify(DIFF_SYNC_MOCK_DATA_CLIENT.todos)));
//   });
//
//   it('should be created', () => {
//     const service: SyncApiService = TestBed.get(SyncApiService);
//     expect(service).toBeTruthy();
//   });
//
//   describe('updateClientAndServerDocument(clientShadow: Todo[], clientDocument: Todo[])', () => {
//     const expectedDocumentState = [
//       {
//         "id": "d7940391-32e6-11ea-b477-11813a6a1707",
//         "title": "Testing is a great thing.",
//         "complete": false,
//         "createdAt": "2019-07-18 07:49:54.646251",
//         "updatedAt": "2019-07-18 07:49:54.646251"
//       },
//       {
//         "id": "d84fb271-32e6-11ea-b477-11813a6a1707",
//         "title": "Testing is important for code quality.",
//         "complete": false,
//         "createdAt": "2019-08-18 07:49:54.646251",
//         "updatedAt": "2019-08-18 07:49:54.646251"
//       },
//       {
//         "id": "d8c90120-32e6-11ea-b477-11813a6a1707",
//         "title": "Testing changes things.",
//         "complete": false,
//         "createdAt": "2019-07-18 07:49:54.646251",
//         "updatedAt": "2019-07-18 07:49:54.646251"
//       },
//       {
//         "id": "d926ffa0-32e6-11ea-b477-11813a6a1707",
//         "title": "Testing comes first!",
//         "complete": true,
//         "createdAt": "2019-08-18 07:49:54.646251",
//         "updatedAt": "2019-08-18 07:49:54.646251"
//       }
//     ]
//     beforeEach(() => {
//       getDiffDataFromServer = of({
//         "2": [{
//           "id": "d8c90120-32e6-11ea-b477-11813a6a1707",
//           "title": "Testing changes things.",
//           "complete": false,
//           "createdAt": "2019-07-18 07:49:54.646251",
//           "updatedAt": "2019-07-18 07:49:54.646251"
//         }],
//         "3": [{
//           "id": "d926ffa0-32e6-11ea-b477-11813a6a1707",
//           "title": "Testing comes first!",
//           "complete": true,
//           "createdAt": "2019-08-18 07:49:54.646251",
//           "updatedAt": "2019-08-18 07:49:54.646251"
//         }],
//         "_t": "a"
//       });
//     });
//
//     it('should update local doc, diff and patch client shadow and send diff to server. Then get diff from server and patch it into local doc and shadow', () => {
//       expect(service.todos).toEqual(service.clientShadow);
//
//       const {shadow, document} = service.updateClientAndServerDocument(JSON.parse(JSON.stringify(service.clientShadow)), service.todos);
//       service.clientShadow = shadow;
//       service.todos = document;
//
//       expect(service.todos).toEqual(expectedDocumentState);
//       expect(service.todos).toEqual(service.clientShadow);
//     });
//   });
//
//   describe('createDiff(document1: Todo[], document2: Todo[])', () => {
//     const expectedDiff = {"0": {"title": ["Testing is a great thing.", "Testing is great."]}, "_t": "a"};
//     it('should alter the document, create a diff between the document and the shadow and return that diff', () => {
//
//       expect(service.todos).toEqual(service.clientShadow);
//
//       service.todos = service.todos.map(todo => {
//         if (todo.id === 'd7940391-32e6-11ea-b477-11813a6a1707') {
//           todo.title = 'Testing is great.';
//           return todo;
//         } else {
//           return todo;
//         }
//       });
//
//       expect(service.todos).not.toEqual(service.clientShadow);
//
//       const clientDiff = service.createDiff(service.clientShadow, service.todos);
//       expect(clientDiff).toEqual(expectedDiff)
//     });
//   });
//
//   describe('patchInto(document: Todo[], diff: Delta)', () => {
//     it('should change the document, patch the related diff it into the shadow and compare shadow and document', () => {
//
//       expect(service.todos).toEqual(service.clientShadow);
//
//       service.todos = service.todos.map(todo => {
//         if (todo.id === 'd7940391-32e6-11ea-b477-11813a6a1707') {
//           todo.title = 'Testing is great.';
//           return todo;
//         } else {
//           return todo;
//         }
//       });
//
//       expect(service.todos).not.toEqual(service.clientShadow);
//
//       const diff: Delta = {"0": {"title": ["Testing is a great thing.", "Testing is great."]}, "_t": "a"};
//
//       service.clientShadow = service.patchInto(service.clientShadow, diff);
//
//       expect(service.todos).toEqual(service.clientShadow);
//     });
//   });
//
//   describe('getAllTodos()', () => {
//     it('should return all todos of the current document', () => {
//
//       const todos: Observable<Todo[]> = service.getAllTodos();
//
//       const sub = todos.subscribe((todos) => {
//         expect(todos).toEqual(DIFF_SYNC_MOCK_DATA_CLIENT.todos);
//       });
//
//       sub.unsubscribe();
//     });
//   });
//
//   describe('createTodo(todo: Todo)', () => {
//     const returnedDocumentAndShadow = {
//       shadow: [{
//         "id": "d7940391-32e6-11ea-b477-11813a6a1707",
//         "title": "Testing is a great thing.",
//         "complete": false,
//         "createdAt": "2019-07-18 07:49:54.646251",
//         "updatedAt": "2019-07-18 07:49:54.646251"
//       }, {
//         "id": "d84fb271-32e6-11ea-b477-11813a6a1707",
//         "title": "Testing is important for code quality.",
//         "complete": false,
//         "createdAt": "2019-08-18 07:49:54.646251",
//         "updatedAt": "2019-08-18 07:49:54.646251"
//       }, {
//         "title": "Testing for the win!",
//         "id": "02367700-3485-11ea-a651-53196b9863f8",
//         "updatedAt": "2020-01-11T15:14:06.064Z",
//         "createdAt": "2020-01-11T15:14:06.064Z"
//       }],
//       document: [{
//         "id": "d7940391-32e6-11ea-b477-11813a6a1707",
//         "title": "Testing is a great thing.",
//         "complete": false,
//         "createdAt": "2019-07-18 07:49:54.646251",
//         "updatedAt": "2019-07-18 07:49:54.646251"
//       }, {
//         "id": "d84fb271-32e6-11ea-b477-11813a6a1707",
//         "title": "Testing is important for code quality.",
//         "complete": false,
//         "createdAt": "2019-08-18 07:49:54.646251",
//         "updatedAt": "2019-08-18 07:49:54.646251"
//       }, {
//         "title": "Testing for the win!",
//         "id": "02367700-3485-11ea-a651-53196b9863f8",
//         "updatedAt": "2020-01-11T15:14:06.064Z",
//         "createdAt": "2020-01-11T15:14:06.064Z"
//       }]
//     };
//     beforeEach(() => {
//       spyOn(service, 'updateClientAndServerDocument').and.returnValue(returnedDocumentAndShadow);
//     });
//     it('should add the new todo to the current document, sync with server and apply server changes into current document', () => {
//       expect(service.todos).toEqual(service.clientShadow);
//
//       let newTodo = new Todo();
//       newTodo.complete = false;
//       newTodo.title = 'Testing for the win!';
//
//       const updatedTodos: Observable<Todo[]> = service.createTodo(newTodo);
//
//       const sub = updatedTodos.subscribe((todos) => {
//         expect(todos.length).toBe(DIFF_SYNC_MOCK_DATA_CLIENT.todos.length + 1);
//         expect(todos).toEqual(service.todos);
//         expect(service.todos).toEqual(service.clientShadow);
//       });
//
//       sub.unsubscribe();
//     });
//   });
//
//   describe('deleteTodoById(todoId: string)', () => {
//     const returnedDocumentAndShadow = {
//       shadow: [{
//         "id": "d84fb271-32e6-11ea-b477-11813a6a1707",
//         "title": "Testing is important for code quality.",
//         "complete": false,
//         "createdAt": "2019-08-18 07:49:54.646251",
//         "updatedAt": "2019-08-18 07:49:54.646251"
//       }],
//       document: [{
//         "id": "d84fb271-32e6-11ea-b477-11813a6a1707",
//         "title": "Testing is important for code quality.",
//         "complete": false,
//         "createdAt": "2019-08-18 07:49:54.646251",
//         "updatedAt": "2019-08-18 07:49:54.646251"
//       }]
//     };
//     const todoIdToBeDeleted = 'd7940391-32e6-11ea-b477-11813a6a1707';
//     beforeEach(() => {
//       spyOn(service, 'updateClientAndServerDocument').and.returnValue(returnedDocumentAndShadow);
//     });
//     it('should delete the entry by todoId from the current document, sync with server and apply server changes into current document', () => {
//       expect(service.todos).toEqual(service.clientShadow);
//
//       const updatedTodos: Observable<Todo[]> = service.deleteTodoById(todoIdToBeDeleted);
//
//       const sub = updatedTodos.subscribe((todos) => {
//         expect(todos.length).toBe(DIFF_SYNC_MOCK_DATA_CLIENT.todos.length - 1);
//         expect(todos).toEqual(service.todos);
//         expect(service.todos).toEqual(service.clientShadow);
//       });
//
//       sub.unsubscribe();
//     });
//
//   });
//
//   describe('updateTodo(todo: Todo)', () => {
//     const returnedDocumentAndShadow = {
//       shadow: [{
//         "id": "d7940391-32e6-11ea-b477-11813a6a1707",
//         "title": "Testing for the win!",
//         "complete": false,
//         "createdAt": "2019-07-18 07:49:54.646251",
//         "updatedAt": "2020-01-11T15:57:01.821Z"
//       }, {
//         "id": "d84fb271-32e6-11ea-b477-11813a6a1707",
//         "title": "Testing is important for code quality.",
//         "complete": false,
//         "createdAt": "2019-08-18 07:49:54.646251",
//         "updatedAt": "2019-08-18 07:49:54.646251"
//       }],
//       document: [{
//         "id": "d7940391-32e6-11ea-b477-11813a6a1707",
//         "title": "Testing for the win!",
//         "complete": false,
//         "createdAt": "2019-07-18 07:49:54.646251",
//         "updatedAt": "2020-01-11T15:57:01.821Z"
//       }, {
//         "id": "d84fb271-32e6-11ea-b477-11813a6a1707",
//         "title": "Testing is important for code quality.",
//         "complete": false,
//         "createdAt": "2019-08-18 07:49:54.646251",
//         "updatedAt": "2019-08-18 07:49:54.646251"
//       }]
//     };
//     const todoIdToBeUpdated = {
//       id: 'd7940391-32e6-11ea-b477-11813a6a1707',
//       title: 'Testing is a great thing.',
//       complete: false,
//       createdAt: '2019-07-18 07:49:54.646251',
//       updatedAt: '2019-07-18 07:49:54.646251',
//     };
//
//     beforeEach(() => {
//       spyOn(service, 'updateClientAndServerDocument').and.returnValue(returnedDocumentAndShadow);
//     });
//     it('should update one entry from the current document, sync with server and apply server changes into current document', () => {
//       expect(service.todos).toEqual(service.clientShadow);
//
//       console.log(service.todos)
//
//       todoIdToBeUpdated.title = 'Testing for the win!';
//
//       const updatedTodos: Observable<Todo[]> = service.updateTodo(todoIdToBeUpdated);
//
//       const sub = updatedTodos.subscribe((todos) => {
//         console.log(todos)
//         expect(todos.length).toBe(DIFF_SYNC_MOCK_DATA_CLIENT.todos.length);
//         expect(todos.filter(todo => todo.id === 'd7940391-32e6-11ea-b477-11813a6a1707').reduce((previousValue, currentValue) => currentValue).title).toEqual('Testing for the win!');
//         expect(todos).toEqual(service.todos);
//         expect(service.todos).toEqual(service.clientShadow);
//       });
//
//       sub.unsubscribe();
//     });
//
//   });
// });
