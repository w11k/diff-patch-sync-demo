// via https://github.com/typeorm/typeorm/issues/1267#issuecomment-347993810

export function createMockRepository() {
    return {
        find: function () {
        },
        findOne: function () {
        }
        // others
    };
}

//
// // then in a test
// const fakeRepository = createFakeRepository();
// sinon.stub(typeorm, 'getRepository').withArgs(Profile).returns(fakeRepository);
//
// const profileRepositoryMock = sinon.mock(fakeRepository);
// profileRepositoryMock.expects('find').withArgs({emailAddress: profile.emailAddress}).returns(promise.resolve([profile]));
